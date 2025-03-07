var _ = require('underscore');

var PersonType = require('./PersonType');

var User = require('./User');
var Address = require('./Address');
var PendingUserAction = require('./PendingUserAction');
var LegalRepresentative = require('./LegalRepresentative');

var UserLegalSca = User.extend({
    defaults: _.extend({}, User.prototype.defaults, {
        Name: null,
        LegalPersonType: null,
        LegalRepresentative: null,
        ProofOfRegistration: null,
        ShareholderDeclaration: null,
        Statute: null,
        CompanyNumber: null,
        PendingUserAction: null,
        HeadquartersAddress: null,
        LegalRepresentativeAddress: null
    }),

    initialize: function() {
        User.prototype.initialize.apply(this, arguments);
        this.setPersonType(PersonType.Legal);
    },

    /**
     * Get object with key as object type and value the object class
     * @return {Object} Mapping of sub-objects
     */
    getSubObjects: function() {
        var subObjects = User.prototype.getSubObjects();

        return _.extend({}, subObjects, {
            Address: Address,
            HeadquarterAddress: Address,
            LegalRepresentativeAddress: Address,
            PendingUserAction: PendingUserAction,
            LegalRepresentative: LegalRepresentative
        });
    },

    /**
     * Get array with read-only properties
     * @return {Array}
     */
    getReadOnlyProperties: function() {
        var properties = User.prototype.getReadOnlyProperties();
        properties.push('Statute', 'ProofOfRegistration', 'ShareholderDeclaration');
        return properties;
    }
});

module.exports = UserLegalSca;