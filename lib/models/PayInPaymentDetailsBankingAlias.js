var PayInPaymentDetails = require('./PayInPaymentDetails');
var DebitedBankAccount = require('./DebitedBankAccount');

var PayInPaymentDetailsBankingAlias = PayInPaymentDetails.extend({
    defaults: {
        BankingAliasId: null,
        WireReference: null,
        DebitedBankAccount: null
    },

    getSubObjects: function () {
        return {
            'DebitedBankAccount': DebitedBankAccount
        };
    }
});

module.exports = PayInPaymentDetailsBankingAlias;