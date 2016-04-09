var EntityBase = require('./EntityBase');

var DisputeDocumentPage = EntityBase.extend({
    defaults: {
        /**
         * Image base64
         */
        File: null
    }
});

module.exports = DisputeDocumentPage;