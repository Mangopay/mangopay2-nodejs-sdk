var Model = require('../Model');

module.exports = Model.extend({
    defaults: {
        CheckId: null,
        Type: null,
        CheckStatus: null,
        CreationDate: null,
        LastUpdate: null,
        Data: null,
        Reasons: null
    }
});