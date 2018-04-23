var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var RestClient = require('node-rest-client').Client;
var Promise = require('promise');
var querystring = require('querystring');

var apiMethods = require('./apiMethods');

/**
 *
 * @param {string} username     Mangopay username
 * @param {string} password     Mangopay password
 * @returns {string}            The header value base64 encoded for requesting the authentication key
 * @private
 */
function _getBasicAuthHash(username, password) {
    return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
}

var Api = function(config) {
    var defaultConfig = require('./config');
    config = this.config = _.extend({}, defaultConfig, config);

    console.log('apiii');

    this.errorHandler = config.errorHandler;

    /**
     * Add default request configuration options
     */
    _.extend(this.requestOptions, {
        requestConfig: {
            timeout: config.connectionTimeout
        },
        responseConfig: {
            timeout: config.responseTimeout
        },
        /**
         * Path options are replacing the ${placeholders} from apiMethods
         */
        path: {
            clientId: config.clientId,
            apiVersion: config.apiVersion
        },
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'MangoPay V2 Nodejs/' + require('../package.json').version
        }
    });

    var client = this.client = new RestClient(this.requestOptions);

    /**
     * Iterate trough API methods and register them into the rest client
     */
    _.each(apiMethods, function(method, key){
        client.registerMethod(key, config.baseUrl + method[0], method[1]);
    });

    /**
     * Adds the services to API object
     */
    this._servicesLoader();

    return this;
};

Api.prototype = {
    config: require('./config'),

    requestOptions: {
        headers: {}
    },

    /**
     * Checks if callback is a function or not, and passes the options
     * @param {Object, Function}    callback
     * @param {Object}              options
     * @param {Object}              params      Additional params that extend options
     */
    _getOptions: function(callback, options, params) {
        var options = options || ((_.isObject(callback) && !_.isFunction(callback)) ? callback : {});
        if (params) {
            options = _.extend({}, options, params);
        }

        return options
    },

    /**
     * Main API resource request method
     * @param {string}      method      Mangopay API method to be called
     * @param {function}    callback    Callback function
     * @param {object}      options     Hash of configuration to be passed to request
     * @returns {object} request promise
     */
    method: function(method, callback, options) {
        options = this._getOptions(callback, options);

        if (this.config.debugMode) {
            this.config.logClass(method, options);
        }

        /**
         * If data has parse method, call it before passing data
         */
        if (options.data && options.data instanceof this.models.EntityBase) {
            options.data = this.buildRequestData(options.data);
        } else if (options.data && options.data.toJSON) {
            options.data = options.data.toJSON();
        }
        var self = this;

        /**
         * If there's no OAuthKey, request one
         */
        if (!this.requestOptions.headers.Authorization || this.isExpired()) {
            return new Promise(function(resolve, reject){
                self.authorize()
                    .then(function(){
                        self.method.call(self, method, function(data, response){
                            // Check if we have to wrap data into a model
                            if (_.isFunction(callback)) {
                                callback(data, response);
                            }
                        }, options)
                            .then(resolve)
                            .catch(reject)
                    })
                    .catch(reject);
            });
        }

        /**
         * Extend default request options with custom ones, if present
         */
        var requestOptions = _.extend({}, this.requestOptions, options);

        /**
         * If we have custom headers, we have to prevent them to override Authentication header
         */
        if (options && options.headers) {
            _.extend(requestOptions.headers, this.requestOptions.headers, options.headers);
        }

        /**
         * Append the path placeholders in order to build the proper url for the request
         */
        if (options && options.path) {
            _.extend(requestOptions.path, this.requestOptions.path, options.path);
        }

        return this._requestApi(requestOptions, method, callback);
    },

    _requestApi: function(requestOptions, method, callback) {
      var self = this;

      return new Promise(function(resolve, reject){
          if (!method) throw new Error('Method is required in order to perform a API server request');
          var request;
          /**
           * Allow direct requests: api.method('post', function(){ ... });
           */
          if (['post', 'get', 'put'].indexOf(method) === -1) {
            request = self.client.methods[method].bind(self, requestOptions);
          } else {
            if (!requestOptions.url) throw new Error('Url must be specified when doing a manual request');
            request = self.client[method].bind(self, requestOptions.url, requestOptions);
          }

          var resolveWithFullResponse = requestOptions.resolveWithFullResponse || false;

          request(function(data, response){
            var resolveArgument = (resolveWithFullResponse) ? _.extend(response, {body: data}) : data;

            if (response.statusCode === 401) {
                // Authorization error
                self.authorize()
                    .then(function(){
                        self.method.call(self, method, function(data, response){
                            var resolveArgument = (resolveWithFullResponse) ? response : data;
                            // Check if we have to wrap data into a model
                            if (_.isFunction(callback)) {
                                callback(resolveArgument, response);
                            }
                        }, requestOptions)
                            .then(resolve)
                            .catch(reject)
                    })
                    .catch(reject)
            } else if (response.statusCode < 200 || response.statusCode > 299) {
                if (_.isFunction(callback)) callback(resolveArgument, response);
                self.errorHandler(data.Message, data);
                reject(resolveArgument, response);
            } else {
                if (['post', 'get', 'put'].indexOf(method) === -1) {
                  /**
                   * Add raw response data under 'data' property of the object and at the root of the object,
                   * when the request is not "manual" - post, get, put
                   */
                  _.extend(requestOptions.data, data, {data: data});

                  /**
                   * Check if we have to instantiate returned data
                   */
                  if (requestOptions.dataClass && !resolveWithFullResponse) {
                      if (_.isArray(data)) {
                          resolveArgument = _.map(data, function(dataItem) {
                              return new requestOptions.dataClass(dataItem);
                          })
                      } else {
                          resolveArgument = new requestOptions.dataClass(data);
                      }
                  }
                }
                if (_.isFunction(callback)) {
                    callback(resolveArgument, response);
                }
                resolve(resolveArgument, response);
            }
          });
      });
    },

    buildRequestData: function(entity) {
        var self = this;

        var blackList = entity.getReadOnlyProperties();
        var requestDataKeys = _.difference(_.keys(entity), blackList);
        var requestData = _.pick(entity, requestDataKeys);

        _.each(_.keys(entity), function(key){
            if (self.canReadSubRequestData(entity, key)) {
                _.extendOwn(requestData, entity[key].toJSON());
            }
        });

        return requestData;
    },

    canReadSubRequestData: function(entity, propertyName) {
        if (entity instanceof this.models.PayIn && (propertyName === 'PaymentDetails' || propertyName === 'ExecutionDetails')) {
            return true;
        }

        if (entity instanceof this.models.PayOut && propertyName === 'MeanOfPaymentDetails') {
            return true;
        }

        if (entity instanceof this.models.BankAccount && propertyName === 'Details') {
            return true;
        }

        return false;
    },

    /**
     * OAuth2 authorization mechanism. After authorization request, calls the callback with returned authorization data
     * @param {function}    callback
     * @returns {object} request promise
     */
    authorize: function(callback) {
        var self = this;

        var auth_post_data = querystring.stringify({
            'grant_type': 'client_credentials'
        });

        return new Promise(function(resolve, reject){
            self.client.methods.authentication_oauth(_.extend({}, self.requestOptions, {
                data: auth_post_data,
                headers: _.extend({}, self.requestOptions.headers, {
                    'Authorization': _getBasicAuthHash(self.config.clientId, self.config.clientPassword),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(auth_post_data)
                })
            }), function(data) {
                // Authorization succeeded
                if (data.token_type && data.access_token) {
                    _.extend(self.requestOptions.headers, {
                        'Authorization': data.token_type + ' ' + data.access_token
                    });
                    // Multiplying expires_in (seconds) by 1000 since JS getTime() is expressed in ms
                    self.authorizationExpireTime = new Date().getTime() + ( data.expires_in * 1000 );
                    resolve(data);
                    if (_.isFunction(callback)) {
                        callback(data);
                    }
                } else {
                    reject(data);
                }
            });
        });
    },

    isExpired: function() {
        // Expressed in ms ( 10 seconds )
        var THRESHOLD = 10000;
        return (new Date().getTime() - THRESHOLD) > this.authorizationExpireTime;
    },

    /**
     * Populates the SDK object with the services
     */
    _servicesLoader: function() {
        var self = this;
        // Add all services from ./services to this object
        [
            'BankAccounts', 'BankingAliases', 'CardPreAuthorizations', 'CardRegistrations', 'Cards',
            'Clients', 'DisputeDocuments', 'Disputes', 'Events', 'Hooks', 'KycDocuments', 'Mandates',
            'PayIns', 'PayOuts', 'Refunds', 'Reports', 'Repudiations', 'Responses', 'Transfers',
            'UboDeclarations', 'Users', 'Wallets'
        ].forEach(function (service) {
            var ServiceClass = require('./services/' + service);
            self[service] = new ServiceClass();
            self[service]._api = self;
        });

        // Add all models from ./models to this object
        self.models = {};
        [
            'Address', 'BankAccount', 'BankAccountDetails', 'BankAccountDetailsCA', 'BankAccountDetailsGB',
            'BankAccountDetailsIBAN', 'BankAccountDetailsOTHER', 'BankAccountDetailsUS', 'BankAccountType',
            'BankingAlias', 'BankingAliasIBAN', 'Card', 'CardPreAuthorization', 'CardRegistration', 'Client',
            'ClientWallet', 'DebitedBankAccount', 'DeclaredUbo', 'DeclaredUboStatus', 'Dispute', 'DisputeDocument',
            'DisputeDocumentPage', 'DisputeReason', 'Document', 'DocumentPageConsult', 'EMoney', 'EntityBase',
            'Hook', 'KycDocument', 'KycDocumentStatus', 'KycDocumentType', 'KycPage', 'LegalPersonType', 'Mandate',
            'MandateStatus', 'Money', 'PayIn', 'PayInExecutionDetails', 'PayInExecutionDetailsDirect',
            'PayInExecutionDetailsWeb', 'PayInExecutionType', 'PayInPaymentDetails', 'PayInPaymentDetailsBankingAlias',
            'PayInPaymentDetailsBankWire', 'PayInPaymentDetailsCard', 'PayInPaymentDetailsCardDirect',
            'PayInPaymentDetailsCardWeb', 'PayInPaymentDetailsDirectDebitDirect', 'PayInPaymentDetailsDirectDebitWeb',
            'PayInPaymentDetailsPayPal', 'PayInPaymentDetailsPreAuthorized', 'PayInPaymentType', 'PayInTemplateURLOptions',
            'PayOut', 'PayOutPaymentDetails', 'PayOutPaymentDetailsBankWire', 'PayOutPaymentType', 'PersonType',
            'PlatformType', 'Refund', 'RefundReasonDetails', 'Report', 'ReportFilter', 'Repudiation', 'SettlementTransfer',
            'ShippingAddress', 'Transaction', 'Transfer', 'UboDeclaration', 'UboDeclarationRefusedReasonType',
            'UboDeclarationStatus', 'UboRefusedReasonType', 'User', 'UserLegal', 'UserNatural', 'UserNaturalCapacity',
            'Wallet'].forEach(function (model) {
            self.models[model] = require('./models/' + model);
        });
    }
};

module.exports = Api;
