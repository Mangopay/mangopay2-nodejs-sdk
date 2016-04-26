/**
 * @module PayIns
 * @desc [MangoPay PayIns API Reference](https://docs.mangopay.com/api-references/payins/payin-payment-methods/)
 */

var _ = require('underscore');

var Service = require('../service');

var PayIn = require('../models/PayOut');
var PayInPaymentDetailsBankWire = require('../models/PayInPaymentDetailsBankWire');
var PayInPaymentDetailsCard = require('../models/PayInPaymentDetailsCard');
var PayInPaymentDetailsDirectDebit = require('../models/PayInPaymentDetailsDirectDebit');
var PayInPaymentDetailsPreAuthorized = require('../models/PayInPaymentDetailsPreAuthorized');
var PayInExecutionDetailsWeb = require('../models/PayInExecutionDetailsWeb');
var PayInExecutionDetailsDirect = require('../models/PayInExecutionDetailsDirect');
var TemporaryImmediatePayIn = require('../models/TemporaryImmediatePayIn');
var Refund = require('../models/TemporaryImmediatePayIn');

var PayIns = Service.extend({
    /**
     * Create new pay-in
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    create: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: PayIn
        });

        var paymentKey = this.getPaymentKey(payIn);
        var executionKey = this.getExecutionKey(payIn);

        return this._api.method('payins_' + paymentKey + '-' + executionKey + '_create', callback, options);
    },

    /**
     * Get pay-in
     * @param {number}  payInId    PayIn identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
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

    /**
     * Create refund for pay-in object
     * @param {number}  payInId     PayIn identifier
     * @param {Object}  refund      Refund data
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createRefund: function(payInId, refund, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: payInId
            },
            dataClass: Refund,
            data: refund
        });

        return this._api.method('payins_createrefunds', callback, options);
    },

    /**
     * Create new temporary immediate pay-in (WARNING It's temporary entity and it will be removed in the future. Please, contact with support before using these features or if you have any questions.)
     * @param {Object}  immediatePayIn      Immediate pay-in object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                    Request promise
     */
    createTemporaryImmediatePayIn: function(immediatePayIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: TemporaryImmediatePayIn,
            data: immediatePayIn
        });

        return this._api.method('temp_immediatepayins_create', callback, options);
    },

    getPaymentKey: function(payIn) {
        if (payIn.PaymentType) {
            return payIn.PaymentType.toLowerCase().replace('_', '');
        } else {
            throw new Error('PayIn needs to contain a PaymentType property');
        }

        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBankWire) return 'bankwire';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsCard) return 'card';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebit) return 'directdebit';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPreAuthorized) return 'preauthorized';
    },

    getExecutionKey: function(payIn) {
        if (payIn.ExecutionType) {
            return payIn.ExecutionType.toLowerCase();
        } else {
            throw new Error('PayIn needs to contain a ExecutionType property');
        }

        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsWeb) return 'web';
        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsDirect) return 'direct';
    }
});

module.exports = PayIns;