var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        Amount: null,
        AvailableAmountToSplit: null,
        Currency: null,
        PlatformFeesAmount: null,
        Status: null,
        NextActions: null,
        ExternalData: null,
        Buyer: null,
        LineItems: null,
        Captures: null,
        Refunds: null,
        Disputes: null,
        Splits: null,
        SettlementId: null
    }
});