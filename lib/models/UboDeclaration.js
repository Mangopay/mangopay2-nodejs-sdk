var EntityBase = require('./EntityBase');

/**
 * UBO declaration entity.
 */
var UboDeclaration = EntityBase.extend({
    defaults: {
        /**
         * Owner's user ID
         * Non-null, cannot be updated after creating declaration.
         */
        UserId: null,
        /**
         * Declaration status (one of UboDeclarationStatus)
         */
        Status: null,
        /**
         * Array of reasons why the declaration was refused
         * Values as declared in UboDeclarationRefusedReasonType.
         */
        RefusedReasonTypes: null,
        /**
         * Explanation of why the declaration was refused.
         */
        RefusedReasonMessage: null,
        /**
         * Listed representations of natural users declared as UBOs.
         * When transmitting a UBO declaration (POST / PUT), must be an array of
         * IDs (string) of the users to be declared as UBOs.
         * In a received UBO declaration (GET), will be an array of representations
         * of the natural users declared as UBOs (\MangoPay\DeclaredUbo).
         */
        DeclaredUBOs: null
    }
});

module.exports = UboDeclaration;