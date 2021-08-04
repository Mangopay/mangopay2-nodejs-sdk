var Model = require('./../Model');
var Billing = require('./Billing');
var Shipping = require('./Shipping');

var RecurringPayInPut = Model.extend({
    defaults: {
        CardId: null,
        Billing: null,
        Shipping: null
    },
    
    /**
     * Get mapping of model properties and corresponding object types
     * @returns {Object}
     */
    getSubObjects: function() {
        return {
            'Billing': Billing,
            'Shipping': Shipping
        }
    }
});

module.exports = RecurringPayInPut;