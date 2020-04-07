/**
 * @module Mandates
 * @desc [MangoPay Mandates API Reference](https://docs.mangopay.com/endpoints/v2.01/mandates)
 */
var _ = require('underscore');
var Service = require('../service');

var Mandate = require('../models/Mandate');
var Transaction = require('../models/Transaction');

var Mandates = Service.extend({
    /**
     * Create a new Mandate
     * @param {Object}      mandate     Mandate object
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Promise of the request
     */
    create: function(mandate, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: mandate,
            dataClass: Mandate
        });

        var mandateKey = this.getMandateKey(mandate);
        var executionKey = this.getExecutionKey(mandate);

        return this._api.method('mandates_' + mandateKey + '-' + executionKey + '_create', callback, options);
    },

    /**
     * Get all mandates
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getAll: function(callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            dataClass: Mandate
        });

        return this._api.method('mandates_all', callback, options);
    },

    /**
     * Get mandate by ID
     * @param {number}      mandateId   Mandate identifier
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    get: function(mandateId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: mandateId
            },
            dataClass: Mandate
        });

        return this._api.method('mandates_get', callback, options);
    },

    /**
     * Cancel a mandate
     * @param {number}      mandateId   Mandate identifier
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    cancel: function(mandateId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: mandateId
            }
        });

        return this._api.method('mandates_cancel', callback, options);
    },

    /**
     * Gets user's mandates
     * @param {number}      userId      User identifier
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getMandatesForUser: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: userId
            },
            dataClass: Mandate
        });

        return this._api.method('mandates_get_for_user', callback, options);
    },

    /**
     * Gets bank account mandates
     * @param {number}      userId          User identifier
     * @param {number}      bankAccountId   Bank Account identifier
     * @param {Function}    callback        Callback function
     * @param {Object}      options         Request options
     * @return {Object}                     Request promise
     */
    getMandatesForBankAccount: function(userId, bankAccountId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: userId,
                bankAccountId: bankAccountId
            },
            dataClass: Mandate
        });

        return this._api.method('mandates_get_for_bank_account', callback, options);
    },

    /**
     * Gets Transactions for a Mandate
     * @param {number}      mandateId   Mandate identifier
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getTransactions: function(mandateId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: mandateId
            },
            dataClass: Transaction
        });

        return this._api.method('transactions_get_for_mandate', callback, options);
    },

    getMandateKey: function(mandate) {
        if (mandate.MandateType) {
            return mandate.MandateType.toLowerCase().replace('_', '');
        }

        throw new Error('Mandate needs a MandateType');
    },

    getExecutionKey: function(mandate) {
        if (mandate.ExecutionType) {
            return mandate.ExecutionType.toLowerCase();
        }

        throw new Error('Mandate needs a ExecutionType');
    }
});

module.exports = Mandates;