var _ = require('underscore');
var PayInPaymentDetailsDirectDebit = require('./PayInPaymentDetailsDirectDebit');

var PayInPaymentDetailsDirectDebit = PayInPaymentDetailsDirectDebit.extend({
    defaults: {
        /**
         *  Direct debit type {SOFORT, ELV, GIROPAY}
         */
        DirectDebitType: null
    }
});

module.exports = PayInPaymentDetailsDirectDebit;
