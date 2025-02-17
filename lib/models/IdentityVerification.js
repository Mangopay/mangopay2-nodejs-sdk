var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        HostedUrl: null,
        Status: null,
        ReturnUrl: null
    }
});
