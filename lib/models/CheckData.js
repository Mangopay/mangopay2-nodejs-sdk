var Address = require('./Address');
var Model = require('../Model');

module.exports = Model.extend({
    defaults: {
        Type: null,
        Value: null
    }
});