var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;

var helpers = require('../helpers');

describe('PayIns', function() {
    var john = helpers.data.UserNatural;
    john.PersonType = 'NATURAL';
    var wallet, payIn;

    before(function(done){
        api.Users.create(john, function(){
            helpers.getNewPayInCardWeb(api, john, function(data, response){
                payIn = data;
                done();
            });
        });
    });

    it('should create the payin', function(){
        expect(payIn.Id).not.to.be.undefined;
        expect(payIn.PaymentType).to.equal('CARD');
    })
});