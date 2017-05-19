/**
 * @module CardRegistrations
 * @desc [MangoPay Card Registration API Reference](https://docs.mangopay.com/api-references/card-registration/)
 */
var _ = require('underscore');
var request = require('request');

var Service = require('../service');
var CardRegistration = require('../models/CardRegistration');

var CardRegistrations = Service.extend({
    /**
     * Create new card registration
     * @param {Object}  cardRegistration    CardRegistration object or properties hash
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                     Promise of the request
     */
    create: function(cardRegistration, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: cardRegistration,
            dataClass: CardRegistration
        });

        return this._api.method('cardregistration_create', callback, options);
    },

    /**
     * Get registration
     * @param {number}  cardRegistrationId  Registration identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                    Request promise
     */
    get: function(cardRegistrationId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: cardRegistrationId
            },
            dataClass: CardRegistration
        });

        return this._api.method('cardregistration_get', callback, options);
    },

    /**
     * Update card registration
     * @param {Object}      cardRegistration        CardPreAuthorization object of properties hash
     * @param {function}    callback                Callback function
     * @param {Object}      options                 Request options
     * @return {Object}                             Request promise
     */
    update: function(cardRegistration, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: cardRegistration,
            path: {
                id: cardRegistration.Id
            },
            dataClass: CardRegistration
        });

        return this._api.method('cardregistration_save', callback, options);
    },

    /**
     * Submit a card registration
     * @param {object}      cardRegistrationData        Card Registration URL
     * @param {object}      cardData                    cardNumber, cardExpirationDate, cardCvx
     * @param {function}    callback                    Callback function
     * @return {Object}                                 Request promise
     */
    registerCard: function(cardRegistrationData, cardData, callback) {
        var self = this;

        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        // Configure the request
        var options = {
            url: cardRegistrationData.CardRegistrationURL,
            headers: headers,
            form: {
                data: cardRegistrationData.PreregistrationData,
                accessKeyRef: cardRegistrationData.AccessKey,
                cardNumber: cardData.cardNumber,
                cardExpirationDate: cardData.cardExpirationDate,
                cardCvx: cardData.cardCvx
            }
        };

        return request.post(options, function(err, httpResponse, body){
            var updatedCardRegistrationData = _.extend({}, cardRegistrationData, {
                RegistrationData: body
            });
            return self.update(updatedCardRegistrationData, callback);
        });
    }
});

module.exports = CardRegistrations;