/**
 * Examples of trying to read invalid data.
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

/**
 * Try to request invalid user
 */
var INVALID_UID = '11510910021zx';

api.Users.getNatural(INVALID_UID)
    .catch(function(data) {
        // Catch the failure
        console.error(data.Message);
    });