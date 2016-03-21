/**
 * Mangopay Nodejs SDK Example Usage
 */

var mangopay = require('./index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

api.Users.getNatural('1151091', function(data) {
    console.log(data);
});

var UserLegal = require('./lib/models/UserLegal');
var UserNatural = require('./lib/models/UserNatural');


var userLegal = new UserLegal();

userLegal.getReadOnlyProperties();
var userNatural = new UserNatural();


userLegal.getReadOnlyProperties();