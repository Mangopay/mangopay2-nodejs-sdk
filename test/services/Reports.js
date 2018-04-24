var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Reports - Transaction', function() {
    var report;

    before(function(done) {
        report = {
            ReportType: "TRANSACTION"
        };
        api.Reports.create(report).then(function () {
            done();
        });
    });

    it('should exist after creting it', function () {
        expect(report.Id).to.exist;
    });

    describe('Getting created report', function () {
        var getReport;

        before(function(done){
            api.Reports.get(report.Id).then(function(data){
                getReport = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.equal(getReport.Id);
            expect(report.CreationDate).to.equal(getReport.CreationDate);
        });
    });
});

describe('Reports - Wallet', function() {
    var report;

    before(function(done) {
        report = {
            ReportType: "WALLET"
        };
        api.Reports.create(report).then(function () {
            done();
        });
    });

    it('should exist after creting it', function () {
        expect(report.Id).to.exist;
    });

    describe('Getting created report', function () {
        var getReport;

        before(function(done){
            api.Reports.get(report.Id).then(function(data){
                getReport = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(report.Id).to.equal(getReport.Id);
            expect(report.CreationDate).to.equal(getReport.CreationDate);
        });
    });
});
