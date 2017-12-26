var Document = require('./Document');

var DisputeDocument = Document.extend({
    defaults: {
        DisputeId: null,
        Type: null
    }
});

module.exports = DisputeDocument;