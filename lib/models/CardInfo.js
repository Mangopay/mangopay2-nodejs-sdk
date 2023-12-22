var EntityBase = require('./EntityBase');

var CardInfo = EntityBase.extend({
    defaults: {
        /**
         * The 6-digit bank identification number (BIN) of the card issuer.
         */
        BIN: null,
        /**
         * The name of the card issuer.
         */
        IssuingBank: null,
        /**
         * TThe country where the card was issued.
         */
        IssuerCountryCode: null,
        /**
         * The type of card product: DEBIT, CREDIT, CHARGE CARD.
         */
        Type: null,
        /**
         * The card brand. Examples include: AMERICAN EXPRESS, DISCOVER, JCB, MASTERCARD, VISA, etc.
         */
        Brand: null,
        /**
         * The subtype of the card product. Examples include: CLASSIC, GOLD, PLATINUM, PREPAID, etc.
         */
        SubType: null
    }
});

module.exports = CardInfo;