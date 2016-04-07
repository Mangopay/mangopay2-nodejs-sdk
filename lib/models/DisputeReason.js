var _ = require('underscore');
var Model = require('../model');

var DisputeReason = Model.extend({
    defaults: {
        DisputeReasonType: null,
        DisputeReasonMessage: null
    }
});

module.exports = DisputeReason;