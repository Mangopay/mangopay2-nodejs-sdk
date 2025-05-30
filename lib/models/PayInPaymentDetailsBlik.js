var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsBlik = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null,
        Code: null,
        IpAddress: null,
        BrowserInfo: null
    }
});

module.exports = PayInPaymentDetailsBlik;
