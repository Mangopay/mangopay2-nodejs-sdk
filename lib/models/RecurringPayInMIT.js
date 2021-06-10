var EntityBase = require('./EntityBase');
var Money = require('./Money');

var RecurringPayInMIT = EntityBase.extend({
    defaults: {
        /**
         * Array with owners identities
         */
         RecurringPayinRegistrationId: null,
         DebitedFunds: null,
         Fees: null,
         StatementDescriptor: null
    },

    /**
     * Get mapping of model properties and corresponding object types
     * @returns {Object}
     */
    getSubObjects: function() {
        return {
            'DebitedFunds': Money,
            'Fees': Money
        }
    }
});

module.exports = RecurringPayInMIT;
