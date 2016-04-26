/**
 * @module Refunds
 * @desc [MangoPay Refunds API Reference](https://docs.mangopay.com/api-references/refund/)
 */

var Service = require('../service');
var Refund = require('../models/Refund');

var Refunds = Service.extend({
    /**
     * Get events
     * @param {number} refundId     Refund id
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object} Request promise
     */
    get: function(refundId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: refundId
            },
            dataClass: Refund
        });

        return this._api.method('refunds_get', callback, options);
    }
});

module.exports = Refunds;