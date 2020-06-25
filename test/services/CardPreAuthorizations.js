var expect = require('chai').expect;

var helpers = require('../helpers');

describe('Card PreAuthorizations', function() {
    var john = helpers.data.getUserNatural();
    var preAuthorization;

    before(function(done){
        api.Users.create(john, function(){
            done();
        });
    });

    describe('Create', function() {
        before(function(done){
            helpers.getUserCardPreAuthorization(api, john, function(data, response){
                preAuthorization = data;
                done();
            });
        });

        it('should be created', function(){
            expect(preAuthorization.Id).to.exist;
            expect(preAuthorization.Status).to.equal('SUCCEEDED');
            expect(preAuthorization.PaymentStatus).to.equal('WAITING');
            expect(preAuthorization.ExecutionType).to.equal('DIRECT');
            expect(preAuthorization.PayInId).to.be.null;
        });
    });

    describe('Get', function() {
        var getPreAuthorization;

        before(function(done){
            api.CardPreAuthorizations.get(preAuthorization.Id, function(data, response){
                getPreAuthorization = data;
                done();
            });
        });

        it('should be fetched', function(){
            expect(getPreAuthorization.Id).to.equal(preAuthorization.Id);
            expect(getPreAuthorization.ResultCode).to.equal('000000');
        });
    });

    describe('Update', function() {
        var updatedPreAuthorization;

        before(function(done){
            preAuthorization.PaymentStatus = 'CANCELED';

            api.CardPreAuthorizations.update(preAuthorization, function(data, response){
                updatedPreAuthorization = data;
                done();
            });
        });

        it('should be updated', function(){
            expect(updatedPreAuthorization.Status).to.equal('SUCCEEDED');
            expect(updatedPreAuthorization.PaymentStatus).to.equal('CANCELED');
            expect(updatedPreAuthorization.SecurityInfo.AVSResult).to.equal('NO_CHECK');
        });
    });
});
