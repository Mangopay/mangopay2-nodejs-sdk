/**
 * Examples of getting a user's emoney
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

var USER_ID = '1151091';
var year = 2019;

api.Users.getEMoney(USER_ID, year).then(function (data) {
    console.log(data);
});