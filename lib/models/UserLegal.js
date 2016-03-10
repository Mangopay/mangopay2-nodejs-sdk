/**
 * WORK IN PROGRESS
 */
var _ = require('underscore');
var User = require('./User');
var Address = require('./Address');

var UserLegal = User.extend({
    defaults: _.extend({}, User.prototype.defaults, {
        Name: null,
        /**
         * Type for legal user. Possible: ‘BUSINESS’, ’ORGANIZATION’
         */
        LegalPersonType: null,
        HeadquartersAddress: null,
        LegalRepresentativeFirstName: null,
        LegalRepresentativeLastName: null,
        LegalRepresentativeAddress: null,
        LegalRepresentativeEmail: null,
        LegalRepresentativeBirthday: null,
        LegalRepresentativeNationality: null,
        LegalRepresentativeCountryOfResidence: null,
        ProofOfIdentity: null,
        Statute: null,
        ProofOfRegistration: null,
        ShareholderDeclaration: null
    }),

    /**
     * Construct
     */
    initialize: function() {
        User.prototype.initialize.apply(this, arguments);
        this.setPersonType('LEGAL');
    },

    /**
     * Get array with mapping which property is object and what type of object
     */
    getSubObjects: function() {
        var subObjects = User.prototype.getSubObjects();

        return _.extend({}, subObjects, {
            HeadquartersAddress: Address,
            LegalRepresentativeAddress: Address
        });
    },

    /**
     * Get array with read-only properties
     */
    getReadOnlyProperties: function() {
        var properties = User.prototype.getReadOnlyProperties();
        properties.push('PersonType');
        return properties;
    }
});

module.exports = UserLegal;