var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        DisplayName: null,
        Currency: null,
        RecipientType: null,
        PayoutMethodType: null,
        LocalBankTransfer: null,
        InternationalBankTransfer: null,
        IndividualRecipient: null,
        BusinessRecipient: null,
    }
});
