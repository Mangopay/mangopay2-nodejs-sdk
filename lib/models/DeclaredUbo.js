var Model = require('./../Model')

/**
 * Represents validation status of a user declared as UBO.
 */
var DeclaredUbo = Model.extend({
    defaults: {
        /**
         * ID of the declared user
         */
        UserId: null,
        /**
         * Validation status of this declared UBO
         * One of DeclaredUboStatus
         */
        Status: null,
        /**
         * Reason why the UBO is not valid
         * One of UboRefusedReasonType
         */
        RefusedReasonType: null,
        /**
         * Message explaining why the UBO is not valid
         */
        RefusedReasonMessage: null
    }
});

module.exports = DeclaredUbo;