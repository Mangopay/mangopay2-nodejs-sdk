var Model = require('./../Model');
var Money = require('./Money')

var RecurringPayInCurrentState = Model.extend({
    defaults: {
        PayinsLinked: null,
        CumulatedDebitedAmount: null,
        CumulatedFeesAmount: null,
        LastPayinId: null
    },
    
    /**
     * Get mapping of model properties and corresponding object types
     * @returns {Object}
     */
         getSubObjects: function() {
            return {
                'CumulatedDebitedAmount': Money,
                'CumulatedFeesAmount': Money
            }
        }
});

module.exports = RecurringPayInCurrentState;