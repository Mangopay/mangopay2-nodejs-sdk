var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');
const PayIn = require("../../lib/models/PayIn");

describe('Conversions', function () {
    var john = helpers.data.getUserNatural();
    var instantConversion;

    before(function (done) {
        api.Users.create(john, function () {
            done();
        });
    });

    describe('Get Conversion Rate', function () {
        var conversionRate;

        before(function (done) {
            api.Conversions.getConversionRate('EUR', 'GBP', function (data, response) {
                conversionRate = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(conversionRate.ClientRate).not.to.be.null;
            expect(conversionRate.MarketRate).not.to.be.null;
        });
    });

    describe('Create Instant Conversion', function () {
        var cardRegistration;
        var creditedWallet;
        var debitedWallet;
        var card;

        before(function (done) {
            creditedWallet = {
                Owners: [john.Id],
                Currency: 'GBP',
                Description: 'WALLET IN GBP'
            };
            debitedWallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };
            cardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };
            api.Wallets.create(debitedWallet).then(function () {
                api.CardRegistrations.create(cardRegistration, function () {
                    helpers.getPaylineCorrectRegistartionData(cardRegistration, function (data, response) {
                        cardRegistration.RegistrationData = data;
                        api.CardRegistrations.update(cardRegistration).then(function (data) {
                            cardRegistration = data;
                            api.Cards.get(cardRegistration.CardId, function (data, response) {
                                card = data;
                                api.PayIns.create({
                                    CreditedWalletId: debitedWallet.Id,
                                    AuthorId: john.Id,
                                    DebitedFunds: {
                                        Amount: 100,
                                        Currency: 'EUR'
                                    },
                                    Fees: {
                                        Amount: 0,
                                        Currency: 'EUR'
                                    },
                                    CardId: card.Id,
                                    SecureMode: 'DEFAULT',
                                    SecureModeReturnURL: 'https://test.com',
                                    PaymentType: 'CARD',
                                    ExecutionType: 'DIRECT',
                                    BrowserInfo: {
                                        AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
                                        JavaEnabled: true,
                                        Language: "FR-FR",
                                        ColorDepth: 4,
                                        ScreenHeight: 1800,
                                        ScreenWidth: 400,
                                        JavascriptEnabled: true,
                                        TimeZoneOffset: "+60",
                                        UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                                    },
                                    IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C"
                                }, function (data, response) {
                                    api.Wallets.create(creditedWallet).then(function () {
                                        instantConversion = {
                                            AuthorId: john.Id,
                                            CreditedWalletId: creditedWallet.Id,
                                            DebitedWalletId: debitedWallet.Id,
                                            CreditedFunds: {
                                                Currency: 'GBP'
                                            },
                                            DebitedFunds: {
                                                Currency: 'EUR',
                                                Amount: 79
                                            },
                                            Tag: 'Instant conversion test'
                                        };
                                        api.Conversions.createInstantConversion(instantConversion, function (data, response) {
                                            instantConversion = data;
                                            done();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it('should be created', function () {
            expect(instantConversion.DebitedFunds.Amount).not.to.be.null;
            expect(instantConversion.CreditedFunds.Amount).not.to.be.null;
            expect(instantConversion.Status).to.equal('SUCCEEDED');
        });
    });

    describe('Get Conversion', function () {
        var fetchedConversion;

        before(function (done) {
            api.Conversions.getConversion(instantConversion.Id, function (data, response) {
                fetchedConversion = data;
                done();
            });
        });

        it('should be created', function () {
            expect(fetchedConversion.DebitedFunds.Amount).not.to.be.null;
            expect(fetchedConversion.CreditedFunds.Amount).not.to.be.null;
            expect(fetchedConversion.Status).to.equal('SUCCEEDED');
            expect(fetchedConversion.Id).to.equal(instantConversion.Id);
        });
    });

});
