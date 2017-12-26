var EntityBase = require('./EntityBase');
var Address = require('./Address');

/**
 * Models shipping details
 */
module.exports = EntityBase.extend({
    defaults: {
        /**
         * Name of the shipping recipient
         */
        RecipientName: null,

        /**
         * The shipping address
         */
        Address: null
    },

    getSubObjects: function () {
        return {
            'Address': Address
        };
    }
});