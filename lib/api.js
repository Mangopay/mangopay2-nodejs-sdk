var _ = require('underscore');
var RestClient = require('node-rest-client').Client;
var apiMethods = require('./apiMethods');
var Users = require('./services/Users');

function _getBasicAuthHash(username, password) {
    return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
}

var Api = function(config) {
    var defaultConfig = require('./config');
    config = this.config = _.extend({}, defaultConfig, config);

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
     * Adds the services
     */
    this._addServices();

    return this;
};

Api.prototype = {
    requestOptions: {
        headers: {}
    },

    /**
     * Main API resource request method
     * @param {string}      method      Mangopay API method to be called
     * @param {function}    callback    Callback function
     * @param {object}      options     Hash of configuration to be passed to request
     * @returns {object} request promise
     */
    method: function(method, callback, options) {
        var self = this;

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
         * If there's no OAuthKey, request one
         */
        if (!requestOptions.headers.Authorization) {
            this.authorize(function(data){
                _.extend(self.requestOptions.headers, {
                    Authorization: data.token_type + ' ' + data.access_token
                });
                self.method.call(self, method, callback, options);
            });
        } else {
            var request = self.client.methods[method](requestOptions, callback);

            // Generic error handler
            request.on('error', function(err){
                throw new self.Error(err);
            });

            return request;
        }
    },

    /**
     * OAuth2 authorization mechanism. After authorization request, calls the callback with returned authorization data
     * @param {function}    callback
     * @returns {object} request promise
     */
    authorize: function(callback) {
        return this.client.methods.authentication_oauth({
            data: {
                grant_type: 'client_credentials'
            },
            headers: {
                'Authorization': _getBasicAuthHash(this.config.clientId, this.config.clientPassword),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, callback);
    },

    /**
     * Populates the Api object with the services
     */
    _addServices: function() {
        this['Users'] = new Users(this);
    }
};

module.exports = Api;