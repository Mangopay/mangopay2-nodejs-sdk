var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsBizum = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null,
        /**
         * Format: International E.164 standard (preceded by plus sign and country code, +34 in Spain); pattern: ^[+][1-9][\d]{4,14}$
         * The phone number of the end user to which the Bizum push notification is sent to authenticate the transaction.
         * If the Phone parameter is sent, then RedirectURL is not returned and ReturnURL is ignored.
         */
        Phone: null,
        /**
         * The URL to which the user is returned after the payment, whether the transaction is successful or not.
         */
        ReturnURL: null
    }
});

module.exports = PayInPaymentDetailsBizum;
