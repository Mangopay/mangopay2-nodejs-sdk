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
        KYCLevel: null,

        /**
         * Whether or not the user has accepted the MANGOPAY Terms and Conditions.
         */
        TermsAndConditionsAccepted: null,

        /**
         * Category of the user. May take one of the following values:
         * PAYER - Users who only use MANGOPAY to give money to other users
         * OWNER - Users who use MANGOPAY to receive funds. Please note that a user needs to be KYC validated to perform payouts
         */
        UserCategory: null
    },

    /**
     * Sets the person type to the model
     * @param {String} personType
     */
    setPersonType: function(personType) {
        this.PersonType = personType;
    },

    setUserCategory: function(userCategory) {
        this.UserCategory = userCategory;
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
