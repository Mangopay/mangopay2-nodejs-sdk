var Model = require('./../Model');

var Birthplace = Model.extend({
    defaults: {
        City: String,
        Country: String
    }
});

module.exports = Birthplace;