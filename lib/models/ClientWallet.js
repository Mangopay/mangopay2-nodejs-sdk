var EntityBase = require('./EntityBase');
var Money = require('./Money');

var ClientWallet = EntityBase.extend({
    defaults : {
        Balance : null,
        Currency : null,
        FundsType : null
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

module.exports = ClientWallet;