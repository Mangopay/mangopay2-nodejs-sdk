var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Transfers', function() {
    var john = helpers.data.getUserNatural();
    var wallet, secondWallet, transfer;

    before(function(done){
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
            api.Wallets.create(wallet).then(function(){
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
    });

    describe('Create', function () {
        it('should not happen because of insufficient funds', function () {
            expect(transfer.Status).to.equal('FAILED');
            expect(transfer.CreditedUserId).to.equal(john.Id);
            expect(transfer.DebitedWalletId).to.equal(wallet.Id);
            expect(transfer.CreditedWalletId).to.equal(secondWallet.Id);
        });
    });

    describe('Get Refunds', function() {
        var getRefunds;

        before(function(done) {
            api.Transfers.getRefunds(transfer.Id, function(data, response) {
                getRefunds = data;
                done();
            });
        });

        it('should be retrieved', function() {
            expect(getRefunds).not.to.be.undefined;
            expect(getRefunds).to.be.an('array');
        });
    });
});
