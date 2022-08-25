var EntityBase = require('./EntityBase');

var CountryAuthorization = EntityBase.extend({
    defaults: {
        CountryCode: null,
        CountryName: null,
        Authorization: null,
        LastUpdate: null
    }
});

module.exports = CountryAuthorization;
