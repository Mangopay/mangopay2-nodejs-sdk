var expect = require('chai').expect;

var helpers = require('../helpers');

describe('PayOuts', function() {
    var john = helpers.data.getUserNatural();
    var payOut;

    before(function(done){
        api.Users.create(john, function(){
            done();
        });
    });

    describe('Create', function() {
        before(function(done){
            helpers.getNewPayoutBankWire(api, john, function(data, response){
                payOut = data;
                done();
            });
        });

        it('should be created', function(){
            expect(payOut.Id).to.exist;
            expect(payOut.PaymentType).to.equal('BANK_WIRE');
        });
    });

    describe('Get', function() {
        var getPayOut;

        before(function(done){
            api.PayOuts.get(payOut.Id, function(data, response){
                getPayOut = data;
                done();
            });
        });

        it('should be fetched', function(){
            expect(payOut.Id).to.equal(getPayOut.Id);
            expect(payOut.Status).to.equal('FAILED');
            expect(payOut.ExecutionDate).to.be.null;
        });

        describe('Get Bankwire', function() {
            var getBankwire;

            before(function(done){
                api.PayOuts.getBankwire(payOut.Id, function(data, response){
                    getBankwire = data;
                    done();
                });
            });

            it('should be fetched', function(){
                expect(payOut.Id).to.equal(getPayOut.Id);
                expect(payOut.Status).to.equal('FAILED');
                expect(payOut.ExecutionDate).to.be.null;
                expect(payOut.ModeRequested).to.equal('STANDARD');
            });
        });
    });

    describe('Get Refunds', function() {
        var getRefunds;

        before(function(done) {
            api.PayOuts.getRefunds(payOut.Id, function(data, response) {
                getRefunds = data;
                done();
            });
        });

        it('should be retrieved', function() {
            expect(getRefunds).not.to.be.undefined;
            expect(getRefunds).to.be.an('array');
        })
    })

    describe('Check Eligibility', function() {
        var eligibility;

        before(function(done) {
            helpers.getNewPayoutBankWire(api, john, function(data, response){
                var eligibilityDto = {
                    AuthorId: data.AuthorId,
                    DebitedFunds: data.DebitedFunds,
                    BankAccountId: data.BankAccountId,
                    DebitedWalletId: data.DebitedWalletId,
                    PayoutModeRequested: "INSTANT_PAYMENT"
                };

                api.PayOuts.checkEligibility(eligibilityDto, function(data, response) {
                    eligibility = data;
                    done();
                });
            });
        });

        it('should be retrieved', function() {
            expect(eligibility.InstantPayout).not.to.be.undefined;
            expect(eligibility.InstantPayout.IsReachable).not.to.be.undefined;
            expect(eligibility.InstantPayout.UnreachableReason).not.to.be.undefined; //will be undefined if IsReachable true
        })
    })
});
