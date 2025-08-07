var _ = require('underscore');
var Service = require('../service');
var ConversionRate = require('../models/ConversionRate');
var Conversion = require('../models/Conversion');
var Quote = require('../models/Quote');

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
     * This call triggers a conversion at the rate defined in its quote.
     * The debited funds (buy currency), credited funds (sell currency) and currencies are defined in the quote.
     * The Client Wallets to debit and credit are defined in the conversion.
     * @param conversion Body object
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    createClientWalletsQuotedConversion: function (conversion, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: conversion,
            dataClass: Conversion
        });

        return this._api.method('create_client_wallets_quoted_conversion', callback, options);
    },

    /**
     * This call triggers an immediate conversion at the market rate, of the debited funds to the credited wallet at the market rate.
     * A quote is not required for an instant conversion.
     * @param conversion Body object
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    createClientWalletsInstantConversion: function (conversion, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: conversion,
            dataClass: Conversion
        });

        return this._api.method('create_client_wallets_instant_conversion', callback, options);
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
    },

    /**
     * This call guarantees a conversion rate to let you Create a Quoted Conversion
     * @param quote Body object
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    createQuote: function (quote, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: quote,
            dataClass: Quote
        });

        return this._api.method('create_quote', callback, options);
    },

    /**
     * View a Quote
     * @param id Id of the conversion
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    getQuote: function (id, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: id
            },
            dataClass: Quote
        });

        return this._api.method('get_quote', callback, options);
    },
});

module.exports = Conversions;