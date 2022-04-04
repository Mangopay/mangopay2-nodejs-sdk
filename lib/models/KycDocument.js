var Document = require('./Document');

var KycDocument = Document.extend({
    defaults: {
        UserId: null,
        Flags: null,
        Tag: null
    }
});

module.exports = KycDocument;
