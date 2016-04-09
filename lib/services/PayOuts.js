var _ = require('underscore');

var Service = require('../service');

var PayOut = require('../models/PayOut');
var PayOutPaymentDetailsBankWire = require('../models/PayOutPaymentDetailsBankWire');

var PayOuts = Service.extend({
    /**
     * Create new pay-out
     * @param {Object}  payOut    PayOut object
     * @param callback
     * @param options
     * @returns {Object}         Request promise
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
     * Get pay-in
     * @param {number}  payInId    PayIn object
     * @param callback
     * @param options
     * @returns {Object}         Request promise
     */
    get: function(payInId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: payInId
            },
            dataClass: PayIn
        });

        return this._api.method('payins_get', callback, options);
    },

    getPaymentKey: function(payOut) {
        if (!payOut.MeanOfPaymentDetails && !payout.PaymentType) {
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