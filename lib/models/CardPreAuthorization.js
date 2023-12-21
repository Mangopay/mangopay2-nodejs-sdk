var _ = require('underscore');
var Model = require('../Model');
var Money = require('./Money');
var Billing = require('./Billing');
var SecurityInfo = require('./SecurityInfo');
var Shipping = require('./Shipping');
var BrowserInfo = require('./BrowserInfo');

var CardPreAuthorization = Model.extend({
    defaults: {
        AuthorId: null,

        /**
         * It represents the amount debited on the bank account
         * of the Author.DebitedFunds = Fees + CreditedFunds
         * (amount received on wallet)
         */
        DebitedFunds: null,

        /**
         * Status of the PreAuthorization: CREATED, SUCCEEDED, FAILED
         */
        Status: null,

        /**
         * The status of the payment after the PreAuthorization:
         * WAITING, CANCELED, EXPIRED, VALIDATED
         */
        PaymentStatus: null,

        ResultCode: null,
        ResultMessage: null,

        /**
         * How the PreAuthorization has been executed.
         * Only on value for now: CARD
         */
        ExecutionType: null,

        /**
         * An optional value to be specified on the user's bank statement
         */
        StatementDescriptor: null,

        /**
         * The SecureMode correspond to '3D secure' for CB Visa and MasterCard
         * or 'Amex Safe Key' for American Express.
         * This field lets you activate it manually.
         */
        SecureMode: null,

        /**
         * The ID of the registered card (Got through CardRegistration object)
         */
        CardId: null,

        /**
         * Boolean. The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: null,

        /**
         * This is the URL where to redirect users to proceed
         * to 3D secure validation
         */
        SecureModeRedirectURL: null,

        /**
         * This is the URL where users are automatically redirected
         * after 3D secure validation (if activated)
         */
        SecureModeReturnURL: null,
        /**
         * The date when the payment is processed
         */
        ExpirationDate: null,
        /**
         * The date when the payment was authorized
         */
        AuthorizationDate: null,
        /**
         * The type of pre-authorization ("CARD" is the only acceptable value at present
         */
        PaymentType: null,
        PayInId: null,
        Billing: null,
        SecurityInfo: null,
        RemainingFunds: null,

        /**
         * Boolean. The value is 'true' if the MultiCapture was used
         */
        MultiCapture: null,

        /**
         *  Is not Mandatory for 3DSv1 (flag �Use 3DSV2 Scenario� OFF)
         *  Is mandatory when the flag �Use 3DSV2 Scenario� is active for (FORCE/DEFAULT/FRICTIONLESS both 3)
         */
        IpAddress: null,

        /**
         * Shipping Address
         */
        Shipping: null,

        /*
         * BrowserInfo
         */
        BrowserInfo: null,

        /*
         * Requested3DSVersion
         */
        Requested3DSVersion: null,

        /*
         * Applied3DSVersion
         */
        Applied3DSVersion: null,
        /*
         * Information about the card
         */
        CardInfo: null
    },

    getSubObjects: function() {
      return {
            'DebitedFunds': Money,
            'Billing': Billing,
            'SecurityInfo': SecurityInfo,
            'RemainingFunds': Money,
            'Shipping': Shipping,
            'BrowserInfo': BrowserInfo
        }
    },

    getReadOnlyProperties: function() {
        var properties = Model.prototype.getReadOnlyProperties();
        properties.push('Status', 'ResultCode', 'ResultMessage');
        return properties;
    }
});

module.exports = CardPreAuthorization;
