var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        UserId: null,
        Culture: null,
        ReturnURL: null,
        TemplateURL: null,
        RedirectURL: null,
        Alias: null
    }
});