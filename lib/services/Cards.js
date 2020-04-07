/**
 * @module Cards
 * @desc [MangoPay Cards API Reference](https://docs.mangopay.com/api-references/card/)
 */

var _ = require('underscore');
var Service = require('../service');
var Card = require('../models/Card');
var Transaction = require('../models/Transaction');
var CardPreAuthorization = require('../models/CardPreAuthorization');

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
     * Gets a list of cards having the same fingerprint.
     * The fingerprint is a hash uniquely generated per 16-digit card number.
     *
     * @param fingerprint The fingerprint hash
     * @return List of Cards corresponding to provided fingerprint
     */
    getByFingerprint: function(fingerprint, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                fingerprint: fingerprint
            },
            dataClass: Card
        });
        return this._api.method('cards_get_by_fingerprint', callback, options);
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
    },

    /**
     * Get list of Transactions of a Card
     * @param {number}      cardId      Card identifier
     * @param {function}    callback    Callback function
     * @param {object}      options     Request options
     * @return {object}                 Request promise
     */
    getTransactions: function(cardId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                cardId: cardId
            },
            dataClass: Transaction
        });

        return this._api.method('transactions_get_for_card', callback, options);
      
    },
    
    /**
     * Gets list of PreAuthorizations of a Card.
     * @param {number}      cardId      Card identifier
     * @param {function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getPreAuthorizations: function(cardId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: cardId
            },
            dataClass: CardPreAuthorization
        });

        return this._api.method('card_get_preauthorizations', callback, options);
    }
});

module.exports = Cards;