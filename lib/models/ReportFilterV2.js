var Model = require('../Model');

var ReportFilterV2 = Model.extend({
    defaults: {
        Currency: null,
        UserId: null,
        WalletId: null
    }
});

module.exports = ReportFilterV2;
