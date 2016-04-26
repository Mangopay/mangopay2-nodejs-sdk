/**
 * @module Responses
 */

var _ = require('underscore');

var Service = require('../service');

var Responses = Service.extend({
    /**
     * Get response from previous call
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object} Request promise
     */
    get: function(callback, options) {
        options = this._api._getOptions(callback, options);

        return this._api.method('responses_get', callback, options);
    }
});

module.exports = Responses;