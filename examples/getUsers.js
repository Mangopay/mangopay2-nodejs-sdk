/**
 * Examples of reading users data
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});


api.Users.getNatural('1151091', function(model) {
    // Getter is always preferred over the direct data access
    console.log(model.data.firstName);
    console.log(model.getData('LastName'));
});

api.Users.getAll(function(model) {
    console.log(model.data);
});