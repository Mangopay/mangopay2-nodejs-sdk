var _ = require('underscore');
var PayInPaymentDetailsCard = require('./PayInPaymentDetailsCard');

var PayInPaymentDetailsCardWeb = PayInPaymentDetailsCard.extend({
    defaults: _.extend({}, PayInPaymentDetailsCard.prototype.defaults, {
        /**
         *  CardType { CB_VISA_MASTERCARD, AMEX }
         */
        CardType: null,

        /*
         * Shipping
         */
        Shipping: null,

        /**
         * The BIC identifier of the end-user’s bank
         */
        Bic: null,

        /**
         * Name of the end-user’s bank
         */
        BankName: null,
    })
});

module.exports = PayInPaymentDetailsCardWeb;
