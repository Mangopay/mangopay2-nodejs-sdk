/**
 * Examples of how users can be created
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

/**
 * Create a Natural user from a Model
 */
var UserNatural = require('../lib/models/UserNatural');

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

api.Users.create(userNatural, function(model, response){
    var firstName = model.getData('FirstName'); // equals to model.data.FirstName
    console.log(firstName);
});

/**
 * Create a Legal user from a Model
 */
var UserLegal = require('../lib/models/UserLegal');

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

api.Users.create(userLegal, function(model, response){
    var firstName = model.getData('Name'); // equals to model.data.FirstName
    console.log(firstName);
});

/**
 * Create a user from a hash of properties. Don't forget to define PersonType
 */
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
    PersonType: "LEGAL"
}, function(model, response){
    var firstName = model.getData('Name'); // equals to model.data.Name
    console.log(firstName);
});