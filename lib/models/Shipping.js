var EntityBase = require('./EntityBase');

var Shipping = EntityBase.extend({
    defaults: {
        /**
         * The address
         */
        Address: null
    }
});

module.exports = Shipping;