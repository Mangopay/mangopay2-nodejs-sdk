/**
 * Examples of how users can be created
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

/**
 * Create a user from a hash of properties using promise. Don't forget to define PersonType
 */
api.Users.create({
    Name: 'MangoPay',
    Email: 'info@mangopay.com',
    LegalPersonType: 'BUSINESS',
    LegalRepresentativeFirstName: 'Mango',
    LegalRepresentativeLastName: 'Pay',
    LegalRepresentativeEmail: 'mango@mangopay.com',
    HeadquartersAddress: '1 rue MangoPay, Paris',
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: 'FR',
    LegalRepresentativeCountryOfResidence: 'FR',
    Tag: 'custom tag',
    PersonType: 'LEGAL'
}).then(function(data, response){
    var firstName = data.Name; // equals to model.data.Name
    console.log(firstName);
});