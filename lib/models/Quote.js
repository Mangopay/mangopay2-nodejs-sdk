var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        ExpirationDate: null,
        Status: null,
        DebitedFunds: null,
        CreditedFunds: null,
        ConversionRateResponse: null
    }
});