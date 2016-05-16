var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        /**
         * This is the URL where your receive notification for each EventType
         */
        Url: null,
        /**
         * Status: ENABLED, DISABLED
         */
        Status: null,
        /**
         * Validity: VALID, INVALID
         */
        Validity: null,
        EventType: null
    }
});