var _ = require('underscore');

var PersonType = require('./PersonType');

var User = require('./User');
var Address = require('./Address');
var PendingUserAction = require('./PendingUserAction');

var UserNaturalSca = User.extend({
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
        PhoneNumber: null,
        PhoneNumberCountry: null,
        PendingUserAction: null,
        ScaContext: null
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
            Address: Address,
            PendingUserAction: PendingUserAction
        });
    },

    /**
     * Get array with read-only properties
     * @return {Array}
     */
    getReadOnlyProperties: function() {
        var properties = User.prototype.getReadOnlyProperties();
        properties.push('PersonType', 'ProofOfIdentity', 'ProofOfAddress', 'PendingUserAction');
        return properties;
    }
});

module.exports = UserNaturalSca;