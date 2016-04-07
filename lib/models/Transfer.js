var EntityBase = require('./EntityBase');

var Transfer = EntityBase.extend({
    defaults: {
        DebitedWalletId: null,
        CreditedWalletId: null
    }
});

module.exports = Transfer;