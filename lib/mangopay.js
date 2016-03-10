var _ = require('underscore');
var api = require('./api');

_.extend(api, {
    Error: require('./error'),
    Users: require('./controllers/Users')
});

module.exports = api;