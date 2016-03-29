var Model = require('../model');

var EntityBase = Model.extend({
    defaults: {
        Id: null,
        Tag: null,
        CreationDate: null
    },

    getReadOnlyProperties: function() {
        var properties = Model.prototype.getReadOnlyProperties();
        properties.push('Id');
        properties.push('CreationDate');
        return properties;
    }
});

module.exports = EntityBase;