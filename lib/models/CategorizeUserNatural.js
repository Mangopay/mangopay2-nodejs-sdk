var Model = require('./../Model');

var CategorizeUserNatural = Model.extend({
    defaults: {
        Id: null,
        UserCategory: null,
        TermsAndConditionsAccepted: null,
        Email: null,
        Birthday: null,
        Nationality: null,
        CountryOfResidence: null,
        PhoneNumber: null,
        PhoneNumberCountry: null
    }
});

module.exports = CategorizeUserNatural;