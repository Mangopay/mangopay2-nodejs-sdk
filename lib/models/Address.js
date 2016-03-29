/**
 * WORK IN PROGRESS
 */
var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        AddressLine1: null,
        AddressLine2: null,
        City: null,
        Region: null,
        PostalCode: null,
        Country: null
    }
});