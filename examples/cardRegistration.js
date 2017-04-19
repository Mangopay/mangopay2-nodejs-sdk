/**
 * Examples of reading users data
 */
var mangopay = require('../index');

var mangoPay = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

var user;

mangoPay.Users.create({
    "PersonType": "NATURAL",
    "Email": "support@mangopay.com",
    "KYCLevel": "REGULAR",
    "FirstName": "Joe",
    "LastName": "Blogs",
    "Birthday": 1463496101,
    "Nationality": "GB",
    "CountryOfResidence": "FR"
}, function (res) {
    user = res;

    mangoPay.CardRegistrations.create({
        "UserId": user.Id,
        "Currency": "EUR",
        "CardType": "CB_VISA_MASTERCARD"
    }, function (res) {
        var cardRegistrationData = {
            "data": res.PreregistrationData,
            "accessKeyRef": res.AccessKey,
            "returnURL": "http://localhost", // "url",
            "cardNumber": "4970100000000154",
            "cardExpirationDate": "1020",
            "cardCvx": "123"
        };

        mangoPay.CardRegistrations.registerCard(res.CardRegistrationURL, cardRegistrationData, function(body){
            console.log("Registered card " + cardRegistrationData.cardNumber);
        });
    });
});

