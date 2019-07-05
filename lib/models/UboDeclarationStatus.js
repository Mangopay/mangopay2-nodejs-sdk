/**
 * UBO declaration possible status enumeration.
 */
module.exports = {
    /**
     * When the UBO declaration was created
     */
    Created: 'CREATED',
    /**
     * When validation has been requested for the UBO declaration
     */
    ValidationAsked: 'VALIDATION_ASKED',
    /**
     * When the UBO declaration was validated
     */
    Validated: 'VALIDATED',
    /**
     * When the UBO declaration was refused
     */
    Refused: 'REFUSED',

    /**
     * When the UBO declaration was incomplete
     */
    Incomplete: 'INCOMPLETE',
};