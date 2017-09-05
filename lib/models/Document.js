var EntityBase = require('./EntityBase');

var Document = EntityBase.extend({
    defaults: {
        Status: null,
        RefusedReasonMessage: null,
        RefusedReasonType: null,
        ProcessedDate: null
    }
});

module.exports = Document;