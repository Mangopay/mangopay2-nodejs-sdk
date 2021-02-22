var EntityBase = require('./EntityBase');

var Shipping = EntityBase.extend({
    defaults: {
        FirstName: null,
        LastName: null,
        /**
         * The address
         */
        Address: null
    }
});

module.exports = Shipping;