var _ = require('underscore');
var api = require('./api');

_.extend(api.prototype, {
    Error: require('./error')
});

module.exports = api;