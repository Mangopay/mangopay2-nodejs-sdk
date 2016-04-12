var _ = require('underscore');

var Service = require('../service');

var Transfer = require('../models/Transfer');
var Refund = require('../models/Refund');

var Transfers = Service.extend({
    /**
     * Create new transfer
     * @param {Object}  transfer    Transfer object
     * @param callback
     * @param options
     * @returns {Object}            Request promise
     */
    create: function(transfer, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: transfer,
            dataClass: Transfer
        });

        return this._api.method('transfers_create', callback, options);
    },

    /**
     * Get transfer
     * @param {number}  transferId      Transfer identifier
     * @param callback
     * @param options
     * @returns {Object}                Request promise
     */
    get: function(transferId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: transferId
            },
            dataClass: Transfer
        });

        return this._api.method('transfers_get', callback, options);
    },

    /**
     * Create refund for transfer object
     * @param {number}  transferId  Transfer identifier
     * @param {Object}  refund      Refund object
     * @param callback
     * @param options
     * @returns {Object}            Request promise
     */
    createRefund: function(transferId, refund, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: refund,
            path: {
                id: transferId
            },
            dataClass: Refund
        });

        return this._api.method('transfers_createrefunds', callback, options);
    }
});

module.exports = Transfers;