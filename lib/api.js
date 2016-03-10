var _ = require('underscore');
var RestClient = require('node-rest-client').Client;
var apiMethods = require('./apiMethods');

function Api(config) {
    var defaultConfig = require('./config');
    config = this.config = _.extend({}, defaultConfig, config);

    var client = this.client = new RestClient();

    /**
     * Iterate trough API methods and register them into the rest client
     */
    _.each(apiMethods, function(method, key){
        client.registerMethod(key, config.baseUrl + method[0], method[1]);
    });
}

Api.prototype = {
    method: function(method, callback, options) {
        var self = this;
        options = options || {};
        var request = self.client.methods[method](options, callback);

        // Generic error handler
        request.on('error', function(err){
            throw new self.Error(err);
        });

        return request;
    }
};

module.exports = new Api();