var Model = require('../Model');

var ReportFilter = Model.extend({
    defaults: {
        /**
         * To return only resources that have CreationDate BEFORE this date
         */
        BeforeDate: null,
        /**
         * To return only resources that have CreationDate AFTER this date
         */
        AfterDate: null,
        /**
         * The type of the transaction
         */
        Type: null,
        /**
         * The status of the transaction
         */
        Status: null,
        /**
         * The nature of the transaction
         */
        Nature: null,
        /**
         * The minimum amount of DebitedFunds
         */
        MinDebitedFundsAmount: null,
        /**
         * The currency for the minimum amount of DebitedFunds
         */
        MinDebitedFundsCurrency: null,
        /**
         * The maximum amount of DebitedFunds
         */
        MaxDebitedFundsAmount: null,
        /**
         * The currency for the maximum amount of DebitedFunds
         */
        MaxDebitedFundsCurrency: null,
        /**
         * The object owner's id
         */
        AuthorId: null,

        WalletId: null

    }

});

module.exports = ReportFilter;
