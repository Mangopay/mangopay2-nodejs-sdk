var EntityBase = require('./EntityBase');

var VirtualAccount = EntityBase.extend({

    defaults: {
        WalletId: null,
        CreditedUserId: null,
        VirtualAccountPurpose: null,
        Country: null,
        Status: null,
        Active: null,
        AccountOwner: null,
        LocalAccountsDetails: null,
        InternationalAccountDetails: null,
        Capabilities: null,
        ResultCode: null,
        ResultMessage: null
    }

});

module.exports = VirtualAccount;