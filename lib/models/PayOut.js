var _ = require('underscore');
var EntityBase = require('./EntityBase');

var PayOut = EntityBase.extend({
    defaults: {
        DebitedWalletId: null,
        /**
         * PaymentType (BANK_WIRE, MERCHANT_EXPENSE, AMAZON_GIFTCARD)
         */
        PaymentType: null,
        /**
         * One of PayOutPaymentDetails implementations, depending on PaymentType
         */
        MeanOfPaymentDetails: null
    },

    getReadOnlyProperties: function() {
        var properties = EntityBse.prototype.getReadOnlyProperties();
        properties.push('PaymentType');
        return properties;
    }
});

module.exports = PayOut;