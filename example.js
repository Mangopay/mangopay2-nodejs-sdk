/**
 * Mangopay Nodejs SDK Example Usage
 */

var mangopay = require('./index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

api.Users.getAll(function(data) {
    console.log(data);
});