var Model = require('../Model');

module.exports = Model.extend({
    defaults: {
        SessionId: null,
        Status: null,
        CreationDate: null,
        LastUpdate: null,
        Checks: null
    }
});