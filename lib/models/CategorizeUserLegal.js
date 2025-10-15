var Model = require('./../Model');

var CategorizeUserLegal = Model.extend({
    defaults: {
        Id: null,
        UserCategory: null,
        TermsAndConditionsAccepted: null,
        LegalRepresentative: null,
        HeadquartersAddress: null,
        CompanyNumber: null,
        ScaContext: null
    }
});

module.exports = CategorizeUserLegal;