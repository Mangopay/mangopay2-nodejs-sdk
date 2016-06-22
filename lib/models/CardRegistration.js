var _ = require('underscore');
var Model = require('../Model');

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
        properties.push('AccessKey', 'PreregistrationData', 'CardRegistrationURL', 'CardId', 'ResultCode',
            'ResultMessage', 'Status');

        return properties;
    }
});

module.exports = CardRegistration;