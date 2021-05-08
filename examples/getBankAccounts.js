/**
 * Examples of reading users data
 */
 var mangopay = require('../index');

 var api = new mangopay({
     clientId: 'sdk-unit-tests',
     clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
 });
 
 api.Users.getBankAccounts(108379078, {
     parameters: {
         per_page: 100,
         page: 1,
         active: false
     }
 }).then(function(data){
     console.log("Should be zero: " + data.length);
 });
 
 api.Users.getBankAccounts(108379078, {
     parameters: {
         per_page: 100,
         page: 1,
         active: true
     }
 }).then(function(data){
     console.log("Should be more than one: " + data.length);
 });