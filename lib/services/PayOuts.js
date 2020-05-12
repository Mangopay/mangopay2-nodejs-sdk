/**
 * @module PayOuts
 * @desc [MangoPay PayOuts API Reference](https://docs.mangopay.com/api-references/pay-out-bank-wire/)
 */

var Service = require('../service');

var PayOut = require('../models/PayOut');
var PayOutPaymentDetailsBankWire = require('../models/PayOutPaymentDetailsBankWire');
var Refund = require('../models/Refund');

var PayOuts = Service.extend({
    /**
     * Create new pay-out
     * @param {Object}  payOut    PayOut object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    create: function(payOut, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payOut,
            dataClass: PayOut
        });

        var paymentKey = this.getPaymentKey(payOut);

        return this._api.method('payouts_' + paymentKey + '_create', callback, options);
    },

    /**
     * Get payout
     * @param {number}  payOutId    PayOut identifiers
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    get: function(payOutId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: payOutId
            },
            dataClass: PayOut
        });

        return this._api.method('payouts_get', callback, options);
    },

    /**
     * Gets list of Refunds of a PayOut
     * @param {number}      payOutId    PayOut identifier
     * @param {function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getRefunds: function(payOutId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: payOutId
            },
            dataClass: Refund
        });

        return this._api.method("refunds_get_for_payout", callback, options);
    },

    getPaymentKey: function(payOut) {
        if (!payOut.MeanOfPaymentDetails && !payOut.PaymentType) {
            this._api.errorHandler('Create Payout needs MeanOfPaymentDetails or PaymentType');
        }

        // Payment Type can be BANK_WIRE, etc.
        if (payOut.PaymentType) {
            return payOut.PaymentType.toLowerCase().replace('_', '');
        }

        if (payOut.MeanOfPaymentDetails instanceof PayOutPaymentDetailsBankWire) return 'bankwire';
    }
});

module.exports = PayOuts;