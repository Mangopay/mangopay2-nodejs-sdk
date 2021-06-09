var _ = require('underscore');
var PayIn = require('./PayIn');

var RecurringPayIn = PayIn.extend({
    defaults: _.extend({}, PayIn.prototype.defaults, {
        RecurringPayinRegistrationId: null
    }),
});

module.exports = RecurringPayIn;
