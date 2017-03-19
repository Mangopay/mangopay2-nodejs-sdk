/**
 * Examples of reading users data
 */
var mangopay = require('../index');

var api = new mangopay({
  clientId: 'sdk-unit-tests',
  clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju',
  debug: true
});

api.Users.getAll(function (response) {
  // Read pages count
  console.log(response.headers['x-number-of-pages']);
}, {
  parameters: {
    per_page: 1
  },
  resolveWithFullResponse: true
});

api.Users.getAll(null, {
  parameters: {
    per_page: 1
  },
  resolveWithFullResponse: true
}).then(function(){
  debugger;
  console.log('ok');
}).catch(function(){
  debugger;
});

// api.Users.getAll({
//   parameters: {
//     per_page: 1
//   },
//   resolveWithFullResponse: true
// }).then(function (data, response) {
//   debugger;
// });