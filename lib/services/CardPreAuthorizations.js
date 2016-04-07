/**
 * WORK IN PROGRESS
 */
var _ = require('underscore');
var Service = require('../service');
var CardPreAuthorization = require('../models/CardPreAuthorization');

var CardPreAuthorizations = Service.extend({
    /**
     * Create new pre-authorization
     * @param {Object}  cardPreAuthorization    CardPreAuthorization object or properties hash
     * @param callback
     * @param options
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
     * @param callback
     * @param options
     * @returns {Object}                        Request promise
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
    }
});

module.exports = CardPreAuthorizations;