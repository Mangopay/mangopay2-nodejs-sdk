var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsPayPal = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Address used instead of the user's PayPal account address.
         */
        ShippingAddress: null,

        /**
         * Email address of the buyer's account.
         */
        PaypalBuyerAccountEmail: null,


        /// V2 ///

        /**
         * The URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: null,

        /**
         * The URL to which the user is redirected to complete the payment
         */
        RedirectUrl: null,

        /**
         * Custom description of the payment shown to the consumer when making payments and on the bank statement
         */
        StatementDescriptor: null,

        /**
         * User’s shipping address When not provided, the default address is the one register one the buyer PayPal account
         */
        Shipping: null,

        /**
         * Information about the items bought by the customer
         */
        LineItems: null,

        ShippingPreference: null
    }
});

module.exports = PayInPaymentDetailsPayPal;
