var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');

describe('Reports V2 (2025)', function () {
    var report;

    before(function (done) {
        var reportPost = {
            DownloadFormat: "CSV",
            ReportType: "COLLECTED_FEES",
            AfterDate: 1740787200,
            BeforeDate: 1743544740
        };
        api.ReportsV2.create(reportPost).then(function (data) {
            report = data;
            done();
        });
    });

    it('should exist after creating it', function () {
        expect(report.Id).to.exist;
        expect(report.ReportType).to.equal("COLLECTED_FEES");
        expect(report.DownloadFormat).to.equal("CSV");
        expect(report.Status).to.equal("PENDING");
    });

    describe('Create for user wallet transactions', function () {
        var userWalletTransactionReport;

        before(function (done) {
            var reportPost = {
                DownloadFormat: "CSV",
                ReportType: "USER_WALLET_TRANSACTIONS",
                AfterDate: 1740787200,
                BeforeDate: 1743544740
            };
            api.ReportsV2.create(reportPost).then(function (data) {
                userWalletTransactionReport = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(userWalletTransactionReport.Id).to.exist;
            expect(userWalletTransactionReport.ReportType).to.equal("USER_WALLET_TRANSACTIONS");
            expect(userWalletTransactionReport.DownloadFormat).to.equal("CSV");
            expect(userWalletTransactionReport.Status).to.equal("PENDING");
        });
    });

    describe('Getting created report', function () {
        var getReport;

        before(function (done) {
            api.ReportsV2.get(report.Id).then(function (data) {
                getReport = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.equal(getReport.Id);
            expect(report.CreationDate).to.equal(getReport.CreationDate);
        });
    });

    describe('Getting all reports', function () {
        var allReports;

        before(function (done) {
            api.ReportsV2.getAll().then(function (data) {
                allReports = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(allReports).to.be.an('array');
            expect(allReports.length).to.be.above(0);
        });
    });
});
