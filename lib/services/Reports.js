/**
 * @module Reports
 * @desc [MangoPay Reports API Reference](https://docs.mangopay.com/endpoints/v2.01/reporting)
 */

var Service = require('../service');
var Report = require('../models/Report');

var Reports = Service.extend({

    create: function(report, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: report,
            dataClass: Report
        });

        return this._api.method('reports_create', callback, options);
    },

    get: function(reportId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: reportId
            },
            dataClass: Report
        });

        return this._api.method('reports_get', callback, options);
    },

    getAll: function(callback, options) {
        return this._api.method('reports_all', callback, options);
    }
});

module.exports = Reports;
