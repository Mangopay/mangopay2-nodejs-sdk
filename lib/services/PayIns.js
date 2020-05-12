/**
 * @module PayIns
 * @desc [MangoPay PayIns API Reference](https://docs.mangopay.com/api-references/payins/payin-payment-methods/)
 */

var _ = require('underscore');

var Service = require('../service');

var PayIn = require('../models/PayIn');
var PayInPaymentDetailsBankWire = require('../models/PayInPaymentDetailsBankWire');
var PayInPaymentDetailsCard = require('../models/PayInPaymentDetailsCard');
var PayInPaymentDetailsDirectDebitDirect = require('../models/PayInPaymentDetailsDirectDebitDirect');
var PayInPaymentDetailsDirectDebitWeb = require('../models/PayInPaymentDetailsDirectDebitWeb');
var PayInPaymentDetailsPreAuthorized = require('../models/PayInPaymentDetailsPreAuthorized');
var PayInPaymentDetailsPayPal = require('../models/PayInPaymentDetailsPayPal');
var PayInExecutionDetailsWeb = require('../models/PayInExecutionDetailsWeb');
var PayInExecutionDetailsDirect = require('../models/PayInExecutionDetailsDirect');
var PayInExecutionDetailsBankingAlias = require('../models/PayInExecutionDetailsBankingAlias');
var PayInPaymentDetailsApplePay = require('../models/PayInPaymentDetailsApplePay');
var PayInPaymentDetailsGooglePay = require('../models/PayInPaymentDetailsGooglePay');
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

    /**
     * Gets list of Refunds for a PayIn
     * @param {number}      payInId     PayIn identifier
     * @param {function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getRefunds: function(payInId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: payInId
            },
            dataClass: Refund
        });

        return this._api.method('refunds_get_for_payin', callback, options);
    },

    getPaymentKey: function(payIn) {
        if (payIn.PaymentType) {
            return payIn.PaymentType.toLowerCase().replace('_', '');
        }
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBankWire) return 'bankwire';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsCard) return 'card';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitDirect) return 'directdebit';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitWeb) return 'directdebit';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPreAuthorized) return 'preauthorized';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPayPal) return 'paypal';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsApplePay) return 'applepay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsGooglePay) return 'googlepay';

        throw new Error('PayIn needs a PaymentType');
    },

    getExecutionKey: function(payIn) {
        if (payIn.ExecutionType) {
            return payIn.ExecutionType.toLowerCase();
        }

        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsWeb) return 'web';
        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsDirect) return 'direct';
        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsBankingAlias) return 'bankingalias';

        throw new Error('PayIn needs a ExecutionType');
    }
});

module.exports = PayIns;
