var EntityBase = require('./EntityBase');

var Money = EntityBase.extend({
    defaults: {
        Currency: null,
        Ammount: null
    }
});

module.exports = Money;