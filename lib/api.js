var _ = require('underscore');
var Promise = require('promise');
var querystring = require('querystring');

var apiMethods = require('./apiMethods');
var apiModels = require('./models');
var apiServices = require('./services');

var axios = require('axios');
var FormData = require('form-data');

/**
 *
 * @param {string} username     Mangopay username
 * @param {string} apiKey       Mangopay api key
 * @returns {string}            The header value base64 encoded for requesting the authentication key
 * @private
 */
function _getBasicAuthHash(username, apiKey) {
    return 'Basic ' + Buffer.from(username + ':' + apiKey).toString('base64');
}

var Api = function (config) {
    var defaultConfig = require('./config');
    config = this.config = _.extend({}, defaultConfig, config);

    axios.defaults.baseURL = config.baseUrl;
    // response timeout
    axios.defaults.timeout = config.responseTimeout;

    this.errorHandler = config.errorHandler;

    this.rateLimits = [];

    // Add default request configuration options
    _.extend(this.requestOptions, {
        // Path options are replacing the ${placeholders} from apiMethods
        path: {
            clientId: config.clientId,
            apiVersion: config.apiVersion
        },
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mangopay-SDK/' + require('../package.json').version + ` (Nodejs/${process.version})`
        }
    });

    // Adds the services to API object
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
    _getOptions: function (callback, options, params) {
        var finalOptions = options || ((_.isObject(callback) && !_.isFunction(callback)) ? callback : {});
        if (params) {
            finalOptions = _.extend({}, finalOptions, params);
        }

        return finalOptions;
    },

    /**
     * Main API resource request method
     * @param {string}      method      Mangopay API method to be called
     * @param {function}    callback    Callback function
     * @param {object}      options     Hash of configuration to be passed to request
     * @returns {object} request promise
     */
    method: function (method, callback, options) {
        options = this._getOptions(callback, options);

        if (this.config.debugMode) {
            this.config.logClass(method, options);
        }

        // If data has parse method, call it before passing data
        if (options.data && options.data instanceof this.models.EntityBase) {
            options.data = this.buildRequestData(options.data);
        } else if (options.data && options.data.toJSON) {
            options.data = options.data.toJSON();
        }
        var self = this;

        // If there's no OAuthKey, request one
        if (!this.requestOptions.headers.Authorization || this.isExpired()) {
            return new Promise(function (resolve, reject) {
                self.authorize()
                    .then(function () {
                        self.method.call(self, method, function (data, response) {
                            // Check if we have to wrap data into a model
                            if (_.isFunction(callback)) {
                                callback(data, response);
                            }
                        }, options)
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(reject);
            });
        }

        // Extend default request options with custom ones, if present
        var requestOptions = _.extend({}, this.requestOptions, options);

        // If we have custom headers and they don't contain Content-Type, we have to prevent them to override Authentication header
        if (options && options.headers && options.headers['Content-Type'] === undefined) {
            _.extend(requestOptions.headers, this.requestOptions.headers, options.headers);
        }

        // Append the path placeholders in order to build the proper url for the request
        if (options && options.path) {
            _.extend(requestOptions.path, this.requestOptions.path, options.path);
        }

        if (this.config.ukHeaderFlag) {
            requestOptions.headers['x-tentant-id'] = 'uk';
        }

        return this._requestApi(requestOptions, method, callback);
    },

    /**
     * Request method for POST or PUT with multipart file. The file is expected to be in options.data.File, as a Buffer
     * @param {string}      method      Mangopay API method to be called
     * @param {function}    callback    Callback function
     * @param {object}      options     Hash of configuration to be passed to request
     * @returns {object} request promise
     */
    multipartFormMethod: function (method, callback, options) {
        options = this._getOptions(callback, options);
        if (options.data === undefined || options.data.file === undefined || !Buffer.isBuffer(options.data.file)) {
            throw new Error('options.data.file needs to be a Buffer');
        }
        if (options.data === undefined || options.data.fileName === undefined) {
            throw new Error('options.data.fileName needs to be present');
        }

        if (this.config.debugMode) {
            this.config.logClass(method, options);
        }

        var self = this;

        // If there's no OAuthKey, request one
        if (!this.requestOptions.headers.Authorization || this.isExpired()) {
            return new Promise(function (resolve, reject) {
                self.authorize()
                    .then(function () {
                        self.multipartFormMethod.call(self, method, function (data, response) {
                            // Check if we have to wrap data into a model
                            if (_.isFunction(callback)) {
                                callback(data, response);
                            }
                        }, options)
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(reject);
            });
        }

        const form = new FormData();
        form.append('file', options.data.file, {
            filename: options.data.fileName
        });

        // Extend default request options with custom ones, if present
        var requestOptions = _.extend({}, this.requestOptions, options);
        requestOptions.data = form;

        // Append the path placeholders in order to build the proper url for the request
        if (options && options.path) {
            _.extend(requestOptions.path, this.requestOptions.path, options.path);
        }

        if (this.config.ukHeaderFlag) {
            requestOptions.headers['x-tentant-id'] = 'uk';
        }

        // keep only the multipart content-type header
        if (requestOptions.headers['Content-Type'] === 'application/json') {
            delete requestOptions.headers['Content-Type'];
        }

        requestOptions.headers = Object.assign(
            {},
            requestOptions.headers,
            form.getHeaders()
        );

        return this._requestApi(requestOptions, method, callback);
    },

    _requestApi: function (requestOptions, method, callback) {
        var self = this;

        return new Promise(function (resolve, reject) {
            if (!method) {
                throw new Error('Method is required in order to perform a API server request');
            }

            var url;
            var methodType;

            // Allow direct requests: api.method('post', function(){ ... });
            if (['post', 'get', 'put', 'delete'].indexOf(method) === -1) {
                // predefined requests
                url = apiMethods[method][0];
                url = replaceUrl(url, requestOptions.path);
                methodType = apiMethods[method][1];
            } else {
                // manual requests
                if (!requestOptions.url) {
                    throw new Error('Url must be specified when doing a manual request');
                }
                url = requestOptions.url;
                methodType = method;
            }

            if (!url) {
                throw new Error('Url must be specified when doing a manual request');
            }

            var resolveWithFullResponse = requestOptions.resolveWithFullResponse || false;
            var abortSignal = AbortSignal.timeout(self.config.connectionTimeout)

            axios({
                method: methodType,
                url: url,
                data: requestOptions.data,
                headers: requestOptions.headers,
                params: requestOptions.parameters,
                signal: abortSignal
            })
                .then(function (response) {
                    var resolveArgument = (resolveWithFullResponse) ?
                        _.extend(response, {body: response.data}) : response.data;

                    setRateLimits(self, response.headers);

                    // For predefined requests:
                    // Add raw response data under 'data' property of the object and at the root of the object
                    if (['post', 'get', 'put'].indexOf(method) === -1) {
                        _.extend(requestOptions.data, response.data, {data: response.data});

                        // Check if we have to instantiate returned data
                        if (requestOptions.dataClass && !resolveWithFullResponse) {
                            if (_.isArray(response.data)) {
                                resolveArgument = _.map(response.data, function (dataItem) {
                                    return new requestOptions.dataClass(dataItem);
                                });
                            } else {
                                resolveArgument = new requestOptions.dataClass(response.data);
                            }
                        }
                    }

                    if (_.isFunction(callback)) {
                        callback(resolveArgument, response);
                    }

                    resolve(resolveArgument);
                })
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                .catch(function (error) {
                    if (error.code === "ERR_CANCELED" && abortSignal.aborted) {
                        var err = {
                            Message: "Request timed out",
                            Code: 408
                        };
                        self.errorHandler(err.Message, err);
                        reject(err);
                    } else {
                        var resolveArgument = (resolveWithFullResponse) ?
                            _.extend(error.response, {body: error.response.data}) : error.response.data;

                        if (_.isFunction(callback)) {
                            callback(resolveArgument, error.response);
                        }

                        self.errorHandler(error.message, error.response.data);
                        reject(resolveArgument);
                    }
                });
        });
    },

    buildRequestData: function (entity) {
        var self = this;

        var blackList = entity.getReadOnlyProperties();
        var requestDataKeys = _.difference(_.keys(entity), blackList);
        var requestData = _.pick(entity, requestDataKeys);

        _.each(_.keys(entity), function (key) {
            if (self.canReadSubRequestData(entity, key)) {
                _.extendOwn(requestData, entity[key].toJSON());
            }
        });

        return requestData;
    },

    canReadSubRequestData: function (entity, propertyName) {
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
    authorize: function (callback) {
        var self = this;

        var auth_post_data = querystring.stringify({
            'grant_type': 'client_credentials'
        });

        //'Content-Length' doesn't need to be set, it gets set automatically (node-rest-client v3.1.0)
        return new Promise(function (resolve, reject) {

            var url = apiMethods.authentication_oauth[0];
            url = replaceUrl(url, self.requestOptions.path);
            var methodType = apiMethods.authentication_oauth[1];

            axios({
                method: methodType,
                url: url,
                data: auth_post_data,
                headers: _.extend({}, self.requestOptions.headers, {
                    'Authorization': _getBasicAuthHash(self.config.clientId, self.config.clientApiKey),
                    'Content-Type': 'application/x-www-form-urlencoded',
                })
            })
                .then(function (response) {
                    // Authorization succeeded
                    if (response.data.token_type && response.data.access_token) {
                        _.extend(self.requestOptions.headers, {
                            'Authorization': response.data.token_type + ' ' + response.data.access_token
                        });
                        // Multiplying expires_in (seconds) by 1000 since JS getTime() is expressed in ms
                        self.authorizationExpireTime = new Date().getTime() + (response.data.expires_in * 1000);
                        resolve(response.data);
                        if (_.isFunction(callback)) {
                            callback(response.data);
                        }
                    } else {
                        reject(response.data);
                    }
                })
                .catch(function (error) {
                    reject(error.response ? error.response.data : error.message);
                });
        });
    },

    isExpired: function () {
        // Expressed in ms ( 10 seconds )
        var THRESHOLD = 60000;
        return new Date().getTime() > (this.authorizationExpireTime - THRESHOLD);
    },

    /**
     * Populates the SDK object with the services
     */
    _servicesLoader: function () {
        var self = this;
        // Retrieve all services and add them to this object
        // ex: services.User becomes mangopay.Users
        Object.keys(apiServices).forEach(function (serviceName) {
            var ServiceClass = apiServices[serviceName];
            self[serviceName] = new ServiceClass();
            self[serviceName]._api = self;
        });

        // Retrieve all models and add them to this object
        // ex: models.User becomes mangopay.models.User
        self.models = {};
        Object.keys(apiModels).forEach(function (modelName) {
            self.models[modelName] = apiModels[modelName];
        });
    }
};

function setRateLimits(self, headers) {
    self.rateLimits = [];
    if (headers !== undefined) {
        let rateLimitReset = headers['x-ratelimit-reset'];
        let rateLimitRemaining = headers['x-ratelimit-remaining'];
        let rateLimitMade = headers['x-ratelimit'];

        if (rateLimitReset !== undefined && rateLimitRemaining !== undefined && rateLimitMade !== undefined) {
            rateLimitReset = rateLimitReset.split(",");
            rateLimitRemaining = rateLimitRemaining.split(",");
            rateLimitMade = rateLimitMade.split(",");

            if (rateLimitReset.length === rateLimitRemaining.length && rateLimitReset.length === rateLimitMade.length) {
                const currentTime = Math.floor(Date.now() / 1000);
                for (let i = 0; i < rateLimitReset.length; i++) {
                    const numberOfMinutes = (parseInt(rateLimitReset[i]) - currentTime) / 60;
                    const rateLimit = {
                        resetTimeMillis: parseInt(rateLimitReset[i]),
                        callsRemaining: parseInt(rateLimitRemaining[i]),
                        callsMade: parseInt(rateLimitMade[i])
                    };

                    if (numberOfMinutes <= 15) {
                        rateLimit.minutesInterval = 15;
                    } else if (numberOfMinutes <= 30) {
                        rateLimit.minutesInterval = 30;
                    } else if (numberOfMinutes <= 60) {
                        rateLimit.minutesInterval = 60;
                    } else if (numberOfMinutes <= 60 * 24) {
                        rateLimit.minutesInterval = 60 * 24;
                    }

                    self.rateLimits.push(rateLimit);
                }
            } else {
                console.log("Could not set rate limits: headers length should be the same");
            }
        }
    }
}

function replaceUrl(url, data) {
    // Create regex using the keys of the replacement object.
    const regex = new RegExp('\\${(' + Object.keys(data).join('|') + ')}', 'g');

    // Replace the string by the value in object
    return url.replace(regex, (m, p1) => data[p1] || m);
}

module.exports = Api;
