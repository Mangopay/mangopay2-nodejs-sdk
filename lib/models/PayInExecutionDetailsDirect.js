var _ = require('underscore');
var PayInExecutionDetails = require('./PayInExecutionDetails');

var PayInExecutionDetailsDirect = PayInExecutionDetails.extend({
    defaults: {
        /**
         *  SecureMode { DEFAULT, FORCE }
         */
        SecureMode: null,
        SecureModeReturnURL: null,
        SecureModeRedirectURL: null,
        SecureModeNeeded: null
    }
});

module.exports = PayInExecutionDetailsDirect;