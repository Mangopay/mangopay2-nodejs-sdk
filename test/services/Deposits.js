var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');

describe('Deposits', function () {

    describe('Create', function () {
        var deposit;

        before(function (done) {
            helpers.createNewDeposit(function (data, response) {
               deposit = data;
               done();
            });
        });

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
        var deposit;
        var fetchedDeposit;

        before(function (done) {
            helpers.createNewDeposit(function (data, response) {
                deposit = data;

                api.Deposits.get(deposit.Id, function (data, response) {
                   fetchedDeposit = data;
                   done();
                });
            });
        });

        it('should be fetched', function () {
            expect(fetchedDeposit).not.to.be.undefined;
            expect(fetchedDeposit.Id).to.equal(deposit.Id);
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
});
