/**
 * WORK IN PROGRESS
 */
var api = require('../api');
var Model = require('../model');

var Users = Model.extend({
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

    setPersonType: function(personType) {
        this.setData('PersonType', personType);
    },

    /**
     * Get array with read-only properties
     */
    getReadOnlyProperties: function() {
        var properties = Model.prototype.getReadOnlyProperties();
        properties.push('PersonType');
        return properties;
    }
});

module.exports = Users;