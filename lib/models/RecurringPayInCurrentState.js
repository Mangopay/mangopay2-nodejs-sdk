var EntityBase = require('./EntityBase');
var Money = require('./Money')

var RecurringPayInCurrentState = EntityBase.extend({
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