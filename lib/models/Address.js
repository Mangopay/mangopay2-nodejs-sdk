/**
 * WORK IN PROGRESS
 */
var Model = require('../model');

module.exports = Model.extend({
    defaults: {
        AddressLine1: null,
        AddressLine2: null,
        City: null,
        Region: null,
        PostalCode: null,
        Country: null
    }
});