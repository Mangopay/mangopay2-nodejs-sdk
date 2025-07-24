var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        LineItemId: null,
        SellerId: null,
        WalletId: null,
        SplitAmount: null,
        FeesAmount: null,
        TransferDate: null,
        Description: null,
        Status: null
    }
});