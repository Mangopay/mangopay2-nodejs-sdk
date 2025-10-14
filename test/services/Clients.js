var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;
var api = require('../main');

var ClientWallet = require('../../lib/models/ClientWallet');
var BankAccount = require('../../lib/models/BankAccount');
var BankAccountDetailsIBAN = require('../../lib/models/BankAccountDetailsIBAN');
var PayOut = require('../../lib/models/PayOut');
var PayOutPaymentDetailsBankWire = require('../../lib/models/PayOutPaymentDetailsBankWire');

describe("Clients", function () {
    var client;
    var createdBankAccount;

    before(function (done) {
        api.Clients.get().then(function (data) {
            client = data;
            done();
        });
    });

    it('Get Client', function () {
        expect(client.ClientId).not.to.be.undefined;
        expect(client.ClientId).to.equal(api.config.clientId);
        expect(client.Licensor).not.to.be.undefined;
    });

    describe("Update client", function () {
        var updatedClient;
        var themeColor = '#123456';
        var buttonColor = '#654321';
        var phoneNumber = Math.floor(Math.random() * 100000).toString();

        before(function (done) {
            api.Clients.update({
                PrimaryThemeColour: themeColor,
                PrimaryButtonColour: buttonColor,
                HeadquartersPhoneNumber: phoneNumber
            })
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

    describe.skip("Upload Logo", function () {
        var filePath = path.resolve(__dirname, '../TestKycPageFile.png');
        var requestResponse;
        before(function (done) {
            api.Clients.uploadLogoFromFile(filePath, function (data, response) {
                requestResponse = response;
                done();
            });
        });

        it('should be uploaded', function () {
            expect(requestResponse.status).to.equal(204);
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

    describe("Create BankAccountIBAN", function () {
        var account = new BankAccount({
            OwnerName: "Joe Blogs",
            OwnerAddress: {
                "AddressLine1": "1 Mangopay Street",
                "AddressLine2": "The Loop",
                "City": "Paris",
                "Region": "Ile de France",
                "PostalCode": "75001",
                "Country": "FR"
            },
            Details: new BankAccountDetailsIBAN({
                IBAN: "FR7630004000031234567890143",
                BIC: "BNPAFRPP"
            }),
            Tag: "custom meta"
        });

        before(function (done) {
            api.Clients.createBankAccountIBAN(account).then(function (data) {
                createdBankAccount = data;
                done();
            });
        });

        it('should get the bank account', function () {
            expect(createdBankAccount).not.to.be.undefined;
            expect(createdBankAccount.Id).not.to.be.undefined;
        });
    });

    describe("Create PayOut", function () {
        var createdPayOut;
        var clientWallets;
        var clientWallet;

        before(function (done) {
            api.Clients.getClientWallets(function (data, response) {
                clientWallets = data;
                api.Clients.getClientWallet(clientWallets[0].FundsType, clientWallets[0].Currency
                    , function (data, response) {
                        clientWallet = data;

                        var payOut = new PayOut({
                            DebitedWalletId: clientWallet.Id,
                            PaymentType: 'BANK_WIRE',
                            MeanOfPaymentDetails: new PayOutPaymentDetailsBankWire({
                                BankAccountId: createdBankAccount.Id,
                                BankWireRef: 'invoice 7282',
                                PayoutModeRequested: 'STANDARD'
                    }),
                            DebitedFunds: {
                                "Currency": "EUR",
                                "Amount": 12
                            },
                            Tag: 'bla'
                        });

                        api.Clients.createPayOut(payOut).then(function (data) {
                            createdPayOut = data;
                            done();
                        });
                    });
            });
        });

        it('should create the payout', function () {
            console.log(createdPayOut);
            expect(createdPayOut).not.to.be.undefined;
            expect(createdPayOut.Id).not.to.be.undefined;
        });
    });

    describe("Create PayIn BankWire Direct", function () {
        var created;

        before(function (done) {
            const dto = {
                "CreditedWalletId": "CREDIT_EUR",
                    "DeclaredDebitedFunds": {
                    "Currency": "EUR",
                        "Amount": 1000
                }
            };
            api.Clients.createBankWireDirectPayIn(dto, function(data) {
                created = data;
                done();
            });
        });

        it('should create the payin', function () {
            expect(created).not.to.be.undefined;
            expect(created.Id).not.to.be.undefined;
            expect(created.Type).to.eq('PAYIN');
            expect(created.Status).to.eq('CREATED');
            expect(created.PaymentType).to.eq('BANK_WIRE');
            expect(created.ExecutionType).to.eq('DIRECT');
        });
    });
});
