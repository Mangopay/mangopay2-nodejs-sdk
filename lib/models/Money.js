var EntityBase = require('./EntityBase');

var Money = EntityBase.extend({
    defaults: {
        /**
         * The currency - should be ISO 4217 format
         */
        Currency: null,
        /**
         * The amount of money in cents, e.g. 12.60€ would be represented as 1260
         */
        Amount: null
    }
});

module.exports = Money;