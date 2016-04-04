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
    },
    toString: function() {
        var address = _.compact([this.AddressLine1, this.AddressLine2, this.City, this.Region, this.PostalCode, this.Country]);
        return address.join(', ');
    }
});