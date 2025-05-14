var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        DisplayName: null,
        Currency: null,
        Country: null,
        RecipientType: null,
        PayoutMethodType: null,
        RecipientScope: null,
        Tag: null,
        LocalBankTransfer: null,
        InternationalBankTransfer: null,
        IndividualRecipient: null,
        BusinessRecipient: null,
    }
});
