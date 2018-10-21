var EntityBase = require('./EntityBase');

var Client = EntityBase.extend({
    defaults: {
        Name: null,
        ClientId: null,
        /**
         *The primary branding colour to use for your merchant
         */
        PrimaryThemeColour: null,
        /**
         * The primary branding colour to use for buttons for your merchant
         */
        PrimaryButtonColour: null,
        /**
         * The URL of the logo of your client
         */
        Logo: null,
        /**
         * A list of email addresses to use when contacting you for technical issues/communications
         */
        TechEmails: null,
        /**
         * A list of email addresses to use when contacting you for admin/commercial issues/communications
         */
        AdminEmails: null,
        /**
         * A list of email addresses to use when contacting you for fraud/compliance issues/communications
         */
        FraudEmails: null,
        /**
         * A list of email addresses to use when contacting you for billing issues/communications
         */
        BillingEmails: null,
        /**
         * A description of what your platform does
         */
        PlatformDescription: null,
        /**
         * Client's business categorization info
         */
        PlatformCategorization: null,
        /**
         * The URL for your website
         */
        PlatformURL: null,

        HeadquartersAddress: null,

        HeadquartersPhoneNumber: null,
        /**
         * The tax (or VAT) number for your company
         */
        TaxNumber: null
    }
});

module.exports = Client;
