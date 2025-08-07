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

    describe('Create intent report', function () {
        var report;

        before(function (done) {
            var reportPost = {
                "DownloadFormat" : "CSV",
                "ReportType" : "ECHO_INTENT",
                "AfterDate" : 1748782023,
                "BeforeDate" : 1753102013,
                "Filters" : {
                    "PaymentMethod" : "PAYPAL",
                    "Status" : "CAPTURED",
                    "Type" : "PAYIN"
                },
                "Columns" : [
                    "Id",
                    "Status",
                    "Amount",
                    "Currency",
                    "FeesAmount",
                    "FeesCurrency",
                    "Type",
                    "PaymentMethod",
                    "BuyerId",
                    "SellerId"
                ]
            };
            api.ReportsV2.create(reportPost).then(function (data) {
                report = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.exist;
            expect(report.ReportType).to.equal("ECHO_INTENT");
            expect(report.DownloadFormat).to.equal("CSV");
            expect(report.Status).to.equal("PENDING");
            expect(report.Filters.Status).to.equal("CAPTURED");
            expect(report.Columns.length).to.equal(10);
        });
    });

    describe('Create intent action report', function () {
        var report;

        before(function (done) {
            var reportPost = {
                "DownloadFormat" : "CSV",
                "ReportType" : "ECHO_INTENT_ACTION",
                "AfterDate" : 1748782023,
                "BeforeDate" : 1753102013,
                "Filters" : {
                    "PaymentMethod" : "PAYPAL",
                    "Status" : "CAPTURED",
                    "Type" : "PAYIN"
                },
                "Columns" : [
                    "IntentId",
                    "Id",
                    "ExternalProcessingDate",
                    "ExternalProviderReference",
                    "ExternalMerchantReference",
                    "Status",
                    "Amount",
                    "Currency",
                    "FeesAmount",
                    "FeesCurrency",
                    "Type",
                    "PaymentMethod",
                    "BuyerId",
                    "SellerId"
                ]
            };
            api.ReportsV2.create(reportPost).then(function (data) {
                report = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.exist;
            expect(report.ReportType).to.equal("ECHO_INTENT_ACTION");
            expect(report.DownloadFormat).to.equal("CSV");
            expect(report.Status).to.equal("PENDING");
            expect(report.Filters.Status).to.equal("CAPTURED");
            expect(report.Columns.length).to.equal(14);
        });
    });

    describe('Create settlement report', function () {
        var report;

        before(function (done) {
            var reportPost = {
                "DownloadFormat" : "CSV",
                "ReportType" : "ECHO_SETTLEMENT",
                "AfterDate" : 1748782023,
                "BeforeDate" : 1753102013,
                "Filters" : {
                    "Status" : "RECONCILED",
                    "ExternalProviderName" : "PAYPAL"
                },
                "Columns" : [
                    "Id",
                    "CreationDate",
                    "FileName",
                    "SettlementCurrency",
                    "Status",
                    "SettledTransactionCount",
                    "UnsettledTransactionCount",
                    "SettledAmount",
                    "DeclaredAmount",
                    "DeficitAmount"
                ]
            };
            api.ReportsV2.create(reportPost).then(function (data) {
                report = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.exist;
            expect(report.ReportType).to.equal("ECHO_SETTLEMENT");
            expect(report.DownloadFormat).to.equal("CSV");
            expect(report.Status).to.equal("PENDING");
            expect(report.Filters.Status).to.equal("RECONCILED");
            expect(report.Columns.length).to.equal(10);
        });
    });

    describe('Create settlement report', function () {
        var report;

        before(function (done) {
            var reportPost = {
                "DownloadFormat" : "CSV",
                "ReportType" : "ECHO_SETTLEMENT",
                "AfterDate" : 1748782023,
                "BeforeDate" : 1753102013,
                "Filters" : {
                    "Status" : "RECONCILED",
                    "ExternalProviderName" : "PAYPAL"
                },
                "Columns" : [
                    "Id",
                    "CreationDate",
                    "FileName",
                    "SettlementCurrency",
                    "Status",
                    "SettledTransactionCount",
                    "UnsettledTransactionCount",
                    "SettledAmount",
                    "DeclaredAmount",
                    "DeficitAmount"
                ]
            };
            api.ReportsV2.create(reportPost).then(function (data) {
                report = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.exist;
            expect(report.ReportType).to.equal("ECHO_SETTLEMENT");
            expect(report.DownloadFormat).to.equal("CSV");
            expect(report.Status).to.equal("PENDING");
            expect(report.Filters.Status).to.equal("RECONCILED");
            expect(report.Columns.length).to.equal(10);
        });
    });

    describe('Create split report', function () {
        var report;

        before(function (done) {
            var reportPost = {
                "Tag" : "Creating a report using new Mangopay system",
                "DownloadFormat" : "CSV",
                "ReportType" : "ECHO_SPLIT",
                "AfterDate" : 1748782023,
                "BeforeDate" : 1753102013,
                "Filters" : {
                    "Status" : "COMPLETED",
                    "IntentId" : "int_0197f975-63f6-714e-8fc6-4451e128170f",
                    "Scheduled": false
                },
                "Columns" : [
                    "Id",
                    "IntentId",
                    "AuthorId",
                    "Amount",
                    "Currency",
                    "FeesAmount",
                    "FeesCurrency",
                    "Status",
                    "Description",
                    "CreditedWalletId",
                    "DebitedWalletId",
                    "Scheduled",
                    "CreationDate",
                    "ExecutionDate"
                ]
            };
            api.ReportsV2.create(reportPost).then(function (data) {
                report = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.exist;
            expect(report.ReportType).to.equal("ECHO_SPLIT");
            expect(report.DownloadFormat).to.equal("CSV");
            expect(report.Status).to.equal("PENDING");
            expect(report.Filters.Status).to.equal("COMPLETED");
            expect(report.Filters.IntentId).to.equal("int_0197f975-63f6-714e-8fc6-4451e128170f");
            expect(report.Columns.length).to.equal(14);
        });
    });
});
