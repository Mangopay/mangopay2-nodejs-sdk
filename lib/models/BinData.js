var EntityBase = require('./EntityBase');

var BinData = EntityBase.extend({
    defaults: {
        /**
         * The subtype of the card product. Examples include: CLASSIC, GOLD, PLATINUM, PREPAID, etc.
         */
        Subtype: null,
        /**
         * The card brand. Examples include: AMERICAN EXPRESS, DISCOVER, JCB, MASTERCARD, VISA, etc.
         */
        Brand: null
    }
});

module.exports = BinData;
