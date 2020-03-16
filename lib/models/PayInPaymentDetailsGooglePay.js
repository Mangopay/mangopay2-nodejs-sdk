var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsGooglePay = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Payment information returned by Google Pay payment
         */
        PaymentData: null,

        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null,

        /**
         * Billing details
         */
        Billing: null
    }
});

module.exports = PayInPaymentDetailsGooglePay;