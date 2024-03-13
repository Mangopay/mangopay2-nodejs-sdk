var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');
const PayIn = require("../../lib/models/PayIn");

describe('Conversions', function () {
    var john = helpers.data.getUserNatural();
    var instantConversion;
    var quotedConversion;
    var quote;

    before(function (done) {
        api.Users.create(john, function () {
            done();
        });
    });

    describe('Create Quote', function () {
        before(function (done) {
            helpers.getNewQuote(api, function (data, response) {
                quote = data;
                done();
            });
        });

        it('should be created', function () {
            expect(quote.Id).not.to.be.null;
            expect(quote.ExpirationDate).not.to.be.null;
            expect(quote.Status).to.equal("ACTIVE");
        });
    });

    describe('Get Quote', function () {
        var fetchedQuote;
        before(function (done) {
            api.Conversions.getQuote(quote.Id, function (data, response) {
                fetchedQuote = data;
                done();
            });
        });

        it('should be fetched', function () {
            expect(fetchedQuote.Id).to.equal(quote.Id);
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
        before(function (done) {
            var creditedWallet = {
                Owners: [john.Id],
                Currency: 'GBP',
                Description: 'WALLET IN GBP'
            };
            var debitedWallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(debitedWallet).then(function (data) {
                api.Wallets.create(creditedWallet).then(function (data) {
                    helpers.getUserCardPreAuthorization(api, john, function(preauthorization, response){
                        var payIn = {
                            CreditedWalletId: debitedWallet.Id,
                            AuthorId: john.Id,
                            DebitedFunds: {
                                Amount: 1000,
                                Currency: 'EUR'
                            },
                            Fees: {
                                Amount: 0,
                                Currency: 'EUR'
                            },
                            CardId: preauthorization.CardId,
                            SecureModeReturnURL: 'http://test.com',
                            PaymentType: 'CARD',
                            ExecutionType: 'DIRECT',
                            Billing: {
                                FirstName: "John",
                                LastName: "Doe",
                                Address: {
                                    "AddressLine1": "4101 Reservoir Rd NW",
                                    "AddressLine2": "",
                                    "City": "Washington",
                                    "Region": "District of Columbia",
                                    "PostalCode": "68400",
                                    "Country": "US"
                                }
                            },
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
                            IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
                        };
                        api.PayIns.create(payIn, function () {
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

        it('should be created', function () {
            expect(instantConversion.DebitedFunds.Amount).not.to.be.null;
            expect(instantConversion.CreditedFunds.Amount).not.to.be.null;
            expect(instantConversion.Status).to.equal('SUCCEEDED');
        });
    });

    describe('Create Quoted Conversion', function () {
        before(function (done) {
            var creditedWallet = {
                Owners: [john.Id],
                Currency: 'GBP',
                Description: 'WALLET IN GBP'
            };
            var debitedWallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(debitedWallet).then(function (data) {
                api.Wallets.create(creditedWallet).then(function (data) {
                    helpers.getUserCardPreAuthorization(api, john, function(preauthorization, response){
                        var payIn = {
                            CreditedWalletId: debitedWallet.Id,
                            AuthorId: john.Id,
                            DebitedFunds: {
                                Amount: 1000,
                                Currency: 'EUR'
                            },
                            Fees: {
                                Amount: 0,
                                Currency: 'EUR'
                            },
                            CardId: preauthorization.CardId,
                            SecureModeReturnURL: 'http://test.com',
                            PaymentType: 'CARD',
                            ExecutionType: 'DIRECT',
                            Billing: {
                                FirstName: "John",
                                LastName: "Doe",
                                Address: {
                                    "AddressLine1": "4101 Reservoir Rd NW",
                                    "AddressLine2": "",
                                    "City": "Washington",
                                    "Region": "District of Columbia",
                                    "PostalCode": "68400",
                                    "Country": "US"
                                }
                            },
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
                            IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
                        };
                        api.PayIns.create(payIn, function () {
                            helpers.getNewQuote(api, function (data, response) {
                                quote = data;

                                var quotedConversionBody = {
                                    QuoteId: quote.Id,
                                    AuthorId: john.Id,
                                    CreditedWalletId: creditedWallet.Id,
                                    DebitedWalletId: debitedWallet.Id,
                                    Tag: 'Quoted conversion test'
                                };

                                api.Conversions.createQuotedConversion(quotedConversionBody, function (data, response) {
                                    quotedConversion = data;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it('should be created', function () {
            expect(quotedConversion.Id).not.to.be.null;
            expect(quotedConversion.QuoteId).not.to.be.null;
            expect(quotedConversion.Status).to.equal('SUCCEEDED');
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
