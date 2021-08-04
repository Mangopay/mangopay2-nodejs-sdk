var EntityBase = require('./EntityBase');
var BrowserInfo = require('./BrowserInfo');
var Money = require('./Money');

var RecurringPayInCIT = EntityBase.extend({
    defaults: {
        /**
         * Array with owners identities
         */
         RecurringPayinRegistrationId: null,
         BrowserInfo: null,
         IpAddress: null,
         SecureModeReturnURL: null,
         StatementDescriptor: null,
         DebitedFunds: null,
         Fees: null
    },

    /**
     * Get mapping of model properties and corresponding object types
     * @returns {Object}
     */
    getSubObjects: function() {
        return {
            'BrowserInfo': BrowserInfo,
            'DebitedFunds': Money,
            'Fees': Money
        }
    }
});

module.exports = RecurringPayInCIT;
