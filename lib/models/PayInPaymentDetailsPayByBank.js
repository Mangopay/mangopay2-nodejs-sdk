var _ = require('underscore');
var PayInPaymentDetails = require('./PayInPaymentDetails');

var PayInPaymentDetailsPayByBank = PayInPaymentDetails.extend({
    defaults: {

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor: null,

        /**
         * The end-user residency country
         */
        Country: null,

        /**
         * The BIC identifier of the end-user’s bank
         */
        BIC: null,

        /**
         * The IBAN identifier of the end-user’s bank
         */
        IBAN: null,

        /**
         * This is the platform environment in which the application is running.Accepted values are:
         *
         * - WEB: For web browser usage(default setting)
         *
         * - APP: For mobile application usage
         *
         * If PaymentFlow is set to APP,the user is redirected to the platform's app after payment
         */
        PaymentFlow: null,

        /**
         * Name of the end-user’s bank
         */
        BankName: null,

        /**
         * The language in which the Pay by Bank payment page isto be displayed - Alpha-2 format (default US)
         */
        Culture: null,

        /**
         * This is the payment scheme the end user selects for processing the transaction,which varies by market
         * (see details below). Default values are always instant schemes.
         *
         * Please note that some banks may charge additional fees for instant payment schemes
         *
         * Please note that the scheme is mandatory for the Danish market (”Country” : “DK”)
         */
        Scheme: null,

        /**
         * This is a temporary status indicating that the payment initiation was successful,
         * but the funds have not yet been received in Mangopay's bank account
         *
         * This parameter is only relevant once the transaction has been processed by the end user.
         * It is not returned when the payment is initiated or successfully completed
         *
         * Possible value: PENDING_SUCCEEDED
         */
        ProcessingStatus: null
    }
});

module.exports = PayInPaymentDetailsPayByBank;
