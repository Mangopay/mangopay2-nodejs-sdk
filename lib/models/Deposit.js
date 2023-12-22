var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        AuthorId: null,
        DebitedFunds: null,
        Status: null,
        PaymentStatus: null,
        PayinsLinked: null,
        ResultCode: null,
        ResultMessage: null,
        CardId: null,
        SecureModeReturnURL: null,
        SecureModeRedirectURL: null,
        SecureModeNeeded: null,
        ExpirationDate: null,
        PaymentType: null,
        ExecutionType: null,
        StatementDescriptor: null,
        Culture: null,
        IpAddress: null,
        BrowserInfo: null,
        Billing: null,
        Shipping: null,
        Requested3DSVersion: null,
        Applied3DSVersion: null,
        CardInfo: null
    }
});
