var PayInPaymentDetails = require('./PayInPaymentDetails');
var Money = require('./Money');

var PayInPaymentDetailsPayconiq = PayInPaymentDetails.extend({
    defaults: {
        Country: null,
        AuthorId: null,
        DebitedFunds: null,
        Fees: null,
        DeepLinkURL: null,
        StatementDescriptor: null,
        QRCodeURL: null
    },

    getSubObjects: function() {
        return {
            'DebitedFunds': Money,
            'Fees': Money
        };
    },
});

module.exports = PayInPaymentDetailsPayconiq;
