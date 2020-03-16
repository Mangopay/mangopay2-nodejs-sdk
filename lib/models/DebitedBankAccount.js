var Model = require('../Model');
var Money = require('./Money');

var DebitedBankAccount = Model.extend({
    defaults: {
        OwnerName: null,
        AccountNumber: null,
        IBAN: null,
        BIC: null,
        Type: null,
        Country: null
    }
});

module.exports = DebitedBankAccount;