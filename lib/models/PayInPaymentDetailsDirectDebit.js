var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsDirectDebit = PayInPaymentDetails.extend({
    defaults: {
        /**
         *  Direct debit type {SOFORT, ELV, GIROPAY}
         */
        DirectDebitType: null,

        /**
         * An optional value to be specified on the user's bank statement
         */
        StatementDescriptor: null
    }
});

module.exports = PayInPaymentDetailsDirectDebit;
