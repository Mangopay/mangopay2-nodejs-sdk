var Service = require('../service');
var Recipient = require('../models/Recipient');
var RecipientSchema = require('../models/RecipientSchema');
var PayoutMethods = require('../models/PayoutMethods');

var Recipients = Service.extend({
    /**
     * Create a Recipient
     */
    create: function(recipient, userId, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: recipient,
            dataClass: Recipient,
            path: {
                userId: userId
            }
        });

        return this._api.method('recipients_create', callback, options);
    },

    /**
     * Get a Recipient
     */
    get: function(recipientId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                recipientId: recipientId
            },
            dataClass: Recipient
        });

        return this._api.method('recipients_get', callback, options);
    },

    /**
     * Get all Recipients for a user
     */
    getUserRecipients: function(userId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                userId: userId
            }
        });

        return this._api.method('recipients_get_all', callback, options);
    },

    /**
     * Get a Recipient schema
     */
    getSchema: function(payoutMethodType, recipientType, currency, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                payoutMethodType: payoutMethodType,
                recipientType: recipientType,
                currency: currency
            },
            dataClass: RecipientSchema
        });

        return this._api.method('recipients_get_schema', callback, options);
    },

    /**
     * Get a Payment Methods
     */
    getPayoutMethods: function(country, currency, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                country: country,
                currency: currency
            },
            dataClass: PayoutMethods
        });

        return this._api.method('recipients_get_payout_methods', callback, options);
    },

    /**
     * Validates a Recipient
     */
    validate: function(recipient, userId, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: recipient,
            path: {
                userId: userId
            }
        });

        return this._api.method('recipients_validate', callback, options);
    },

    /**
     * Deactivates a Recipient
     */
    deactivate: function(recipientId, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: {},
            dataClass: Recipient,
            path: {
                recipientId: recipientId
            }
        });

        return this._api.method('recipients_deactivate', callback, options);
    }

});

module.exports = Recipients;
