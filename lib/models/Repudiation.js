var _ = require('underscore');
var Model = require('../Model');
var Money = require('./Money');

var Repudiation = Model.extend({
    defaults: {
        AuthorId: null,
        /**
         * The funds repudiated from the wallet
         */
        DebitedFunds: null,
        /**
         * The fees taken on the repudiation – will always be 0 at this stage
         */
        Fees: null,
        /**
         * The amount of credited funds – since there are currently no fees,
         * this will be equal to the DebitedFunds
         */
        CreditedFunds: null,
        /**
         * The wallet from where the repudiation was taken
         */
        DebitedWalletId: null,
        /**
         * The status of the transfer {CREATED, SUCCEEDED, FAILED}
         */
        Status: null,
        ResultCode: null,
        ResultMessage: null,
        ExecutionDate: null,
        /**
         * The Id of the dispute to which this repudation corresponds.
         * Note that this value may be null (if it was created before the Dispute
         * objects started to be used – October 2015)
         */
        DisputeId: null,
        InitialTransactionId: null,
        InitialTransactionType: null
    },

    getSubObjects: function() {
        return {
            'DebitedFunds': Money,
            'Fees': Money,
            'CreditedFunds': Money
        }
    }
});

module.exports = Repudiation;