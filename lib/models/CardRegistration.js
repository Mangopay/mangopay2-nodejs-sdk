var _ = require('underscore');
var Model = require('../model');

var CardRegistration = Model.extend({
    defaults: {
        UserId: null,
        CardType: null,
        AccessKey: null,
        PreregistrationData: null,
        CardRegistrationURL: null,
        CardId: null,
        RegistrationData: null,
        ResultCode: null,
        ResultMessage: null,
        Currency: null,
        Status: null
    },

    getReadOnlyProperties: function() {
        var properties = Model.prototype.getReadOnlyProperties();
        properties.push('AccessKey');
        properties.push('PreregistrationData');
        properties.push('CardRegistrationURL');
        properties.push('CardId');
        properties.push('ResultCode');
        properties.push('ResultMessage');
        properties.push('Status');

        return properties;
    }
});

module.exports = CardRegistration;