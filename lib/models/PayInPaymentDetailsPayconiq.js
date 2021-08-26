var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsPayconiq = PayInPaymentDetails.extend({
    defaults: {
        Country: null
    }
});

module.exports = PayInPaymentDetailsPayconiq;
