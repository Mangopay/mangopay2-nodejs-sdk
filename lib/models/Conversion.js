var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        AuthorId: null,
        DebitedWalletId: null,
        CreditedWalletId: null,
        DebitedFunds: null,
        CreditedFunds: null,
        Fees: null,
        ConversionRate: null,
        Status: null,
        Type: null,
        Nature: null,
        ResultCode: null,
        ResultMessage: null,
        ExecutionDate: null
    }
});