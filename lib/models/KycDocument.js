var EntityBase = require('./EntityBase');

var KycDocument = EntityBase.extend({
    defaults: {
        Type: null,
        Status: null,
        UserId: null
    }
});

module.exports = KycDocument;