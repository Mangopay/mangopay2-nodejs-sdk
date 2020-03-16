var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsApplePay = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Payment information returned by Apple Pay payment
         */
        PaymentData: null,

        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null
    }
});

module.exports = PayInPaymentDetailsApplePay;