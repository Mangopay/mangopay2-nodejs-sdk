var EntityBase = require('./EntityBase');
var Address = require('./Address');
var Birthplace = require('./Birthplace');

/**
 * UBO entity
 */
var Ubo = EntityBase.extend({
    defaults: {
        FirstName: String,
        LastName: String,
        Address: Address,
        Nationality: String,
        Birthday: null,
        Birthplace: Birthplace
    }
});

module.exports = Ubo;