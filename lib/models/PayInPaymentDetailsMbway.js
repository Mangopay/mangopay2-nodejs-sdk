var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsMbway = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null,

        /**
         * The mobile phone number of the user initiating the pay-in
         * Country code followed by hash symbol (#) followed by the rest of the number. Only digits and hash allowed
         */
        PhoneNumber: null
    }
});

module.exports = PayInPaymentDetailsMbway;
