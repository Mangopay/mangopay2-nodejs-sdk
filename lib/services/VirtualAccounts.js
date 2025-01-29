/**
 * @module VirtualAccounts
 */
var Service = require('../service');
var VirtualAccount = require("../models/VirtualAccount");

var VirtualAccounts = Service.extend({
    /**
     * Create new virtual account
     * @param {string}  walletId   Id of the wallet
     * @param {Object}  virtualAccount   Virtual account POST object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    create: function(walletId, virtualAccount, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                walletId: walletId
            },
            data: virtualAccount,
            dataClass: VirtualAccount
        });

        return this._api.method('virtual_accounts_create', callback, options);
    },

    /**
     * Deactivate a virtual account
     * @param {string}  walletId   Id of the Wallet
     * @param {string}  virtualAccountId   Id of the VirtualAccount
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    deactivate: function(walletId, virtualAccountId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                walletId: walletId,
                virtualAccountId: virtualAccountId
            },
            data: {
                Active: false
            },
            dataClass: VirtualAccount
        });

        return this._api.method('virtual_accounts_deactivate', callback, options);
    },

    /**
     * Get a virtual account
     * @param {string}  walletId   Id of the Wallet
     * @param {string}  virtualAccountId   Id of the VirtualAccount
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    get: function(walletId, virtualAccountId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                walletId: walletId,
                virtualAccountId: virtualAccountId
            },
            dataClass: VirtualAccount
        });

        return this._api.method('virtual_accounts_get', callback, options);
    },

    /**
     * Get all virtual accounts
     * @param {string}  walletId   Id of the Wallet
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    getAll: function(walletId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                walletId: walletId
            }
        });

        return this._api.method('virtual_accounts_get_all', callback, options);
    },

    /**
     * Get virtual accounts availabilities
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    getAvailabilities: function(callback, options) {
        return this._api.method('virtual_accounts_get_availabilities', callback, options);
    },
});

module.exports = VirtualAccounts;
