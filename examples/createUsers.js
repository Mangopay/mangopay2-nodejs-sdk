/**
 *
 * Creating users using Mangopay SDK Models and hash of properties
 *
 */


// In your app you will require('mangopay2-nodejs-sdk')
var mangopay = require('../index');

// In your app you will define your own set of configurations.
// Check README.md for the full list
var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

/**
 *
 * Create a new user using Mangopay SDK Model
 * Promise style handling of the response
 *
 */
var myUser = new api.models.UserLegal({
    Name: 'MangoPay',
    Email: 'info@mangopay.com',
    LegalPersonType: 'BUSINESS',
    LegalRepresentativeFirstName: 'Mango',
    LegalRepresentativeLastName: 'Pay',
    LegalRepresentativeEmail: 'mango@mangopay.com',
    HeadquartersAddress: new api.models.Address({
        AddressLine1: "4101 Reservoir Rd NW",
        AddressLine2: "",
        City: "Washington",
        Region: "District of Columbia",
        PostalCode: "20007",
        Country: "US"
    }),
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: 'FR',
    LegalRepresentativeCountryOfResidence: 'FR',
    Tag: 'custom tag'
});

api.Users.create(myUser).then(function(){
    // Output the created user data to console
    console.log(myUser.Name + ' user created at ' + myUser.CreationDate);
});

/**
 *
 * Create a user using a hash of properties. Res
 * Don't forget to define PersonType
 * This example uses callback pattern approach
 *
 */
api.Users.create({
    Name: 'MangoPay',
    Email: 'info@mangopay.com',
    LegalPersonType: 'BUSINESS',
    LegalRepresentativeFirstName: 'Mango',
    LegalRepresentativeLastName: 'Pay',
    LegalRepresentativeEmail: 'mango@mangopay.com',
    PersonType: "LEGAL",
    HeadquartersAddress: {
        "AddressLine1": "4101 Reservoir Rd NW",
        "AddressLine2": "",
        "City": "Washington",
        "Region": "District of Columbia",
        "PostalCode": "20007",
        "Country": "US"
    },
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: 'FR',
    LegalRepresentativeCountryOfResidence: 'FR',
    Tag: 'custom tag'
}, function(myOtherUser) {
    // Output the created user data to console
    console.log(myOtherUser.Name + ' user created at ' + myOtherUser.CreationDate);
});