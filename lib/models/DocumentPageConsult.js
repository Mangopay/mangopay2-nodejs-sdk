var Model = require('../Model');

var DocumentPageConsult = Model.extend({
    defaults: {
        /**
         * URL where this document page can be viewed.
         */
        Url: null,

        /**
         * Time in millis when the page consult will expire.
         */
        ExpirationDate: null
    }
});

module.exports = DocumentPageConsult;