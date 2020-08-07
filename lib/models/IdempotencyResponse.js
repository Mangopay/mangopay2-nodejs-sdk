var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        StatusCode: null,
        ContentLength: null,
        ContentType: null,
        Date: null,
        Resource: null
    }
});
