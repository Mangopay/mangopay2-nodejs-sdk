var _ = require('underscore');

var Model = require('../Model');
var Money = require('./Money');

var EMoney = Model.extend({
    defaults: _.extend({}, Model.prototype.defaults, {
        /**
         * Owner object owner's UserId
         */
        UserId: null,
        CreditedEMoney: null,
        DebitedEMoney: null
    }),

    /**
     * Get object with key as object type and value the object class
     * @return {Object} Sub-objects mapping
     */
    getSubObjects: function () {
        var subObjects = User.prototype.getSubObjects();

        return _.extend({}, subObjects, {
            CreditedEMoney: Money,
            DebitedEMoney: Money
        });
    }
});

module.exports = EMoney;
