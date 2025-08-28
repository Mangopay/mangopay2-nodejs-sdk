var _ = require('underscore');
var Model = require('../Model');

var EntityBase = Model.extend({
    defaults: {
        Id: null,
        Tag: null,
        CreationDate: null
    },

    getReadOnlyProperties: function() {
        var properties = Model.prototype.getReadOnlyProperties();
        properties.push('Id', 'CreationDate');
        return properties;
    },

    /**
     * Casting the entity to JSON data that will be passed to the server
     */
    toJSON: function() {
        var self = this;

        /**
         * Flatten object model structure
         */
        _.each(this, function(dataValue){
            if (dataValue instanceof Model) {
                _.extendOwn(self, dataValue);
            }
        });

        /**
         * Parse dependents object functionality
         */
        var dependsObjects = this.getDependsObjects();
        if (dependsObjects.length) {
            _.each(dependsObjects, function(dependsObject){
                var propertyValue = self.getData(dependsObject.propertyName);
                _.each(dependsObject.propertyValueMapping, function(modelClass, key) {
                    if (propertyValue instanceof modelClass) {
                        self[dependsObject.dependsPropertyName] = key;
                    }
                });
            });
        }

        delete self.CreationDate;
        return self;
    },

    /**
     * Parse method is being called to interpret the data received from the server
     */
    parse: function() {
        var self = this;
        var dependsObjects = this.getDependsObjects();
        if (dependsObjects.length) {
            _.each(dependsObjects, function(dependsObject){
                var dependsPropertyValue = self.getData(dependsObject.dependsPropertyName);
                var PropertyObjectClass = dependsObject.propertyValueMapping[dependsPropertyValue];
                if (PropertyObjectClass) {
                    var updatedDependsObject = new PropertyObjectClass(self.getData(dependsObject.propertyName));
                    self.setData(dependsObject.propertyName, updatedDependsObject);
                }
            });
        }
    }
});

module.exports = EntityBase;