var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsPreAuthorized = PayInPaymentDetails.extend({
    defaults: {
        PreauthorizationId: null
    }
});

module.exports = PayInPaymentDetailsPreAuthorized;