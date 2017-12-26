var _ = require('underscore');

var PersonType = require('./PersonType');

var User = require('./User');
var Address = require('./Address');

var UserNatural = User.extend({
    defaults: _.extend({}, User.prototype.defaults, {
        FirstName: null,
        LastName: null,
        Address: null,
        Birthday: null,
        Nationality: null,
        CountryOfResidence: null,
        Occupation: null,
        IncomeRange: null,
        ProofOfIdentity: null,
        ProofOfAddress: null,
        Capacity: null
    }),

    initialize: function() {
        User.prototype.initialize.apply(this, arguments);
        this.setPersonType(PersonType.Natural);
    },

    /**
     * Get object with key as object type and value the object class
     * @return {Object} Mapping of sub-objects
     */
    getSubObjects: function() {
        var subObjects = User.prototype.getSubObjects();

        return _.extend({}, subObjects, {
            Address: Address
        });
    },

    /**
     * Get array with read-only properties
     * @return {Array}
     */
    getReadOnlyProperties: function() {
        var properties = User.prototype.getReadOnlyProperties();
        properties.push('PersonType', 'ProofOfIdentity', 'ProofOfAddress');
        return properties;
    }
});

module.exports = UserNatural;