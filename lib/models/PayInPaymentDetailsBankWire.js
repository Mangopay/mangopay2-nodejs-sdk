var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');
var Money = require('./Money');
var BankAccount = require('./BankAccount');

var PayInPaymentDetailsBankWire = PayInPaymentDetails.extend({
    defaults: {
        DeclaredDebitedFunds: null,
        DeclaredFees: null,
        BankAccount: null,
        WireReference: null
    },

    getSubObjects: function() {
        return {
            'DeclaredDebitedFunds': Money,
            'DeclaredFees': Money,
            'BankAccount': BankAccount
        }
    }
});

module.exports = PayInPaymentDetailsBankWire;