var Transaction = require('./Transaction');

var TemporaryImmediatePayIn = Transaction.extend({
    defaults: {
        PaymentCardId: null,
        CreditedWalletId: null
    }
});

module.exports = TemporaryImmediatePayIn;