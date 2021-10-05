var Document = require('./Document');

var KycDocument = Document.extend({
    defaults: {
        UserId: null,
        Flags: null
    }
});

module.exports = KycDocument;
