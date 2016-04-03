var EntityBase = require('./EntityBase');
var Money = require('./Money');

var Wallet = EntityBase.extend({
    defaults: {
        /**
         * Array with owners identities
         */
        Owners: null,
        Description: null,
        Balance: null,
        Currency: null
    },

    getSubObjects: function() {
        return {
            'Balance': Money
        }
    },

    /**
     * Get array with read-only properties
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function() {
        var properties = EntityBase.prototype.getReadOnlyProperties();
        properties.push('Balance');
        return properties;
    }
});

module.exports = Wallet;