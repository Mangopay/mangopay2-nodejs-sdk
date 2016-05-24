/**
 * @module Cards
 * @desc [MangoPay Cards API Reference](https://docs.mangopay.com/api-references/card/)
 */

var _ = require('underscore');
var Service = require('../service');
var Card = require('../models/Card');

var Cards = Service.extend({
    /**
     * Get card
     * @param {number}  cardId  Card identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
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
     * @param {function}    callback    Callback function
     * @param {Object}      options     Request options
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
    }
});

module.exports = Cards;