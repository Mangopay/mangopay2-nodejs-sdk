var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');

describe('Reports - Transactions', function () {
    var report;

    before(function (done) {
        report = {
            ReportType: "TRANSACTIONS",
            Tag: 'Created with Mangopay NodeJs SDK',
            DownloadFormat: 'CSV',
            CallbackURL: 'https://mangopay.com/docs/please-ignore',
            Sort: 'CreationDate:ASC',
            Preview: false,
            Filters:
                {
                    BeforeDate: 1756293864,
                    AfterDate: 1753615463,
                    Type: ['PAYIN'],
                    ResultCode: ['000000'],
                    Status: ['SUCCEEDED'],
                    Nature: ['REGULAR'],
                    WalletId: null,
                    AuthorId: null,
                    MinDebitedFundsAmount: 10,
                    MinDebitedFundsCurrency: 'EUR',
                    MaxDebitedFundsAmount: 12000,
                    MaxDebitedFundsCurrency: 'EUR',
                    MinFeesAmount: 10,
                    MinFeesCurrency: 'EUR',
                    MaxFeesAmount: 150000,
                    MaxFeesCurrency: 'EUR',
                },
            Columns: [
                'Id',
                'Tag',
                'CreationDate',
                'ExecutionDate',
                'AuthorId',
                'CreditedUserId',
                'DebitedFundsAmount',
                'DebitedFundsCurrency',
                'CreditedFundsAmount',
                'CreditedFundsCurrency',
                'FeesAmount',
                'FeesCurrency',
                'Status',
                'ResultCode',
                'ResultMessage',
                'Type',
                'Nature',
                'CreditedWalletId',
                'DebitedWalletId',
            ]
        };
        api.Reports.create(report).then(function (data) {
            done();
        });
    });

    it('should exist after creating it', function () {
        expect(report.Id).to.exist;
    });

    describe('Getting created report', function () {
        var getReport;

        before(function (done) {
            api.Reports.get(report.Id).then(function (data) {
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

describe('Reports - Wallets', function () {
    var report;

    before(function (done) {
        report = {
            ReportType: "WALLETS"
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

        before(function (done) {
            api.Reports.get(report.Id).then(function (data) {
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
