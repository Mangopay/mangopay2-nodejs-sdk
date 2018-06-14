var _ = require('underscore');
var path = require('path');
var Promise = require('promise');
var expect = require('chai').expect;
var assert = require('chai').assert;
var os = require('os');

var helpers = require('../helpers');

var Mandate = require('../../lib/models/Mandate');
var UserNatural = require('../../lib/models/UserNatural');
var BankAccount = require('../../lib/models/BankAccount');
var BankAccountDetailsIBAN = require('../../lib/models/BankAccountDetailsIBAN');
var Wallet = require('../../lib/models/Wallet');
var PayIn = require('../../lib/models/PayIn');

describe('Mandates', function() {
    var ibanAccount, mandate;
    var john = new UserNatural(_.extend(helpers.data.getUserNatural()));

    before(function(done){
        api.Users.create(john).then(function(data){
            john = data;

            var account = new BankAccount({
                OwnerName: john.FirstName + ' ' + john.LastName,
                OwnerAddress: john.Address,
                Details: new BankAccountDetailsIBAN({
                    IBAN: 'FR7618829754160173622224154',
                    BIC: 'CMBRFR2BCME'
                })
            });

            api.Users.createBankAccount(john.Id, account).then(function(data){
                ibanAccount = data;

                mandate = new Mandate({
                    Tag: 'custom meta',
                    BankAccountId: ibanAccount.Id,
                    Culture: 'EN',
                    ReturnURL: 'http://www.my-site.com/returnURL/'
                });

                api.Mandates.create(mandate, function(data){
                    mandate = data;
                    done();
                });

            });
        });
    });

    it('should be created with the right properties', function(){
        expect(mandate.Id).not.to.be.undefined;
        expect(mandate.BankAccountId).to.equal(ibanAccount.Id);
        expect(mandate.MandateType).to.equal('DIRECT_DEBIT');
        expect(mandate.ExecutionType).to.equal('WEB');
        expect(mandate.ReturnURL).to.equal('http://www.my-site.com/returnURL/?MandateId=' + mandate.Id);
        expect(mandate.Tag).to.equal('custom meta');
        expect(mandate.Status).to.equal('CREATED');
    });

    describe('Get created mandate', function() {
        before(function(done){
            api.Mandates.get(mandate.Id, function(data){
                mandate = data;
                done();
            });
        });

        it('should be received with the right properties', function(){
            expect(mandate.Id).not.to.be.undefined;
            expect(mandate.BankAccountId).to.equal(ibanAccount.Id);
            expect(mandate.MandateType).to.equal('DIRECT_DEBIT');
            expect(mandate.ExecutionType).to.equal('WEB');
            expect(mandate.ReturnURL).to.equal('http://www.my-site.com/returnURL/?MandateId=' + mandate.Id);
            expect(mandate.Tag).to.equal('custom meta');
            expect(mandate.Status).to.equal('CREATED');
        });
    });

    describe('Get all mandates', function() {
        var mandates;

        before(function(done){
            api.Mandates.getAll(function(data){
                mandates = data;
                done();
            });
        });

        it('should be retrieve at least one mandate', function(){
            expect(mandates.length).to.be.above(1);
        });
    });

    describe('Cancel a mandate before being approved it - CREATED status', function() {
        var cancelResponse;
        before(function(done){
            api.Mandates.cancel(mandate.Id, function(data){
                cancelResponse = data;
                done();
            });
        });

        it('shouldn\'t be able to cancel a mandate with the status "CREATED"', function(){
            expect(cancelResponse.Type).to.equal('mandate_cannot_be_cancelled');
        });
    });

    describe('Create DirectDebit Direct Payin before being approved - "CREATED" status', function() {
        var payIn, wallet;

        before(function(done){
            wallet = new Wallet({
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            });

            api.Wallets.create(wallet).then(function(data){
                wallet = data;

                payIn = new PayIn({
                    CreditedWalletId: wallet.Id,
                    AuthorId: john.Id,
                    DebitedFunds: {
                        Amount: 10000,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 0,
                        Currency: 'EUR'
                    },
                    PaymentType: 'DIRECT_DEBIT',
                    ExecutionType: 'DIRECT',
                    MandateId: mandate.Id
                });

                api.PayIns.create(payIn, function(data) {
                    payIn = data;
                    done();
                });
            });
        });

        it('should be created successfully but with "FAILED" status', function(){
            expect(payIn.AuthorId).to.equal(john.Id);
            expect(payIn.CreditedUserId).to.equal(john.Id);
            expect(payIn.CreditedWalletId).to.equal(wallet.Id);
            expect(payIn.Status).to.equal('FAILED');
        });
    });

    /**
     * Check if the OS platform has a GUI ( MacOS / Windows ) and if the tests are running
     * in debugging mode. Otherwise this test cannot run, since a user action is required
     * inside the browser, for approving the Mandate (clicking the "CONFIRM" button)
     */
    if ((os.platform() === 'darwin' || os.platform() === 'win32') && process.execArgv && process.execArgv[0] && process.execArgv[0].match(/--debug-brk/)) {
        describe('After approving the mandate', function() {
            before(function(done){
                /**
                 * ! IMPORTANT NOTE !
                 *
                 * In order to make this test pass debugging mode is required to stop at the breakpoint below
                 * and navigate to URL the mandate.RedirectURL property points to and click "CONFIRM" button.
                 *
                 * The command above is supposed to open your default browser window with that link for you:
                 */
                var spawn = require('child_process').spawn;
                spawn('open',  [mandate.RedirectURL]);

                debugger;
                done();
            });

            describe('Create DirectDebit Direct Payin after being approved', function() {
                var payIn, wallet;

                before(function(done){
                    wallet = new Wallet({
                        Owners: [john.Id],
                        Currency: 'EUR',
                        Description: 'WALLET IN EUR'
                    });

                    api.Wallets.create(wallet).then(function(data){
                        wallet = data;

                        payIn = new PayIn({
                            CreditedWalletId: wallet.Id,
                            AuthorId: john.Id,
                            DebitedFunds: {
                                Amount: 10000,
                                Currency: 'EUR'
                            },
                            Fees: {
                                Amount: 0,
                                Currency: 'EUR'
                            },
                            PaymentType: 'DIRECT_DEBIT',
                            ExecutionType: 'DIRECT',
                            MandateId: mandate.Id
                        });

                        api.PayIns.create(payIn, function(data) {
                            payIn = data;
                            done();
                        });
                    });
                });

                it('should be created successfully but with the right status', function(){
                    expect(payIn.AuthorId).to.equal(john.Id);
                    expect(payIn.CreditedUserId).to.equal(john.Id);
                    expect(payIn.CreditedWalletId).to.equal(wallet.Id);
                    expect(payIn.MandateId).to.equal(mandate.Id);
                    expect(payIn.Status).to.equal('CREATED');
                });
            });

            describe('Cancel a mandate after being confirmed', function() {
                var cancelResponse;

                before(function(done){
                    api.Mandates.cancel(mandate.Id, function(data){
                        cancelResponse = data;
                        done();
                    });
                });

                it('should set the mandate status to "FAILED"', function(){
                    expect(cancelResponse.Status).to.equal('FAILED');
                });
            });
        });
    }

    describe('Get Transactions', function() {
        var getTransactions;

        before(function(done) {
            api.Mandates.getTransactions(mandate.Id, function(data) {
                getTransactions = data;
                done();
            });
        });

        it('should be retrieved', function() {
            expect(getTransactions).not.to.be.undefined;
            expect(getTransactions).to.be.an('array');
        });
    });
});