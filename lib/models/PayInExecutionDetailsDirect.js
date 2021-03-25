var _ = require('underscore');
var PayInExecutionDetails = require('./PayInExecutionDetails');
var Billing = require('./Billing');
var SecurityInfo = require('./SecurityInfo');

var PayInExecutionDetailsDirect = PayInExecutionDetails.extend({
    defaults: {
        /**
         *  SecureMode { DEFAULT, FORCE, NO_CHOICE }
         */
        SecureMode: null,
        SecureModeReturnURL: null,
        SecureModeRedirectURL: null,
        SecureModeNeeded: null,
        Billing: null,
        SecurityInfo: null,
        Requested3DSVersion: null,
        Applied3DSVersion: null
    },

    getSubObjects: function() {
        return {
            'Billing': Billing,
            'SecurityInfo': SecurityInfo
        }
  }
});

module.exports = PayInExecutionDetailsDirect;