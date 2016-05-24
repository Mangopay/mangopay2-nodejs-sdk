var _ = require('underscore');
var Transaction = require('./Transaction');
var RefundReasonDetails = require('./RefundReasonDetails');

var Refund = Transaction.extend({
    defaults: _.extend({}, Transaction.prototype.defaults, {
        InitialTransactionId: null,
        /**
         * Initial transaction Type {PAYIN, PAYOUT, TRANSFER}
         */
        InitialTransactionType: null,
        DebitedWalletId: null,
        CreditedWalletId: null,
        RefundReason: null
    }),

    getSubObjects: function() {
        return {
            'RefundReason': RefundReasonDetails
        }
    }
});

module.exports = Refund;