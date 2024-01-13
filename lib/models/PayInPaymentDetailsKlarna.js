var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsKlarna = PayInPaymentDetails.extend({
    defaults: {
        LineItems: null,

        Shipping: null,

        Billing: null,

        PaymentMethod: null,

        Country: null,

        AdditionalData: null,

        Email: null,

        Reference: null,

        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null,

        /**
         * The mobile phone number of the user initiating the pay-in
         * Country code followed by hash symbol (#) followed by the rest of the number. Only digits and hash allowed
         */
        Phone: null
    }
});

module.exports = PayInPaymentDetailsKlarna;
