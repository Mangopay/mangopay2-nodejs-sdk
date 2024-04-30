var EntityBase = require('./EntityBase');

var PaymentMethodMetadata = EntityBase.extend({
    defaults: {
        /**
         * The type of metadata. Allowed values: BIN, GOOGLE_PAY
         */
        Type: null,
        /**
         * The bank identification number (BIN). (Format: 6 or 8 digits)
         */
        Bin: null,
        /**
         * The tokenized payment data provided by the third-party payment method.
         */
        Token: null,
        /**
         * In the case of Google Pay, the format of the Token.
         * PAN_ONLY – The card is registered in the Google account and requires 3DS authentication.
         * CRYPTOGRAM_3DS – The card is enrolled in the customer’s Google Wallet and authentication is handled by the Android device.
         */
        TokenFormat: null,
        /**
         * The country where the card was issued. Format: ISO-3166 alpha-2 two-letter country code
         */
        IssuerCountryCode: null,
        /**
         * The name of the card issuer.
         */
        IssuingBank: null,
        /**
         * Additional data about the card based on the BIN. In the case of co-branded card products, two objects are returned.
         */
        BinData: null
    }
});

module.exports = PaymentMethodMetadata;
