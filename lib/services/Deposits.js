var Service = require('../service');
var Deposit = require('../models/Deposit');

var Deposits = Service.extend({
    /**
     * Create a Deposit
     */
    create: function(deposit, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: deposit,
            dataClass: Deposit
        });

        return this._api.method('deposits_create', callback, options);
    },

    /**
     * Get a Deposit
     */
    get: function(depositId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                depositId: depositId
            },
            dataClass: Deposit
        });

        return this._api.method('deposits_get', callback, options);
    },

    /**
     * Cancel a Deposit
     */
    cancel: function(depositId, callback, options) {
        const dto = {
            PaymentStatus: 'CANCELED'
        };

        options = this._api._getOptions(callback, options, {
            path: {
                depositId: depositId
            },
            data: dto,
            dataClass: Deposit
        });

        return this._api.method('deposits_cancel', callback, options);
    }
});

module.exports = Deposits;
