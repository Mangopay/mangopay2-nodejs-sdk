var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Refunds', function() {
    var john = helpers.data.getUserNatural();
    var wallet, secondWallet, transfer, cardRegistration, card;

    before('Create a wallet with money, one without money, and a transfer', function(done){
        api.Users.create(john).then(function(){
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };
            secondWallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };
            cardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };
            api.Wallets.create(wallet).then(function(){
                api.CardRegistrations.create(cardRegistration, function(){
                    helpers.getPaylineCorrectRegistartionData(cardRegistration, function(data, response){
                        cardRegistration.RegistrationData = data;
                        api.CardRegistrations.update(cardRegistration).then(function(data){
                            cardRegistration = data;
                            api.Cards.get(cardRegistration.CardId, function(data, response){
                                card = data;
                                api.PayIns.create({
                                    CreditedWalletId: wallet.Id,
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
                                }, function(data, response){
                                    api.Wallets.create(secondWallet).then(function(){
                                        api.Transfers.create({
                                            AuthorId: john.Id,
                                            Tag: 'DefaultTag',
                                            CreditedUserId: john.Id,
                                            DebitedFunds: {
                                                Currency: 'EUR',
                                                Amount: 1
                                            },
                                            Fees: {
                                                Currency: 'EUR',
                                                Amount: 0
                                            },
                                            DebitedWalletId: wallet.Id,
                                            CreditedWalletId: secondWallet.Id
                                        }, function(data, response){
                                            transfer = data;
                                            done();
                                        });
                                    });
                                });
                            });
                        })
                    });
                });
            });
        });
    });

    describe('Get for transfer', function () {
        var refund;
        before(function(done){
            refund = {
                DebitedWalletId: transfer.DebitedWalletId,
                CreditedWalletId: transfer.CreditedWalletId,
                AuthorId: john.Id,
                DebitedFunds: {
                    Amount: transfer.DebitedFunds.Amount,
                    Currency: transfer.DebitedFunds.Currency
                },
                Fees: {
                    Amount: transfer.Fees.Amount,
                    Currency: transfer.DebitedFunds.Currency
                }
            };
            api.Transfers.createRefund(transfer.Id, refund, function(data, response){
                refund = data;
                done();
            });
        });

        it('should be refunded', function () {
            expect(refund.InitialTransactionId).to.equal(transfer.Id);
            expect(refund.AuthorId).to.equal(john.Id);
            expect(refund.Type).to.equal('TRANSFER');
            expect(refund.Nature).to.equal('REFUND');
        });
    });
});
