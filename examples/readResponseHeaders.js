/**
 * Examples of reading users data
 */
var mangopay = require('../index');

var api = new mangopay({
  clientId: 'sdk-unit-tests',
  clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju',
  debug: true
});

/**
 * Read full server response object using a callback
 */
api.Users.getAll(function (response) {
  // Read pages count
  console.log(response.headers['x-number-of-pages']);

  // Read response body
  console.log(response.body);
}, {
  parameters: {
    per_page: 1
  },
  resolveWithFullResponse: true
});

/**
 * Read full server response object using promise
 */
api.Users.getAll({
  parameters: {
    per_page: 1
  },
  resolveWithFullResponse: true
}).then(function(response){
  // Read pages count
  console.log(response.headers['x-number-of-pages']);

  // Read response body
  console.log(response.body);
});