// In your app you will require('mangopay2-nodejs-sdk')
var mangopay = require('../index');

// In your app you will define your own set of configurations.
// Check README.md for the full list
var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

api.Users.create({
    PersonType: "NATURAL",
    FirstName: "John",
    LastName: "Smith",
    Birthday: 1300186358,
    Nationality: "FR",
    CountryOfResidence: "GB",
    Email: "john@smith.eu",
}).then(function (user) {
    api.Wallets.create({
        Owners: [ user.Id ],
        Description: "create wallet - demo",
        Currency: "EUR",
    })
        .then(function (res) {
            console.log("Wallet successfully created ", res)
        });
});