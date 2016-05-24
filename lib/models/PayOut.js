var _ = require('underscore');
var Transaction = require('./Transaction');

var PayOut = Transaction.extend({
    defaults: _.extend({}, Transaction.prototype.defaults, {
        DebitedWalletId: null,
        /**
         * PaymentType (BANK_WIRE, MERCHANT_EXPENSE, AMAZON_GIFTCARD)
         */
        PaymentType: null,
        /**
         * One of PayOutPaymentDetails implementations, depending on PaymentType
         */
        MeanOfPaymentDetails: null
    }),

    getReadOnlyProperties: function() {
        var properties = Transaction.prototype.getReadOnlyProperties();
        properties.push('PaymentType');
        return properties;
    }
});

module.exports = PayOut;