var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsBancontact = PayInPaymentDetails.extend({
    defaults: {
        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null
    }
});

module.exports = PayInPaymentDetailsBancontact;
