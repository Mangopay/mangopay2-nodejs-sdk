var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        AcceptHeader: null,
        JavaEnabled: null,
        JavascriptEnabled: null,
        Language: null,
        ColorDepth: null,
        ScreenHeight: null,
        ScreenWidth: null,
        TimeZoneOffset: null,
        UserAgent: null
    }
});