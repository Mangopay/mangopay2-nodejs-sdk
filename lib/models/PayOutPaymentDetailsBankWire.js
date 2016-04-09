var _ = require('underscore');
var PayOutPaymentDetails = require('./PayOutPaymentDetails');

var PayOutPaymentDetailsBankWire = PayOutPaymentDetails.extend({
    defaults: {
        BankAccountId: null,
        /**
         * A custom reference you wish to appear on the user’s bank statement
         */
        BankWireRef: null
    }
});

module.exports = PayOutPaymentDetailsBankWire;