var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        Status: null,
        DisplayName: null,
        PayoutMethodType: null,
        RecipientType: null,
        Currency: null,
        RecipientScope: null,
        UserId: null,
        IndividualRecipient: null,
        BusinessRecipient: null,
        LocalBankTransfer: null,
        InternationalBankTransfer: null,
        PendingUserAction: null
    }
});
