var Model = require('../Model');

module.exports = Model.extend({
    defaults: {
        DebitedCurrency: null,
        CreditedCurrency: null,
        ClientRate: null,
        MarketRate: null
    }
});