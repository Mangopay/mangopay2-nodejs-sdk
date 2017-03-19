var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Get user emoney', function() {
    var john = helpers.data.getUserNatural();
    var emoney;

    before(function(done){
        api.Users.create(john).then(function(){
            api.Users.getEMoney(john.Id).then(function(data){
                emoney = data;
                done();
            });
        });
    });

    it('should be returned correctly', function () {
        expect(emoney.UserId).to.equal(john.Id);
        expect(emoney.CreditedEMoney.Amount).to.equal(0);
        expect(emoney.CreditedEMoney.Currency).to.equal('EUR');
        expect(emoney.DebitedEMoney.Amount).to.equal(0);
        expect(emoney.DebitedEMoney.Currency).to.equal('EUR');
    });
});
