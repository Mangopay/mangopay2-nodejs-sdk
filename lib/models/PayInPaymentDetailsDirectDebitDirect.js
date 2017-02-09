var _ = require('underscore');
var PayInPaymentDetailsDirectDebit = require('./PayInPaymentDetailsDirectDebit');

var PayInPaymentDetailsDirectDebit = PayInPaymentDetailsDirectDebit.extend({
    defaults: {
        /**
         * Mandate identifier.
         */
        MandateId: null
    }
});

module.exports = PayInPaymentDetailsDirectDebit;
