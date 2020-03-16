var _ = require('underscore');
var PayInExecutionDetails = require('./PayInExecutionDetails');
var DebitedBankAccount = require('./DebitedBankAccount');

var PayInExecutionDetailsBankingAlias = PayInExecutionDetails.extend({
    defaults: {
        BankingAliasId: null,
        WireReference: null,
        DebitedBankAccount: null
    },

    getSubObjects: function() {
        return {
            'DebitedBankAccount': DebitedBankAccount
        }
    }
});

module.exports = PayInExecutionDetailsBankingAlias;