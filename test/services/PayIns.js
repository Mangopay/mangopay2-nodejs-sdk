var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;

var helpers = require('../helpers');

describe('PayIns', function() {
    var john = helpers.data.UserNatural;
    john.PersonType = 'NATURAL';
    var payIn;

    before(function(done){
        api.Users.create(john, function(){
            done();
        });
    });

    describe('Card Web', function(){
        before(function(done){
            helpers.getNewPayInCardWeb(api, john, function(data, response){
                payIn = data;
                done();
            });
        });

        describe('Create Card Web', function(){
            it('should create the PayIn', function(){
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('CARD');
                expect(payIn.ExecutionType).to.equal('WEB');
            });
        });

        describe('Get Card Web', function(){
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
});