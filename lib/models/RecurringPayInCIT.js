var EntityBase = require('./EntityBase');
var BrowserInfo = require('./BrowserInfo');

var RecurringPayInCIT = EntityBase.extend({
    defaults: {
        /**
         * Array with owners identities
         */
         RecurringPayinRegistrationId: null,
         BrowserInfo: null,
         IpAddress: null,
         SecureModeReturnURL: null,
         StatementDescriptor: null
    },

    /**
     * Get mapping of model properties and corresponding object types
     * @returns {Object}
     */
    getSubObjects: function() {
        return {
            'BrowserInfo': BrowserInfo
        }
    }
});

module.exports = RecurringPayInCIT;
