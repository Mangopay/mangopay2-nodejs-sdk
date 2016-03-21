var _ = require('underscore');

function Model(data) {
    this.data = _.extend({}, this.defaults, data);
    _.bindAll(this, '_sync', 'get', 'create', 'update');
    this.initialize(data);
}

Model.prototype = {
    /**
     * Construct
     */
    initialize: function() {
        return;
    },

    create: function(callback, options) {
        var self = this;
        return this._sync('post', options, function(err, body, response){
            _.extend(self.data, body);
            callback(err, body, response);
        });
    },

    get: function(callback, options) {
        var self = this;
        return this._sync('get', function(err, body, response){
            _.extend(self.data, body);
            callback(err, body, response);
        }, options);
    },

    update: function(callback, options) {
        return this._sync('put', callback, options);
    },

    _sync: function(method, callback, options) {
        var defaultOptions = {
            url: this.getUrl(),
            json: this.data
        };

        options = _.extend(defaultOptions, options);

        return request[method](options, function(err, response, body){
            callback(err, body, response);
        });
    },

    parse: function(body) {
        return (_.isString(body)) ? JSON.parse(body) : body;
    },

    getData: function(attribute) {
        return (this.data) ? this.data[attribute] : undefined;
    },

    setData: function(attribute, value) {
        if (typeof attribute === 'object') {
            this.data = _.extend(this.data, attribute);
        } else {
            this.data[attribute] = value;
        }

        return this;
    },

    getReadOnlyProperties: function() {
        return [];
    }
};

Model.extend = require('./utils').extend;

module.exports = Model;