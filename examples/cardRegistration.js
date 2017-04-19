/**
 * Examples of reading users data
 */
var mangopay = require('../index');

var mangoPay = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

mangoPay.Users.create({
    "PersonType": "NATURAL",
    "Email": "support@mangopay.com",
    "KYCLevel": "REGULAR",
    "FirstName": "Joe",
    "LastName": "Blogs",
    "Birthday": 1463496101,
    "Nationality": "GB",
    "CountryOfResidence": "FR"
}).then(function(userData){
    mangoPay.CardRegistrations.create({
        UserId: userData.Id,
        Currency: "EUR",
        CardType: "CB_VISA_MASTERCARD"
    }).then(function(cardRegistrationData){
        // Sandbox only
        var cardData = {
            "cardNumber": "4970100000000154",
            "cardExpirationDate": "1020",
            "cardCvx": "123"
        };
        mangoPay.CardRegistrations.registerCard(cardRegistrationData, cardData, function(data){
            console.log("Updated card registration data token is %j", JSON.stringify(data));
        });
    });
});