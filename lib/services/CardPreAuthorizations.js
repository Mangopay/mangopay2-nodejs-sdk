/**
 * @module CardPreAuthorizations
 * @desc [MangoPay Card Pre-Authorizations API Reference](https://docs.mangopay.com/endpoints/v2.01/preauthorizations)
 */
var _ = require('underscore');
var Service = require('../service');
var CardPreAuthorization = require('../models/CardPreAuthorization');
var Transaction = require('../models/Transaction');

var CardPreAuthorizations = Service.extend({
    /**
     * Create new pre-authorization
     * @param {Object}  cardPreAuthorization    CardPreAuthorization object or properties hash
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                         Promise of the request
     */
    create: function(cardPreAuthorization, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: cardPreAuthorization,
            dataClass: CardPreAuthorization
        });

        return this._api.method('preauthorization_create', callback, options);
    },

    /**
     * Get pre-authorization object
     * @param {number}  cardPreAuthorizationId  PreAuthorization identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                        Request promise
     */
    get: function(cardPreAuthorizationId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: cardPreAuthorizationId
            },
            dataClass: CardPreAuthorization
        });

        return this._api.method('preauthorization_get', callback, options);
    },

    /**
     * Update pre-authorization object
     * @param {Object}      cardPreAuthorization        CardPreAuthorization object of properties hash
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                                 Request promise
     */
    update: function(cardPreAuthorization, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: cardPreAuthorization,
            path: {
                id: cardPreAuthorization.Id
            },
            dataClass: CardPreAuthorization
        });

        return this._api.method('preauthorization_save', callback, options);
    },

    getTransactions: function(cardPreAuthorizationId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: cardPreAuthorizationId
            }
        });

        return this._api.method('preauthorization_transactions_get', callback, options);
    },
});

module.exports = CardPreAuthorizations;
