var EntityBase = require('./EntityBase');

var LegalRepresentative = EntityBase.extend({
    defaults: {
        FirstName: null,
        LastName: null,
        Birthday: null,
        Nationality: null,
        CountryOfResidence: null,
        Email: null,
        PhoneNumber: null,
        PhoneNumberCountry: null
    }
});

module.exports = LegalRepresentative;