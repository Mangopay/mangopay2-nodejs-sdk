var EntityBase = require('./EntityBase');

var User = EntityBase.extend({
    defaults: {
        UserId: null,

        Type: null,

        OwnerName: null,

        OwnerAddress: null,

        Details: null
    },

    /**
     * Get array with read-only properties
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function () {
        var properties = EntityBase.prototype.getReadOnlyProperties();
        properties.push('UserId', 'Type');
        return properties;
    }
});

module.exports = User;