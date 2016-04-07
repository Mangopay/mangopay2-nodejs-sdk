var EntityBase = require('./EntityBase');

var RefundReasonDetails = EntityBase.extend({
    defaults: {
        RefundReasonMessage: null,
        RefundReasonType: null
    }
});

module.exports = RefundReasonDetails;