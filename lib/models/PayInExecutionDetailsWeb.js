var _ = require('underscore');
var PayInExecutionDetails = require('./PayInExecutionDetails');
var PayInTemplateURLOptions = require('./PayInTemplateURLOptions');

var PayInExecutionDetailsWeb = PayInExecutionDetails.extend({
    defaults: {
        RedirectURL: null,
        ReturnURL: null,
        TemplateURL: null,
        /**
         * The URL where you host the iFramed template.
         * For CB, Visa, MasterCard you need to specify PAYLINE: before your URL
         * with the iFramed template
         * ex: PAYLINE: https://www.maysite.com/payline_template/
         * Used for:
         *  - direct debit web type pay-in.
         *
         */
        TemplateURLOptions: null,
        Culture: null,
        /**
         * Mode3DSType { DEFAULT, FORCE }
         */
        SecureMode: null
    },

    getSubObjects: function() {
        return {
            'TemplateURLOptions': PayInTemplateURLOptions
        }
    },

    getReadOnlyProperties: function () {
        var properties = PayInExecutionDetails.prototype.getReadOnlyProperties();
        properties.push('RedirectURL', 'Type');
        return properties;
    }
});

module.exports = PayInExecutionDetailsWeb;