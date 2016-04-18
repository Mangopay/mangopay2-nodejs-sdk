var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;

var helpers = require('../helpers');

describe('PayIns', function() {
    var john = helpers.data.UserNatural;
    john.PersonType = 'NATURAL';

    before(function(done){
        api.Users.create(john, function(){
            done();
        });
    });

    describe('Card Web', function(){
        var payIn;

        before(function(done){
            helpers.getNewPayInCardWeb(api, john, function(data, response){
                payIn = data;
                done();
            });
        });

        describe('Create', function(){
            it('should create the PayIn', function(){
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('CARD');
                expect(payIn.ExecutionType).to.equal('WEB');
            });
        });

        describe('Get', function(){
            var getPayIn;
            before(function(done){
                api.PayIns.get(payIn.Id, function(data, response){
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function(){
                expect(getPayIn.Id).not.to.be.undefined;
                expect(getPayIn.PaymentType).to.equal('CARD');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Status).to.equal('CREATED');
                expect(getPayIn.ExecutionDate).to.be.null;
                expect(getPayIn.RedirectURL).not.to.be.undefined;
                expect(getPayIn.ReturnURL).not.to.be.undefined;
            });
        });
    });
    
    describe('Card Direct', function(){
        var payIn;

        before(function(done){
            helpers.getNewPayInCardDirect(api, john, function(data, response){
                payIn = data;
                done();
            });
        });

        describe('Create', function(){
            it('should create the PayIn', function(){
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('CARD');
                expect(payIn.ExecutionType).to.equal('DIRECT');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Status).to.equal('SUCCEEDED');
                expect(payIn.Type).to.equal('PAYIN');
            });
        });

        describe('Get', function(){
            var getPayIn;
            before(function(done){
                api.PayIns.get(payIn.Id, function(data, response){
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function(){
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('CARD');
                expect(getPayIn.ExecutionType).to.equal('DIRECT');
                expect(getPayIn.CardId).not.to.be.null;
            });
        });

        describe('Create Refund', function(){
            var refund;

            before(function(done){
                helpers.getNewRefundForPayIn(api, john, payIn, function(data, response){
                    refund = data;
                    done();
                });
            });

            it('should succeed', function(){
                expect(refund.DebitedFunds).to.eql(payIn.DebitedFunds);
                expect(refund.Type).to.equal('PAYOUT');
                expect(refund.Nature).to.equal('REFUND');
            });
        });
    });


});