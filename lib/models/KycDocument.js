var Document = require('./Document');

var KycDocument = Document.extend({
    defaults: {
        UserId: null
    }
});

module.exports = KycDocument;