/**
 * Examples of reading users data
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

/**
 * Using both callback and promise
 */
api.Users.getNatural('1151091', function(model) {
    console.log(model['FirstName']);
    console.log(model['LastName']);
}).then(function(model){
    console.log(model['FirstName']);
    console.log(model['LastName']);
});


/**
 * Exemple of pagination with promise on getAll users API
 */
api.Users.getAll({
    parameters: {
        per_page: 2,
        page: 2
    }
}).then(function(data){
    console.log(data)
});