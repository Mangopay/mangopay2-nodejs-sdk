var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsSwish = PayInPaymentDetails.extend({
    defaults: {

        /**
         * Custom description to show on the user's bank statement.
         * It can be up to 10 char alpha-numeric and space.
         */
        StatementDescriptor: null,

        /**
         * The mobile URL to which to redirect the user to complete the payment in an app-to-app flow.
         */
        DeepLinkURL: null,

        /**
         * The PNG file of the Swish QR code as a Base64-encoded string.
         */
        QRCodeURL: null,

        /**
         *  <p>Allowed values: WEB, APP</p>
         *  <p>Default value: WEB</p>
         *  <p>The platform environment of the post-payment flow. The PaymentFlow value combines with the ReturnURL to manage the redirection behavior after payment:</p>
         *  <p>Set the value to APP to send the user to your platform’s mobile app</p>
         *  <p>Set the value to WEB to send the user to a web browser</p>
         *  <p>In both cases you need to provide the relevant ReturnURL, whether to your app or website.</p>
         */
        PaymentFlow: null
    }
});

module.exports = PayInPaymentDetailsSwish;
