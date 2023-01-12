var _ = require('underscore');

var PersonType = require('./PersonType');

var User = require('./User');
var Address = require('./Address');
var UserCategory = require("./UserCategory");

var UserLegalOwner = User.extend({
    defaults: _.extend({}, User.prototype.defaults, {
        Name: null,
        /**
         * Type for legal user. Possible: ‘BUSINESS’, ’ORGANIZATION’, 'SOLETRADER', 'PARTNERSHIP
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
        CompanyNumber: null,
        ProofOfIdentity: null,
        Statute: null,
        ProofOfRegistration: null,
        ShareholderDeclaration: null,
        UserCategory: null,
        TermsAndConditionsAccepted: null
    }),

    /**
     * Construct
     */
    initialize: function() {
        User.prototype.initialize.apply(this, arguments);
        this.setPersonType(PersonType.Legal);
        this.setUserCategory(UserCategory.Owner);
    },

    /**
     * Get object with key as object type and value the object class
     * @return {Object} Sub-objects mapping
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
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function() {
        var properties = User.prototype.getReadOnlyProperties();
        properties.push('Statute', 'ProofOfRegistration', 'ShareholderDeclaration');
        return properties;
    }
});

module.exports = UserLegalOwner;
