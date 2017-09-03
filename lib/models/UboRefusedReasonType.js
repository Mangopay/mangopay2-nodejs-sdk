/**
 * Enumerated possible reasons why declaration of a user as UBO could be refused.
 */
module.exports = {
    /**
     * When user should not be declared as UBO
     */
    InvalidDeclaredUbo: 'INVALID_DECLARED_UBO',
    /**
     * When user declared as UBO was created with wrong
     * details (i.e. date of birth, country of residence)
     */
    InvalidUboDetails: 'INVALID_UBO_DETAILS'
};