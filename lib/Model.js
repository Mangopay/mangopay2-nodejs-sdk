var _ = require('underscore');

function Model(data) {
    var nonNullDefaults = _.omit(this.defaults, _.isEmpty);
    _.extend(this, nonNullDefaults, data);
    this.initialize(data);
}

Model.prototype = {
    /**
     * Construct
     */
    initialize: function() {
        this.parse();
        return;
    },

    /**
     * Returns object property value
     * @param {string}  attribute   - Property value to return
     * @returns {*}
     */
    getData: function(attribute) {
        return this[attribute];
    },

    /**
     *
     * @param {string|Object}   attribute   - attribute's value to be set or hash of properties with values
     * @param {string=}         value       - value to be set
     * @returns {object}
     */
    setData: function(attribute, value) {
        if (typeof attribute === 'object') {
            _.extend(this, attribute);
        } else {
            this[attribute] = value;
        }

        return this;
    },

    getReadOnlyProperties: function() {
        return [];
    },

    getDependsObjects: function() {
        return [];
    },

    parse: function() {
        return;
    }
};

Model.extend = require('./utils').extend;

module.exports = Model;