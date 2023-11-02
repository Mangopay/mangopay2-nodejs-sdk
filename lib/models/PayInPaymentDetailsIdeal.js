var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsIdeal = PayInPaymentDetails.extend({
    defaults: {

        /**
         * The BIC identifier of the end-user’s bank
         */
        Bic: null,

        /**
         * Name of the end-user’s bank
         */
        BankName: null,

        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null
    }
});

module.exports = PayInPaymentDetailsIdeal;