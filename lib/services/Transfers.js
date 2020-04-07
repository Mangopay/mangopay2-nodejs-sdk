/**
 * @module Transfers
 * @desc [MangoPay Transfers API Reference](https://docs.mangopay.com/api-references/transfers/)
 */

var Service = require('../service');

var Transfer = require('../models/Transfer');
var Refund = require('../models/Refund');

var Transfers = Service.extend({
    /**
     * Create new transfer
     * @param {Object}  transfer    Transfer object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}            Request promise
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
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                Request promise
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
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}            Request promise
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
    },

    /**
     * Gets list of Refunds of a Transfer
     * @param {number}      transferId      Transfer identifier
     * @param {function}    callback        Callback function
     * @param {Object}      options         Request options
     * @return {Object}                     Request promise
     */
    getRefunds: function(transferId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: transferId
            },
            dataClass: Refund
        });

        return this._api.method('refunds_get_for_transfer', callback, options);
    }
});

module.exports = Transfers;