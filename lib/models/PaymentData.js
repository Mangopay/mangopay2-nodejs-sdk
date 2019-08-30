var EntityBase = require('./EntityBase');

var PaymentData = EntityBase.extend({
    defaults: {
        /**
         * ID of the Apple payment transaction
         */
        TransactionId: null,
        /**
         * Network card used for transaction
         */
        Network: null,
        /**
         * Data block containing payment information
         */
        TokenData: null,
    }
});

module.exports = PaymentData;