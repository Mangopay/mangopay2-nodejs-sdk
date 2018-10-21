/**
 * Examples of reading users data
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

/**
 * Using both callback and promise. Usually you should be using only one of them
 */
api.Users.getNatural('1151091', function(data, response) {
    console.log(data.FirstName);
    console.log(data.LastName);
}).then(function(data){
    console.log(data.FirstName);
    console.log(data.LastName);
});

/**
 * Example of pagination with promise on getAll users API
 */
api.Users.getAll({
    parameters: {
        per_page: 2,
        page: 2
    }
}).then(function(data){
    console.log(data);
});