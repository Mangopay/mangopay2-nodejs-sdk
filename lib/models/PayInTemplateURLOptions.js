var EntityBase = require('./EntityBase');

var PayInTemplateURLOptions = EntityBase.extend({
    defaults: {
        PAYLINE: null,
        PAYLINEV2: null
    }
});

module.exports = PayInTemplateURLOptions;
