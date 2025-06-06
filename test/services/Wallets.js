var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');

describe('Wallets', function() {
    var john = helpers.data.getUserNatural();
    var wallet;

    before(function(done){
        api.Users.create(john).then(function(){
            wallet  = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };
            api.Wallets.create(wallet).then(function(){
                done();
            });
        });
    });

    describe('Create', function () {
        it('should exist', function () {
            expect(wallet.Id).to.exist;
            expect(wallet.Owners).to.contain(john.Id);
        });
    });

    describe('Get', function () {
        var getWallet;

        before(function(done){
            api.Wallets.get(wallet.Id).then(function(data){
                getWallet = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(wallet.Id).to.equal(getWallet.Id);
            expect(wallet.CreationDate).to.equal(getWallet.CreationDate);
        });
    });

    describe('Get Sca', function () {
        var responseError;

        before(function (done) {
            api.Wallets.get(wallet.Id, function (data) {},
                {
                    parameters: {
                        ScaContext: 'USER_PRESENT'
                    },
                    resolveWithFullResponse: true
                })
                .catch(function (error) {
                    responseError = error;
                    done();
                });
        });

        it('redirectUrl should be present on response headers', function () {
            expect(responseError.headers['www-authenticate']).to.contain("PendingUserAction RedirectUrl");
        });
    });

    describe('Save', function () {
        var NEW_DESCRIPTION = 'New description to test';

        before(function(done){
            wallet.description = NEW_DESCRIPTION;
            api.Wallets.update(wallet).then(function(data){
                wallet = data;
                done();
            });
        });

        it('should be correctly updated', function () {
            expect(wallet.Description).to.equal(NEW_DESCRIPTION);
        });
    });

    describe('Transactions', function () {
        var transactions;

        before(function(done){
            helpers.getNewPayInCardWeb(api, john, async function(data){
                // wait 2 seconds for the transactions to be created by the API
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                await delay(2000);

                api.Wallets.getTransactions(data.CreditedWalletId, function(data, response){
                    transactions = data;
                    done();
                }, {
                    // parameters: {
                    //     TYPE: 'PAYIN'
                    // },
                    page: 1,
                    per_page: 50,
                    TYPE: 'PAYIN'
                });
            });
        });

        it('should be correctly updated', function () {
            expect(transactions.length).to.equal(1);
            expect(transactions[0].AuthorId).to.equal(john.Id);
        });
    });

    describe('Transactions Sca', function () {
        var responseError;

        before(function(done){
            api.Wallets.getTransactions(wallet.Id, function(data, response) {}, {
                page: 1,
                per_page: 50,
                ScaContext: 'USER_PRESENT',
                resolveWithFullResponse: true
            })
                .catch(function (error) {
                    responseError = error;
                    done();
                });
        });

        it('redirectUrl should be present on response headers', function () {
            expect(responseError.headers['www-authenticate']).to.contain("PendingUserAction RedirectUrl");
        });
    });
});
