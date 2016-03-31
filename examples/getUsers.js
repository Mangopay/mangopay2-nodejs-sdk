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
    // Getter is always preferred over the direct data access
    console.log(model.data.FirstName);
    console.log(model.getData('LastName'));
}).then(function(model){
    console.log(model.data.FirstName);
    console.log(model.getData('LastName'));
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