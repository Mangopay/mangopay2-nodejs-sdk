var _ = require('underscore');
var Model = require('../Model');
var Money = require('./Money');

var SettlementTransfer = Model.extend({
    defaults: {
        /**
         * The Id of the author of the original PayIn that was repudiated
         */
        AuthorId: null,

        /**
         * The funds debited from the debited wallet
         */
        DebitedFunds: null,

        /**
         * The amount you wish to charge for this settlement.
         * This can be equal to 0, or more than 0 to charge for the settlement
         * or less than 0 to refund some of the original Fees that were taken
         * on the original settlement (eg DebitedFunds of 1000 and
         * Fees of -200 will transfer 800 from the original wallet
         * to the credit wallet, and transfer 200 from your Fees
         * wallet to your Credit wallet
         */
        Fees: null
    },

    getSubObjects: function() {
        return {
            'DebitedFunds': Money,
            'Fees': Money
        }
    }
});

module.exports = SettlementTransfer;
