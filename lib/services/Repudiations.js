/**
 * @module Repudiations
 * @desc [MangoPay Repudiations API Reference](https://docs.mangopay.com/api-references/repudiations/)
 */

var Service = require('../service');

var Refund = require('../models/Refund');

var Repudiations = Service.extend({

    /**
     * Gets list of Refunds of a Repudiation
     * @param {number}      repudiationId       Repudiation identifier
     * @param {function}    callback            Callback function
     * @param {Object}      options             Request options
     * @return {Object}                         Request promise
     */
    getRefunds: function(repudiationId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: repudiationId
            },
            dataClass: Refund
        });

        return this._api.method("refunds_get_for_repudiation", callback, options);
    }
});

module.exports = Repudiations;