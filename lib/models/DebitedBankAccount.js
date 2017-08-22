var Model = require('../Model');
var Money = require('./Money');

var DebitedBankAccount = Model.extend({
    defaults: {
        OwnerName: null
    }
});

module.exports = DebitedBankAccount;