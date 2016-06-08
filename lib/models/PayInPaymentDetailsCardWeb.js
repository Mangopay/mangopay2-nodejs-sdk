var _ = require('underscore');
var PayInPaymentDetailsCard = require('./PayInPaymentDetailsCard');

var PayInPaymentDetailsCardWeb = PayInPaymentDetailsCard.extend({
    defaults: _.extend({}, PayInPaymentDetailsCard.prototype.defaults, {
        /**
         *  CardType { CB_VISA_MASTERCARD, AMEX }
         */
        CardType: null
    })
});

module.exports = PayInPaymentDetailsCardWeb;
