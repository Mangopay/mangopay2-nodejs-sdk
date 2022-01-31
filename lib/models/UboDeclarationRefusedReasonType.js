/**
 * Enumeration of reasons why a UBO declaration could be refused.
 */
module.exports = {
    /**
     * When at least one natural user is missing on the declaration
     */
    MissingUbo: 'MISSING_UBO',

    DeclarationDontMatchUboInfo: 'DECLARATION_DO_NOT_MATCH_UBO_INFORMATION',

    WrongUboInformation: 'WRONG_UBO_INFORMATION',

    UboIdentityNeeded: 'UBO_IDENTITY_NEEDED',

    ShareholdersDeclarationNeeded: 'SHAREHOLDERS_DECLARATION_NEEDED',

    OrganizationChartNeeded: 'ORGANIZATION_CHART_NEEDED',

    DocumentsNeeded: 'DOCUMENTS_NEEDED',

    SpecificCase: 'SPECIFIC_CASE'
};
