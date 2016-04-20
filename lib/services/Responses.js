/**
 * @module Responses
 */

var _ = require('underscore');

var Service = require('../service');

var Responses = Service.extend({
    /**
     * Get response from previous call
     * @param callback
     * @param options
     * @returns {Object} Request promise
     */
    get: function(callback, options) {
        options = this._api._getOptions(callback, options);

        return this._api.method('responses_get', callback, options);
    }
});

module.exports = Responses;