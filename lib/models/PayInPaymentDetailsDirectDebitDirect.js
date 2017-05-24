var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsDirectDebit = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Mandate identifier.
         */
        MandateId: null,

        /**
         * An optional value to be specified on the user's bank statement
         */
        StatementDescriptor: null,

        /**
         * Date of charging
         */
        ChargeDate: null
    }
});

module.exports = PayInPaymentDetailsDirectDebit;
