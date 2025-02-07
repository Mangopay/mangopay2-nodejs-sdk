var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');

describe('VirtualAccounts', function() {
    var john = helpers.data.getUserNatural();
    var wallet;
    var virtualAccount;

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
        before(function(done){
            var virtualAccountCreate = {
                Country: 'FR',
                VirtualAccountPurpose: 'Collection',
                Tag: 'create virtual account tag'
            };

            api.VirtualAccounts.create(wallet.Id, virtualAccountCreate).then(function(data){
                virtualAccount = data;
                done();
            });
        });

        it('should be correctly created', function () {
            expect(virtualAccount.Id).to.not.be.null;
            expect(wallet.Id).to.equal(virtualAccount.WalletId);
        });
    });

    describe('Get', function () {
        var getVirtualAccount;

        before(function(done){
            api.VirtualAccounts.get(wallet.Id, virtualAccount.Id).then(function(data){
                getVirtualAccount = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(virtualAccount.Id).to.equal(getVirtualAccount.Id);
        });
    });

    describe('Get All', function () {
        var allVirtualAccounts;

        before(function(done){
            api.VirtualAccounts.getAll(wallet.Id).then(function(data){
                allVirtualAccounts = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(allVirtualAccounts.length).to.equal(1);
        });
    });

    describe('Deactivate', function () {
        var deactivatedVirtualAccount;

        before(function(done){
            api.VirtualAccounts.deactivate(wallet.Id, virtualAccount.Id).then(function(data){
                deactivatedVirtualAccount = data;
                done();
            });
        });

        it('should be correctly created', function () {
            expect(deactivatedVirtualAccount.Active).to.equal(false);
        });
    });

    describe.skip('Get Availabilities', function () {
        // TODO
        console.warn("Skipped because of API issues. To be enabled after API is fixed.");
        var availabilities;

        before(function(done){
            api.VirtualAccounts.getAvailabilities().then(function(data){
                availabilities = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(availabilities.Collection.length).to.greaterThan(0);
            expect(availabilities.UserOwned.length).to.greaterThan(0);
        });
    });
});
