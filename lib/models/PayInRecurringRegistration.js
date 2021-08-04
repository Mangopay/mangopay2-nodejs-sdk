var EntityBase = require('./EntityBase');
var Money = require('./Money');
var Billing = require('./Billing');
var Shipping = require('./Shipping');
var CurrentState = require('./RecurringPayInCurrentState')

var PayInRecurringRegistration = EntityBase.extend({
    defaults: {
        /**
         * Array with owners identities
         */
        AuthorId: null,
        CardId: null,
        CreditedWalletId: null,
        CreditedUserId: null,
        FirstTransactionDebitedFunds: null,
        FirstTransactionFees: null,
        Billing: null,
        Shipping: null,
        CreditedUserId: null,
        EndDate: null,
        Frequency: null,
        FixedNextAmount: null,
        FractionedPayment: null,
        Migration: null,
        NextTransactionDebitedFunds: null,
        NextTransactionFees: null,
        Status: null,
        TotalAmount: null,
        CycleNumber: null,
        FreeCycles: null,
        CurrentState: null
    },

    /**
     * Get mapping of model properties and corresponding object types
     * @returns {Object}
     */
    getSubObjects: function() {
        return {
            'FirstTransactionDebitedFunds': Money,
            'FirstTransactionFees': Money,
            'Fees': Money,
            'Billing': Billing,
            'Shipping': Shipping,
            'NextTransactionDebitedFunds': Money,
            'NextTransactionFees': Money,
            'CurrentState': CurrentState
        }
    },

    /**
     * Get array with read-only properties
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function() {
        var properties = EntityBase.prototype.getReadOnlyProperties();
        properties.push('Status', 'TotalAmount', 'CycleNumber', 'FreeCycles', 'CurrentState');
        return properties;
    }
});

module.exports = PayInRecurringRegistration;
