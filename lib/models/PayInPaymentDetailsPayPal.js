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
        PaypalBuyerAccountEmail: null
    }
});

module.exports = PayInPaymentDetailsPayPal;