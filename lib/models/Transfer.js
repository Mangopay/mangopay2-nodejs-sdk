var _ = require('underscore');
var Transaction = require('./Transaction');

var Transfer = Transaction.extend({
    defaults: _.extend({}, Transaction.prototype.defaults, {
        DebitedWalletId: null,
        CreditedWalletId: null
    })
});

module.exports = Transfer;