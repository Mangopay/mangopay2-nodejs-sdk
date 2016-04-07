var _ = require('underscore');
var EntityBase = require('./EntityBase');

var User = EntityBase.extend({
    defaults: {
        /**
         * Type of user
         */
        PersonType: null,

        /**
         * Email address
         */
        Email: null,

        /**
         * KYC Level (LIGHT or REGULAR)
         */
        KYCLevel: null
    },

    /**
     * Sets the person type to the model
     * @param {String} personType
     */
    setPersonType: function(personType) {
        this.PersonType = personType;
    },

    /**
     * Get array with read-only properties
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function() {
        var properties = EntityBase.prototype.getReadOnlyProperties();
        properties.push('PersonType', 'KYCLevel');
        return properties;
    },

    parse: function() {
        var parsedValues = EntityBase.prototype.parse.call(this, arguments);
        return _.omit(parsedValues, 'CreationDate');
    }
});

module.exports = User;