/**
 * @module Hooks
 * @desc [MangoPay Hooks API Reference](https://docs.mangopay.com/api-reference/hooks-overview/)
 */

var _ = require('underscore');
var Service = require('../service');
var Hook = require('../models/Hook');

var Hooks = Service.extend({
    /**
     * Create new hook
     * @param {Object}  hook    Hook object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */
    create: function(hook, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: hook,
            dataClass: Hook
        });

        return this._api.method('hooks_create', callback, options);
    },

    /**
     * Get hook
     * @param {number}  hookId  Hook identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */
    get: function(hookId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: hookId
            },
            dataClass: Hook
        });

        return this._api.method('hooks_get', callback, options);
    },

    /**
     * Save hook
     * @param {Object}  hook    Hook object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */
    update: function(hook, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: hook.Id
            },
            data: hook,
            dataClass: Hook
        });

        return this._api.method('hooks_save', callback, options);
    },

    /**
     * Get all hooks
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}            Request promise
     */
    getAll: function(callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            dataClass: Hook
        });

        return this._api.method('hooks_all', callback, options);
    }
});

module.exports = Hooks;