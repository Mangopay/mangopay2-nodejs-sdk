var EntityBase = require('./EntityBase');
var ReportFilter = require('./ReportFilter');


var Report = EntityBase.extend({
    defaults: {
        /**
         *The date when the report was executed
         */
        ReportDate: null,
        /**
         * The URL to download the report
         */
        DownloadURL: null,
        /**
         * A URL that will be pinged when the report is ready to download (works in a similar way to the hooks)
         */
        CallbackURL: null,
        /**
         * The format of the report download { CSV }
         */
        DownloadFormat: null,
        /**
         * Report type {TRANSACTION}
         */
        ReportType: null,
        /**
         * The column to sort against and direction
         */
        Sort: null,
        /**
         * Whether the report should be limited to the first 10 lines (and therefore quicker to execute)
         */
        Preview: null,
        Filters: null,
        /**
         * A list of columns/infos to show in the report
         */
        Columns: null,
        /**
         * The result code
         */
        ResultCode: null,
        ResultMessage: null
    },

    getSubObjects: function () {
        return {
            'Filters': ReportFilter
        }
    }
});

module.exports = Report;
