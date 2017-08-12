/**
 * Examples of getting a user's emoney
 */
var mangopay = require('../index');
var PayIn = require('../lib/models/PayIn')

var api = new mangopay({
    baseUrl: 'https://api-test.mangopay.com/',
    clientId: 'sdk-unit-tests',
    clientPassword: '9RMGpwVUwFLK0SurxObJ2yaadDcO0zeKFKxWmthjB93SQjFzy0'
    //cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju
    //9RMGpwVUwFLK0SurxObJ2yaadDcO0zeKFKxWmthjB93SQjFzy0
});

var USER_ID = '1151091';

api.PayIns.get('2826947').then(function(data){
    var payIn = new PayIn(data);
    console.log(payIn.ExecutionType);
})

// api.Users.getEMoney(USER_ID).then(function(data){
//     console.log('hi')
//     console.log(data);
// });