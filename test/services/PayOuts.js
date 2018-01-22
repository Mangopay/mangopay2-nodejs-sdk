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
});