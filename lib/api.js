var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var RestClient = require('node-rest-client').Client;

var apiMethods = require('./apiMethods');
var Users = require('./services/Users');

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
            "Content-Type": "application/json"
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
         * Append the path placeholders in order to build the proper url for the request
         */
        if (options && options.path) {
            _.extend(requestOptions.path, this.requestOptions.path, options.path);
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
     * Populates the SDK object with the services
     */
    _servicesLoader: function() {
        var self = this;
        // Read all files from ./services and add them to this object
        // ex: services/User.js becomes mangopay.Users
        var servicesRoot = path.join(__dirname, 'services');
        fs.readdirSync(servicesRoot).forEach(function (file) {
            var serviceName = file.match(/(.*)\.js/)[1];
            var ServiceClass = require(servicesRoot + '/' + file);
            self[serviceName] = new ServiceClass();
            self[serviceName]._api = self;
        });
    }
};

module.exports = Api;