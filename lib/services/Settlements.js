/**
 * @module Settlements
 */

var Service = require('../service');
var Settlement = require('../models/Settlement');

var Settlements = Service.extend({
    /**
     * Upload a settlement file
     * @param {Buffer} file       The settlement file to be uploaded
     * @param {Function} callback Callback function
     * @param {Object} options    Request options
     * @return {Object}           Request promise
     */
    upload: function (file, callback, options) {
        if (file === undefined || !Buffer.isBuffer(file)) {
            throw new Error('The file needs to be a Buffer');
        }

        options = this._api._getOptions(callback, options, {
            dataClass: Settlement,
            data: {
                file: file,
                fileName: 'settlement_file.csv'
            }
        });

        return this._api.multipartFormMethod('settlement_create', callback, options);
    },

    /**
     * Get a settlement
     * @param {string} settlementId Settlement Id
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Request promise
     */
    get: function (settlementId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {id: settlementId},
            dataClass: Settlement
        });

        return this._api.method('settlement_get', callback, options);
    },

    /**
     * Update a settlement file
     * @param {string} settlementId Settlement identifier
     * @param {Buffer} file         The settlement file to be updated
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Request promise
     */
    update: function (settlementId, file, callback, options) {
        if (file === undefined || !Buffer.isBuffer(file)) {
            throw new Error('The file needs to be a Buffer');
        }

        options = this._api._getOptions(callback, options, {
            dataClass: Settlement,
            data: {
                file: file,
                fileName: 'settlement_file.csv'
            },
            path: {id: settlementId}
        });

        return this._api.multipartFormMethod('settlement_update', callback, options);
    },
});

module.exports = Settlements;