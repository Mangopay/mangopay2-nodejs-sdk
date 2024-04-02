var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        AuthorId: null,
        Status: null,
        SecureModeReturnURL: null,
        SecureModeRedirectURL: null,
        SecureModeNeeded: null,
        SecureMode: null,
        IpAddress: null,
        BrowserInfo: null,
        Validity: null,
        Type: null,
        Applied3DSVersion: null,
        ResultCode: null,
        ResultMessage: null
    }
});
