var EntityBase = require('./EntityBase');
var ReportFilterV2 = require('./ReportFilterV2');


var ReportV2 = EntityBase.extend({
    defaults: {
        ReportDate: null,
        Status: null,
        ResultCode: null,
        ResultMessage: null,
        DownloadFormat: null,
        DownloadURL: null,
        ReportType: null,
        Sort: null,
        AfterDate: null,
        BeforeDate: null,
        Filters: null,
        Columns: null
    },

    getSubObjects: function () {
        return {
            'Filters': ReportFilterV2
        };
    }
});

module.exports = ReportV2;
