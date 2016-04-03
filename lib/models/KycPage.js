var EntityBase = require('./EntityBase');

var KycPage = EntityBase.extend({
    defaults: {
        /**
         * Image base64
         */
        File: null
    }
});

module.exports = KycPage;