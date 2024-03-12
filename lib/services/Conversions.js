var _ = require('underscore');
var Service = require('../service');
var ConversionRate = require('../models/ConversionRate');
var Conversion = require('../models/Conversion');

var Conversions = Service.extend({
    /**
     * This endpoint allows the platform to get a real time
     * indicative market rate of a specific currency pair.
     * The rate returned is given in real time.
     * @param debitedCurrency The sell currency – the currency of the wallet to be debited
     * @param creditedCurrency The buy currency – the currency of the wallet to be credited
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    getConversionRate: function (debitedCurrency, creditedCurrency, callback, options) {
        options = this._api._getOptions(callback, options,
            {
                path: {
                    debitedCurrency: debitedCurrency,
                    creditedCurrency: creditedCurrency
                },
                dataClass: ConversionRate
            });

        return this._api.method("get_conversion_rate", callback, options);
    },

    /**
     * This endpoint allows the platform to move funds
     * between two wallets of different currencies instantaneously.
     * @param instantConversion Body object
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    createInstantConversion: function (instantConversion, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: instantConversion,
            dataClass: Conversion
        });

        return this._api.method('create_instant_conversion', callback, options);
    },

    /**
     * This call triggers a conversion, at the rate guaranteed by its quote, of the debited funds to the credited wallet.
     * Each quoted conversion requires a dedicated Quote object, linked in the QuoteId.
     * Fees can’t be taken on a quoted conversion.
     * @param quotedConversion Body object
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    createQuotedConversion: function (quotedConversion, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: quotedConversion,
            dataClass: Conversion
        });

        return this._api.method('create_quoted_conversion', callback, options);
    },

    /**
     * This endpoint allows the platform to get the
     * details of a conversion which has been carried out.
     * @param id Id of the conversion
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    getConversion: function (id, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: id
            },
            dataClass: Conversion
        });

        return this._api.method('get_conversion', callback, options);
    }
});

module.exports = Conversions;