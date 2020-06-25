var expect = require('chai').expect;
var helpers = require('../helpers');

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
            helpers.getNewPayInCardWeb(api, john, function(data){
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
});
