var _ = require('underscore');
var Model = require('../model');
var Money = require('./Money');
var DisputeReason = require('./DisputeReason');

var Dispute = Model.extend({
    defaults: {
        InitialTransactionId: null,
        InitialTransactionType: null,
        DisputeType: null,
        ContestDeadlineDate: null,
        DisputeReason: null,
        DisputedFunds: null,
        ContestedFunds: null,
        Status: null,

        /**
         * Free text used when reopening the dispute
         */
        StatusMessage: null,

        /**
         * The outcome of the dispute – will be null until closed, and then one of WON, LOST or VOID
         */
        ResultCode: null,
        ResultMessage: null
    },

    getSubObjects: function() {
        return {
            'DisputeReason': DisputeReason,
            'DisputedFunds': Money,
            'ContestedFunds': Money
        }
    },

    getReadOnlyProperties: function() {
        var properties = Model.prototype.getReadOnlyProperties();
        properties.push('InitialTransactionId');
        properties.push('InitialTransactionType');
        properties.push('DisputeType');
        properties.push('ContestDeadlineDate');
        properties.push('DisputeReason');
        properties.push('DisputedFunds');
        properties.push('Status');
        properties.push('StatusMessage');
        properties.push('ResultCode');
        properties.push('ResultMessage');
        return properties;
    }
});

module.exports = Dispute;