/**
 * Mangopay Nodejs SDK Example Usage
 */

var mangopay = require('./index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

//api.Users.getNatural('1151091', function(data) {
//    console.log(data);
//});
//
//api.Users.getAll(function(data) {
//    console.log(data);
//});

var UserLegal = require('./lib/models/UserLegal');
var UserNatural = require('./lib/models/UserNatural');


var userLegal = new UserLegal();

userLegal.getReadOnlyProperties();
var userNatural = new UserNatural(
    {
        "FirstName": "Victor",
        "LastName": "Hugo",
        "Address": "1 rue des Misérables, Paris",
        "Birthday": 1300186358,
        "Nationality": "FR",
        "CountryOfResidence": "FR",
        "Occupation": "Writer",
        "IncomeRange": "6",
        "ProofOfIdentity": null,
        "ProofOfAddress": null,
        "PersonType": "NATURAL",
        "Email": "victor@hugo.com",
        "Tag": "custom tag"
    }
);

var userLegal = new UserLegal(
    {
        Name: "MangoPay",
        Email: "info@mangopay.com",
        LegalPersonType: "BUSINESS",
        LegalRepresentativeFirstName: "Mango",
        LegalRepresentativeLastName: "Pay",
        LegalRepresentativeEmail: "mango@mangopay.com",
        HeadquartersAddress: "1 rue MangoPay, Paris",
        LegalRepresentativeBirthday: 1300186358,
        LegalRepresentativeNationality: "FR",
        LegalRepresentativeCountryOfResidence: "FR",
        Tag: "custom tag"
    }
);
api.Users.create({
    Name: "MangoPay",
    Email: "info@mangopay.com",
    LegalPersonType: "BUSINESS",
    LegalRepresentativeFirstName: "Mango",
    LegalRepresentativeLastName: "Pay",
    LegalRepresentativeEmail: "mango@mangopay.com",
    HeadquartersAddress: "1 rue MangoPay, Paris",
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: "FR",
    LegalRepresentativeCountryOfResidence: "FR",
    Tag: "custom tag",
    PersonType: 'LEGAL'
}, function(model, response){
    debugger;
});