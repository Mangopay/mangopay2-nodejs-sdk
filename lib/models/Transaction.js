var EntityBase = require('./EntityBase');
var Money = require('./Money');

var Wallet = EntityBase.extend({
    defaults: {
        /**
         * Array with owners identities
         */
        AuthorId: null,
        CreditedUserId: null,
        DebitedFunds: null,
        CreditedFunds: null,
        Fees: null,
        /**
         * TransactionStatus {CREATED, SUCCEEDED, FAILED}
         */
        Status: null,
        ResultCode: null,
        ResultMessage: null,
        ExecutionDate: null,
        Type: null,
        Nature: null,
        DebitedWalletId: null,
        CreditedWalletId: null
    },

    /**
     * Get mapping of model properties and corresponding object types
     * @returns {Object}
     */
    getSubObjects: function() {
        return {
            'DebitedFunds': Money,
            'CreditedFunds': Money,
            'Fees': Money
        }
    },

    /**
     * Get array with read-only properties
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function() {
        var properties = EntityBase.prototype.getReadOnlyProperties();
        properties.push('Status', 'ResultCode', 'ExecutionDate');
        return properties;
    }
});

module.exports = Wallet;