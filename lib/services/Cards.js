/**
 * @module Cards
 * @desc [MangoPay Cards API Reference](https://docs.mangopay.com/api-references/card/)
 */

var _ = require('underscore');
var Service = require('../service');
var Card = require('../models/Card');
var TemporaryPaymentCard = require('../models/TemporaryPaymentCard');

var Cards = Service.extend({
    /**
     * Get card
     * @param {number}  cardId  Card identifier
     * @param callback
     * @param options
     * @returns {Object}        Request promise
     */
    get: function(cardId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: cardId
            },
            dataClass: Card
        });

        return this._api.method('card_get', callback, options);
    },

    /**
     * Update card
     * @param {Object}      card        Card object of properties hash
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    update: function(card, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: card,
            path: {
                id: card.Id
            },
            dataClass: Card
        });

        return this._api.method('card_save', callback, options);
    },

    /**
     * Create new temporary payment card (WARNING It's temporary entity and it will be removed in the future. Please, contact with support before using these features or if you have any questions.)
     * @param {Object}  paymentCard    TemporaryPaymentCard object or properties hash
     * @param callback
     * @param options
     * @return {Object}                 Promise of the request
     */
    createTemporaryPaymentCard: function(paymentCard, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: paymentCard,
            dataClass: TemporaryPaymentCard
        });

        return this._api.method('temp_paymentcards_create', callback, options);
    },

    /**
     * Create new temporary payment card ( WARNING It's temporary entity and it will be removed in the future. Please, contact with support before using these features or if you have any questions.)
     * @param {number}  paymentCardId   TemporaryPaymentCard object or properties hash
     * @param callback
     * @param options
     * @return {Object}                 Promise of the request
     */
    getTemporaryPaymentCard: function(paymentCardId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: paymentCardId
            },
            dataClass: TemporaryPaymentCard
        });

        return this._api.method('temp_paymentcards_get', callback, options);
    }
});

module.exports = Cards;