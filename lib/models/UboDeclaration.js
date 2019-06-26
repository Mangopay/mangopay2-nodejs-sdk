var EntityBase = require('./EntityBase');

/**
 * UBO declaration entity.
 */
var UboDeclaration = EntityBase.extend({
    defaults: {
        /**
         * cannot be modified by clients
         */
        ProcessedDate: null,
        /**
         * Declaration status (one of UboDeclarationStatus)
         */
        Status: null,
        /**
         * Array of reasons why the declaration was refused
         * Values as declared in UboDeclarationRefusedReasonType.
         */
        Reason: null,
        /**
         * Explanation of why the declaration was refused.
         */
        Message: null,
        /**
         * Table of ubos (declared in Ubo)
         */
        Ubos: []
    },

    /**
     * Get array with read-only properties
     * @return {Array} List of string properties
     */
    getReadOnlyProperties: function () {
        var properties = EntityBase.prototype.getReadOnlyProperties();
        properties.push('ProcessedDate', 'Status', 'Reason', 'Message');
        return properties;
    },
});

module.exports = UboDeclaration;