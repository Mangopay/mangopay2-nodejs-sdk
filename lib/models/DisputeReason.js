var _ = require('underscore');
var Model = require('../Model');

var DisputeReason = Model.extend({
    defaults: {
        DisputeReasonType: null,
        DisputeReasonMessage: null
    }
});

module.exports = DisputeReason;