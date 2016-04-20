/**
 * @module Events
 * @desc [MangoPay Events API Reference](https://docs.mangopay.com/api-references/events/)
 */

var Service = require('../service');

var Events = Service.extend({
    /**
     * Get events
     * @param callback
     * @param options
     * @returns {Object} Request promise
     */
    getAll: function(callback, options) {
        options = this._api._getOptions(callback, options);

        return this._api.method('events_all', callback, options);
    }
});

module.exports = Events;