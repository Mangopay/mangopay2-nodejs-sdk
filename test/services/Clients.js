var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;

var ClientWallet = require('../../lib/models/ClientWallet');
describe("Clients", function () {
    var client;
    before(function (done) {
        api.Clients.get().then(function (data) {
            client = data;
            done();
        });
    });

    it('Get Client', function () {
        expect(client.ClientId).not.to.be.undefined;
        expect(client.ClientId).to.equal(api.config.clientId);
    });

    describe("Update client", function () {
        var updatedClient;
        var themeColor = '#123456';
        var buttonColor = '#654321';
        var phoneNumber = Math.floor(Math.random() * 100000).toString();

        before(function (done) {
            api.Clients.update({PrimaryThemeColour: themeColor, PrimaryButtonColour: buttonColor, HeadquartersPhoneNumber: phoneNumber})
                .then(function (data) {
                    updatedClient = data;
                    done();
                });
        });

        it("should have updated colors", function () {
            expect(updatedClient.ClientId).not.to.be.undefined;
            expect(updatedClient.PrimaryThemeColour).to.equal(themeColor);
            expect(updatedClient.PrimaryButtonColour).to.equal(buttonColor);
        });

        it('should have update headquarters phone number', function () {
            expect(updatedClient.HeadquartersPhoneNumber).to.equal(phoneNumber);
        });

    });

    describe("Upload Logo", function () {
        var filePath = path.resolve(__dirname, '../TestKycPageFile.png');
        var requestResponse;
        before(function (done) {
            api.Clients.uploadLogoFromFile(filePath, function (data, response) {
                requestResponse = response;
                done();
            });
        });

        it('should be uploaded', function () {
            expect(requestResponse.statusCode).to.equal(204);
        });

    });

    describe("Get client wallets by funds type", function () {
        var feesWallets;
        var creditWallets;
        before(function (done) {
            api.Clients.getClientWalletsByFundsType('FEES', function (data, response) {
                feesWallets = data;
                api.Clients.getClientWalletsByFundsType('CREDIT', function (data, response) {
                    creditWallets = data;
                    done();
                });
            });
        });

        it('should have wallets', function () {
            expect(feesWallets).not.to.be.undefined;
            expect(creditWallets).not.to.be.undefined;
        })
    });

    describe("Get client wallet", function () {
        var clientWallets;
        var clientWallet;
        before(function (done) {
            api.Clients.getClientWallets(function (data, response) {
                clientWallets = data;
                api.Clients.getClientWallet(clientWallets[0].FundsType, clientWallets[0].Currency
                    , function (data, response) {
                        clientWallet = data;
                        done();
                    });
            });
        });

        it('should get the same client wallet', function () {
            expect(clientWallet).not.to.be.undefined;
            expect(clientWallet.FundsType).to.equal(clientWallets[0].FundsType);
            expect(clientWallet.Currency).to.equal(clientWallets[0].Currency);
        });
    });

    describe("Get client wallet's transactions", function () {
        var clientWallets;
        var transactions;
        before(function (done) {
            api.Clients.getClientWallets(function (data, response) {
                clientWallets = data;
                api.Clients.getClientWalletTransactions(clientWallets[0].FundsType, clientWallets[0].Currency
                    , function (data, response) {
                        transactions = data;
                        done();
                    });
            });
        });

        it('should get transactions', function () {
            expect(transactions).not.to.be.undefined;
            expect(transactions.length).to.be.greaterThan(0);
        })

    });
});
