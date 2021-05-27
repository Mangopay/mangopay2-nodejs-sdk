var _ = require('underscore');
var PayOutPaymentDetails = require('./PayOutPaymentDetails');

var PayOutPaymentDetailsBankWire = PayOutPaymentDetails.extend({
    defaults: {
        BankAccountId: null,
        /**
         * A custom reference you wish to appear on the user’s bank statement
         */
        BankWireRef: null,

        /**
         * The new parameter "PayoutModeRequested" can take two different values: "INSTANT_PAYMENT" or "STANDARD"
         */
        PayoutModeRequested: null,

        ModeRequested: null,

        ModeApplied: null,

        Status: null,

        FallbackReason: null
    }
});

module.exports = PayOutPaymentDetailsBankWire;