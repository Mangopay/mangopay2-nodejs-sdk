var _ = require('underscore');

function Model(data) {
    this.data = _.extend({}, this.defaults, data);
    _.bindAll(this, '_sync', 'get', 'create', 'update', 'remove');
    this.initialize(data);
}

Model.prototype = {
    /**
     * Construct
     */
    initialize: function() {
        return;
    }

    , create: function(callback, options) {
        var self = this;
        return this._sync('post', options, function(err, body, response){
            _.extend(self.data, body);
            callback(err, body, response);
        });
    }

    , remove: function(callback, options) {
        return this._sync('del', callback, options);
    }

    , get: function(callback, options) {
        var self = this;
        return this._sync('get', function(err, body, response){
            _.extend(self.data, body);
            callback(err, body, response);
        }, options);
    }

    , update: function(callback, options) {
        return this._sync('put', callback, options);
    }

    , _sync: function(method, callback, options) {
        var defaultOptions = {
            url: this.getUrl(),
            json: this.data
        };

        options = _.extend(defaultOptions, options);

        return request[method](options, function(err, response, body){
            callback(err, body, response);
        });
    }

    , parse: function(body) {
        return (_.isString(body)) ? JSON.parse(body) : body;
    }

    , getData: function(attribute) {
        return (this.data) ? this.data[attribute] : undefined;
    }

    , setData: function(attribute, value) {
        if (typeof attribute === 'object') {
            this.data = _.extend(this.data, attribute);
        } else {
            this.data[attribute] = value;
        }

        return this;
    }
};

var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};

Model.extend = extend;

module.exports = Model;