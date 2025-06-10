/**
 * @module Reports 2025
 * @desc [MangoPay Reports API Reference](https://mangopay-reports.mintlify.app/api-reference/reporting/report-object)
 */

var Service = require('../service');
var ReportV2 = require('../models/ReportV2');

var ReportsV2 = Service.extend({
    /**
     * Create a report
     * @param {Object}      report      Report Data
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    create: function (report, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: report,
            dataClass: ReportV2
        });

        return this._api.method('reports_create', callback, options);
    },

    /**
     * Get a report
     * @param {number}      reportId    Report Id
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    get: function (reportId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: reportId
            },
            dataClass: ReportV2
        });

        return this._api.method('reports_get_v2', callback, options);
    },

    /**
     * Get all reports
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getAll: function (callback, options) {
        return this._api.method('reports_all_v2', callback, options);
    }
});

module.exports = ReportsV2;
