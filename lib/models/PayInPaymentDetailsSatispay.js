var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsSatispay = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null,

        /**
         * The end-user country of residence
         */
        Country: null
    }
});

module.exports = PayInPaymentDetailsSatispay;
