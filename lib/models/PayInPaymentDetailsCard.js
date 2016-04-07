var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsCard = PayInPaymentDetails.extend({
    defaults: {
        /**
         *  CardType { CB_VISA_MASTERCARD, AMEX }
         */
        CardType: null,
        CardId: null
    }
});

module.exports = PayInPaymentDetailsCard;