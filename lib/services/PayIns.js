/**
 * @module PayIns
 * @desc [MangoPay PayIns API Reference](https://docs.mangopay.com/api-references/payins/payin-payment-methods/)
 */

var _ = require('underscore');

var Service = require('../service');

var PayIn = require('../models/PayOut');
var PayInPaymentDetailsBankWire = require('../models/PayInPaymentDetailsBankWire');
var PayInPaymentDetailsCard = require('../models/PayInPaymentDetailsCard');
var PayInPaymentDetailsDirectDebitDirect = require('../models/PayInPaymentDetailsDirectDebitDirect');
var PayInPaymentDetailsDirectDebitWeb = require('../models/PayInPaymentDetailsDirectDebitWeb');
var PayInPaymentDetailsPreAuthorized = require('../models/PayInPaymentDetailsPreAuthorized');
var PayInExecutionDetailsWeb = require('../models/PayInExecutionDetailsWeb');
var PayInExecutionDetailsDirect = require('../models/PayInExecutionDetailsDirect');
var Refund = require('../models/Refund');

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

    getPaymentKey: function(payIn) {
        if (payIn.PaymentType) {
            return payIn.PaymentType.toLowerCase().replace('_', '');
        }
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBankWire) return 'bankwire';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsCard) return 'card';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitDirect) return 'directdebit-direct';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitWeb) return 'directdebit-web';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPreAuthorized) return 'preauthorized';

        throw new Error('PayIn needs a PaymentType');
    },

    getExecutionKey: function(payIn) {
        if (payIn.ExecutionType) {
            return payIn.ExecutionType.toLowerCase();
        }

        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsWeb) return 'web';
        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsDirect) return 'direct';

        throw new Error('PayIn needs a ExecutionType');
    }
});

module.exports = PayIns;
