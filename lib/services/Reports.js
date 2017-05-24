/**
 * @module Reports
 * @desc [MangoPay Reports API Reference](https://docs.mangopay.com/endpoints/v2.01/reporting)
 */

var Service = require('../service');
var Report = require('../models/Report');

var Reports = Service.extend({
    /**
     * Create a report
     * @param {Object}      report      Report Data
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    create: function(report, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: report,
            dataClass: Report
        });

        if (!report.ReportType) {
            throw new Error('Please specify ReportType in the report data (ex: "TRANSACTION", "WALLET")')
        }

        var reportType = report.ReportType.toLowerCase();

        return this._api.method('reports_' + report.ReportType.toLowerCase() + '_create', callback, options);
    },

    /**
     * Get a report
     * @param {number}      reportId    Report Id
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    get: function(reportId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: reportId
            },
            dataClass: Report
        });

        return this._api.method('reports_get', callback, options);
    },

    /**
     * Get all reports
     * @param {Function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    getAll: function(callback, options) {
        return this._api.method('reports_all', callback, options);
    }
});

module.exports = Reports;
