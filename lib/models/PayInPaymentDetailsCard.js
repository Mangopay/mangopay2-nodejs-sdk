var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsCard = PayInPaymentDetails.extend({
    defaults: {
        StatementDescriptor: null
    }
});

module.exports = PayInPaymentDetailsCard;
