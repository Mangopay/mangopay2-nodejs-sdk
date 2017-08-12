/**
 * Examples of getting a user's emoney
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

var USER_ID ='1151091';

api.Users.getEMoney(USER_ID).then(function(data){
    console.log(data);
});