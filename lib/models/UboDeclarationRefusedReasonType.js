/**
 * Enumeration of reasons why a UBO declaration could be refused.
 */
module.exports = {
    /**
     * When at least one natural user is missing on the declaration
     */
    MissingUbo: 'MISSING_UBO',
    /**
     * When at least one natural user should not be declared as UBO
     */
    InvalidDeclaredUbo: 'INVALID_DECLARED_UBO',
    /**
     * When at least one natural user declared as UBO has been created
     * with wrong details (i.e. date of birth, country of residence)
     */
    InvalidUboDetails: 'INVALID_UBO_DETAILS'
};