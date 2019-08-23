var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');
var UserLegal = require('../../lib/models/UserLegal');

describe('Get user emoney', function() {
    var john = new UserLegal(helpers.data.getUserLegal());
    var emoney;
    var year = 2019;
    var month = 4;

    before(function(done){
        api.Users.create(john).then(function (data, response) {
            john = data;
            done();
        });
    });

    describe('For year', function () {

        before(function (done) {
            api.Users.getEMoney(john.Id, year).then(function (data) {
                emoney = data;
                done();
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

    describe('For month', function () {
        before(function (done) {
            api.Users.getEMoney(john.Id, year, month).then(function (data) {
                emoney = data;
                done();
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
});

