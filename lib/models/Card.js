var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        ExpirationDate: null,
        Alias: null,
        CardProvider: null,
        UserId: null,
        CardType: null,
        Product: null,
        BankCode: null,
        Country: null,
        Active: null,
        Currency: null,
        Validity: null,
        Fingerprint: null
    }
});