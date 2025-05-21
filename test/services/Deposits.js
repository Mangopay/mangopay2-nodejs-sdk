var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');

describe('Deposits', function () {
    var deposit;

    before(function (done) {
        helpers.createNewDeposit(function (data, response) {
            deposit = data;
            done();
        });
    });

    describe('Create', function () {
        it('should be created', function () {
            expect(deposit).not.to.be.undefined;
        });

        it('check card info', function () {
            expect(deposit.CardInfo).not.to.be.undefined;
            expect(deposit.CardInfo.Type).not.to.be.undefined;
            expect(deposit.CardInfo.Brand).not.to.be.undefined;
            expect(deposit.CardInfo.IssuerCountryCode).not.to.be.undefined;
            expect(deposit.CardInfo.BIN).not.to.be.undefined;
        });
    });

    describe('Get', function () {
        var fetchedDeposit;

        before(function (done) {
            api.Deposits.get(deposit.Id, function (data, response) {
                fetchedDeposit = data;
                done();
            });
        });

        it('should be fetched', function () {
            expect(fetchedDeposit).not.to.be.undefined;
            expect(fetchedDeposit.Id).to.equal(deposit.Id);
        });
    });

    describe('Get all for card', function () {
        var result;

        before(function (done) {
            api.Deposits.getAllForCard(deposit.CardId, function (data, response) {
                result = data;
                done();
            });
        });

        it('should be fetched', function () {
            expect(result).to.be.an('array');
            expect(result.length).to.be.above(0);
        });
    });

    describe('Get all for user', function () {
        var result;

        before(function (done) {
            api.Deposits.getAllForUser(deposit.AuthorId, function (data, response) {
                result = data;
                done();
            });
        });

        it('should be fetched', function () {
            expect(result).to.be.an('array');
            expect(result.length).to.be.above(0);
        });
    });

    // describe('Cancel', function () {
    //     var deposit;
    //     var fetchedDeposit;
    //
    //     before(function (done) {
    //         helpers.createNewDeposit(function (data, response) {
    //             deposit = data;
    //
    //             api.Deposits.cancel(deposit.Id, function (data, response) {
    //                 api.Deposits.get(deposit.Id, function (data, response) {
    //                     fetchedDeposit = data;
    //                     done();
    //                 });
    //             });
    //         });
    //     });
    //
    //     it('should be canceled', function () {
    //         console.log(fetchedDeposit);
    //         expect(fetchedDeposit).not.to.be.undefined;
    //         expect(fetchedDeposit.PaymentStatus).to.equal('CANCELED');
    //     });
    // });

    describe('Get Transactions', function () {
        var result;
        var deposit;

        before(function (done) {
            helpers.createNewDeposit(function (data, response) {
                deposit = data;
                var wallet = {
                    Owners: [deposit.AuthorId],
                    Currency: 'EUR',
                    Description: 'WALLET IN EUR'
                };

                api.Wallets.create(wallet).then(function(data) {
                    var payInDto = {
                        AuthorId: deposit.AuthorId,
                        CreditedWalletId: wallet.Id,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: 1000
                        },
                        Fees: {
                            Currency: 'EUR',
                            Amount: 0
                        },
                        DepositId: deposit.Id
                    };

                    api.PayIns.createDepositPreauthorizedPayInPriorToComplement(payInDto).then(async function (data) {
                        // wait 2 seconds for the transactions to be created by the API
                        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                        await delay(2000);
                        api.Deposits.getTransactions(deposit.Id, function (data, response) {
                            result = data;
                            done();
                        });
                    });
                });
            });
        });

        it('should be fetched', function () {
            expect(result).to.be.an('array');
            expect(result.length).to.be.above(0);
        });
    });
});
