/**
 * @module BankingAliases
 */

var Service = require('../service');
var BankingAlias = require('../models/BankingAlias');
var BankingAliasIBAN = require('../models/BankingAliasIBAN');

var BankingAliases = Service.extend({
    /**
     * Create a banking alias
     * @param {Object}      bankingAlias    Banking Alias Data
     * @param {Function}    callback        Callback function
     * @param {Object}      options         Request options
     * @return {Object}                     Request promise
     */
    create: function(bankingAlias, callback, options) {

        var bankingAliasKey = this.getBankingAliasKey(bankingAlias);
        var bankingAliasClass = this.getBankingAliasClass(bankingAlias);

        options = this._api._getOptions(callback, options, {
            data: bankingAlias,
            dataClass: bankingAliasClass,
            path: {
                walletId: bankingAlias.WalletId
            }
        });

        return this._api.method('banking_aliases_' + bankingAliasKey + '_create', callback, options);
    },

    /**
     * Get a banking alias
     * @param {number}      bankingAliasId  Banking Alias Id
     * @param {Function}    callback        Callback function
     * @param {Object}      options         Request options
     * @return {Object}                     Request promise
     */
    get: function(bankingAliasId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: bankingAliasId
            },
            dataClass: BankingAlias
        });

        return this._api.method('banking_aliases_get', callback, options);
    },

    /**
     * Get all banking aliases
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getAll: function(callback, options) {
        return this._api.method('banking_aliases_all', callback, options);
    },

    /**
     * Update banking alias
     * @param {number}      bankingAliasId  Banking Alias Id
     * @param {Function}    callback        Callback function
     * @param {Object}      options         Request options
     * @return {Object}                     Request promise
     */
    update: function(bankingAlias, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: bankingAlias.Id
            },
            data: bankingAlias,
            dataClass: BankingAlias
        });

        return this._api.method('banking_aliases_update', callback, options);
    },

    /**
     * Deactivate banking alias
     * @param {number}      bankingAliasId  Banking Alias Id
     * @param {Function}    callback        Callback function
     * @param {Object}      options         Request options
     * @return {Object}                     Request promise
     */
    deactivate: function(bankingAliasId, callback, options) {
        var bankingAlias = new BankingAlias({
            Id: bankingAliasId,
            Active: false
        });

        return this.update(bankingAlias, callback, options);
    },

    /**
     * Activate banking alias
     * @param {number}      bankingAliasId  Banking Alias Id
     * @param {Function}    callback        Callback function
     * @param {Object}      options         Request options
     * @return {Object}                     Request promise
     */
    activate: function(bankingAliasId, callback, options) {
        var bankingAlias = new BankingAlias({
            Id: bankingAliasId,
            Active: true
        });

        return this.update(bankingAlias, callback, options);
    },

    getBankingAliasKey: function(bankingAlias) {
        if (bankingAlias.Type) {
            return bankingAlias.Type.toLowerCase();
        }
        if (bankingAlias instanceof BankingAliasIBAN) return 'iban';

        throw new Error('BankingAlias needs to have a Type');
    },

    getBankingAliasClass: function(bankingAlias) {
        if (bankingAlias.Type) {
            if (bankingAlias.Type === 'IBAN') return BankingAliasIBAN;
        }
        if (bankingAlias instanceof BankingAliasIBAN) return BankingAliasIBAN;
        throw new Error('BankingAlias needs to have a Type');
    }
});

module.exports = BankingAliases;
