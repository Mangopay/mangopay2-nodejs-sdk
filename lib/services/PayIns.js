/**
 * @module PayIns
 * @desc [MangoPay PayIns API Reference](https://docs.mangopay.com/endpoints/v2.01/payins)
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
var PayInPaymentDetailsMbway = require('../models/PayInPaymentDetailsMbway');
var PayInPaymentDetailsBancontact = require('../models/PayInPaymentDetailsBancontact');
var Refund = require('../models/Refund');
var PayInRecurringRegistration = require('../models/PayInRecurringRegistration');
var PayInPaymentDetailsPayconiq = require('../models/PayInPaymentDetailsPayconiq');
const RecurringPayIn = require('../models/RecurringPayIn');
const PayInPaymentDetailsMultibanco = require("../models/PayInPaymentDetailsMultibanco");
const PayInPaymentDetailsSatispay = require("../models/PayInPaymentDetailsSatispay");
const PayInPaymentDetailsBlik = require("../models/PayInPaymentDetailsBlik");
const PayInPaymentDetailsKlarna = require("../models/PayInPaymentDetailsKlarna");
const PayInPaymentDetailsIdeal = require("../models/PayInPaymentDetailsIdeal");
const PayInPaymentDetailsGiropay = require("../models/PayInPaymentDetailsGiropay");
const PaymentMethodMetadata = require('../models/PaymentMethodMetadata');
const PayInPaymentDetailsSwish = require("../models/PayInPaymentDetailsSwish");
const PayInPaymentDetailsTwint = require("../models/PayInPaymentDetailsTwint");
const PayInPaymentDetailsPayByBank = require("../models/PayInPaymentDetailsPayByBank");
const PayInIntent = require('../models/PayInIntent');
const PayInIntentSplits = require('../models/PayInIntentSplits');


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
     * Get recurring pay-in
     * @param {number}  payInId    PayIn identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
     getRecurringPayin: function(payInId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: payInId
            },
            dataClass: PayInRecurringRegistration
        });

        return this._api.method('payins_recurring_registration_get', callback, options);
    },

     /**
     * Update recurring pay-in
     * @param {number}  payInId    PayIn identifier
     * @param {RecurringPayInPut} toUpdate   Updater Object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    updateRecurringPayin: function(payInId, toUpdate, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: payInId
            },
            data: toUpdate,
            dataClass: PayInRecurringRegistration
        });

        return this._api.method('payins_recurring_registration_put', callback, options);
    },

    /**
     * Create Payin Registration
     * @param {Object}  payIn    PayInRecurringRegistration object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createRecurringPayment: function(recurringPayin, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: recurringPayin,
            dataClass: PayInRecurringRegistration
        });

        return this._api.method('payins_recurring_registration', callback, options);
    },

    /**
     * Create new recurring pay-in CIT
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createRecurringPayInRegistrationCIT: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: RecurringPayIn
        });

        return this._api.method('payins_create_recurring_card_direct', callback, options);
    },

    /**
     * Create new recurring pay-in MIT
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createRecurringPayInRegistrationMIT: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: RecurringPayIn
        });

        return this._api.method('payins_create_recurring_card_direct', callback, options);
    },

    /**
     * Create new recurring PayPal pay-in CIT
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createRecurringPayPalPayInCIT: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: RecurringPayIn
        });

        return this._api.method('payins_create_recurring_paypal', callback, options);
    },

    /**
     * Create new recurring PayPal pay-in MIT
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createRecurringPayPalPayInMIT: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: RecurringPayIn
        });

        return this._api.method('payins_create_recurring_paypal', callback, options);
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

    /**
     * Create new Card PreAuthorized Deposit PayIn without complement
     */
    createCardPreAuthorizedDepositPayIn: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: PayIn
        });

        return this._api.method('payins_create_card_pre_authorized_deposit', callback, options);
    },

    /**
     * Create new Card PreAuthorized Deposit PayIn prior to complement
     */
    createDepositPreauthorizedPayInPriorToComplement: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn
        });

        return this._api.method('payins_deposit_preauthorized_prior_to_complement', callback, options);
    },

    /**
     * Create new Card PreAuthorized Deposit PayIn complement
     */
    createDepositPreauthorizedPayInComplement: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn
        });

        return this._api.method('payins_deposit_preauthorized_complement', callback, options);
    },

    /**
     * Create new PayPal Web pay-in.
     * To be used instead of the 'create' method for PayPal PayIns
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createPayPal: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: PayIn
        });

        return this._api.method('payins_paypal-web_create_v2', callback, options);
    },

    /**
     * Create new GooglePay Direct pay-in.
     * To be used instead of the 'create' method for GooglePay PayIns
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createGooglePay: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: PayIn
        });

        return this._api.method('payins_googlepay-direct_create_v2', callback, options);
    },

    /**
     *
     * @param metadata POST body which should contain the 'Type' and: 'Bin' (if the type is BIN) or 'Token' (if the type is GOOGLE_PAY)
     * @param callback Callback function
     * @param options Request options
     * @returns PaymentMethodMetadata
     */
    getPaymentMethodMetadata: function(metadata, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: metadata,
            dataClass: PaymentMethodMetadata
        });

        return this._api.method('payment_method_metadata_get', callback, options);
    },

    /**
     * Add tracking information to a PayPal PayIn (add the tracking number and carrier for LineItems shipments.)
     *
     * Caution – Tracking information cannot be edited
     *
     * You can’t modify the TrackingNumber, Carrier, or NotifyBuyer once added.
     *
     * You can only send a unique tracking number once.
     *
     * @param {string} payInId The ID of the PayIn
     * @param {Object}  trackingInformation    trackingInformation object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    addPayPalTrackingInformation: function(payInId, trackingInformation, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                payInId: payInId
            },
            data: trackingInformation,
            dataClass: PayIn
        });

        return this._api.method('add_tracking_info', callback, options);
    },

    getCardWebPayInExtendedDetails: function(payInId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: payInId
            }
        });

        return this._api.method('payins_card-web_get_details', callback, options);
    },

    /**
     * Create new pay-in Payconiq Web, using the latest API url (/payment-methods/payconiq)
     * @param {Object}  payIn    PayIn object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createPayconiq: function(payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: PayIn
        });

        return this._api.method('payins_payconiqv2-web_create', callback, options);
    },

    /**
     * Create a pay in intent authorization
     * @param {Object}  payInIntentAuthorization    PayInIntentAuthorization object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createPayInIntentAuthorization: function(payInIntentAuthorization, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payInIntentAuthorization,
            dataClass: PayInIntent
        });

        return this._api.method('payins_intent_authorization_create', callback, options);
    },

    /**
     * Create a pay in intent full capture
     * @param {Object}  payInIntentId    PayInIntent identifier (string)
     * @param {Object}  payInIntentFullCapture    PayInIntentFullCapture object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createPayInIntentFullCapture: function(payInIntentId, payInIntentFullCapture, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payInIntentFullCapture,
            dataClass: PayInIntent,
            path: {
                intentId: payInIntentId
            }
        });

        return this._api.method('payins_intent_capture_create', callback, options);
    },

    /**
     * Create a pay in intent partial capture
     * @param {Object}  payInIntentId    PayInIntent identifier (string)
     * @param {Object}  payInIntentPartialCapture    PayInIntentPartialCapture object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createPayInIntentPartialCapture: function(payInIntentId, payInIntentPartialCapture, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payInIntentPartialCapture,
            dataClass: PayInIntent,
            path: {
                intentId: payInIntentId
            }
        });

        return this._api.method('payins_intent_capture_create', callback, options);
    },

    /**
     * Get a PayInIntent
     * @param {Object}  payInIntentId    PayInIntent identifier (string)
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    getPayInIntent: function(payInIntentId, callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: PayInIntent,
            path: {
                intentId: payInIntentId
            }
        });

        return this._api.method('payins_intent_get', callback, options);
    },

    // /**
    //  * Cancel a PayInIntent
    //  * @param {Object}  payInIntentId    PayInIntent identifier (string)
    //  * @param intentDetails Details about the intent to be canceled
    //  * @param {Function} callback    Callback function
    //  * @param {Object} options    Request options
    //  * @return {Object}         Request promise
    //  */
    // fullCancelPayInIntent: function(payInIntentId, intentDetails, callback, options) {
    //     options = this._api._getOptions(callback, options, {
    //         dataClass: PayInIntent,
    //         path: {
    //             intentId: payInIntentId
    //         },
    //         data: intentDetails
    //     });
    //
    //     return this._api.method('payins_intent_cancel', callback, options);
    // },
    //
    // /**
    //  * Cancel a PayInIntent
    //  * @param {Object}  payInIntentId    PayInIntent identifier (string)
    //  * @param intentDetails Details about the intent to be canceled
    //  * @param {Function} callback    Callback function
    //  * @param {Object} options    Request options
    //  * @return {Object}         Request promise
    //  */
    // partialCancelPayInIntent: function(payInIntentId, intentDetails, callback, options) {
    //     options = this._api._getOptions(callback, options, {
    //         dataClass: PayInIntent,
    //         path: {
    //             intentId: payInIntentId
    //         },
    //         data: intentDetails
    //     });
    //
    //     return this._api.method('payins_intent_cancel', callback, options);
    // },

    /**
     * Create PayInIntent splits
     * @param {Object}  payInIntentId    PayInIntent identifier (string)
     * @param splits Splits to be created
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    createPayInIntentSplits: function(payInIntentId, splits, callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: PayInIntentSplits,
            path: {
                intentId: payInIntentId
            },
            data: splits
        });

        return this._api.method('payins_intent_create_splits', callback, options);
    },

    getPaymentKey: function(payIn) {
        if (payIn.PaymentType) {
            return payIn.PaymentType.toLowerCase().replaceAll('_', '');
        }
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBankWire) return 'bankwire';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsCard) return 'card';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitDirect) return 'directdebit';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitWeb) return 'directdebit';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPreAuthorized) return 'preauthorized';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPayPal) return 'paypal';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsApplePay) return 'applepay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsGooglePay) return 'googlepay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPayconiq) return 'payconiq';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsMbway) return 'mbway';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBancontact) return 'bcmc';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsMultibanco) return 'multibanco';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsSatispay) return 'satispay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBlik) return 'blik';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsKlarna) return 'klarna';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsIdeal) return 'ideal';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsGiropay) return 'giropay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsSwish) return 'swish';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsTwint) return 'twint';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPayByBank) return 'paybybank';

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
