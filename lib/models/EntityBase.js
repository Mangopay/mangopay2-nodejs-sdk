var _ = require('underscore');
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
    },

    /**
     * Parse method is being called before passing the model data to the server
     */
    parse: function() {
        /**
         * If one of the properties is a model instance, we copy the properties at the root level of the model
         * {a: 1, b: MyObject{c:2, d:3} turns into {a:1, b: MyObject{c:2, d:3}, c:2, d:3}
         */
        var self = this;
        _.each(this, function(dataValue){
            if (dataValue instanceof Model) {
                _.extendOwn(self, dataValue);
            }
        });
        delete this.CreationDate;
    }
});

module.exports = EntityBase;