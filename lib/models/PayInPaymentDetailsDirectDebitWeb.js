var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsDirectDebit = PayInPaymentDetails.extend({
    defaults: {
        /**
         *  Direct debit type {SOFORT, ELV, GIROPAY}
         */
        DirectDebitType: null
    }
});

module.exports = PayInPaymentDetailsDirectDebit;
