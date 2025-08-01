var expect = require('chai').expect;
var helpers = require('../helpers');
const mangopay = require("../../index");

var api = global.api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

describe('Rate Limits', function () {
    expect(api.rateLimits).to.be.empty;
    var john = helpers.data.getUserNatural();

    before(function (done) {
        api.Users.create(john).then(function () {
            done();
        });
    });

    describe('Exist', function () {
        it('should exist', function () {
            expect(john.Id).to.exist;

            expect(api.rateLimits).not.to.be.empty;
            expect(api.rateLimits.length).to.equal(6);

            expect(api.rateLimits[0].minutesInterval).to.equal(1);
            expect(api.rateLimits[1].minutesInterval).to.equal(5);
            expect(api.rateLimits[2].minutesInterval).to.equal(15);
            expect(api.rateLimits[3].minutesInterval).to.equal(30);
            expect(api.rateLimits[4].minutesInterval).to.equal(60);
            expect(api.rateLimits[5].minutesInterval).to.equal(60 * 24);

            expect(api.rateLimits[0].callsMade).to.be.greaterThan(0);
            expect(api.rateLimits[1].callsMade).to.be.greaterThan(0);
            expect(api.rateLimits[2].callsMade).to.be.greaterThan(0);
            expect(api.rateLimits[3].callsMade).to.be.greaterThan(0);

            expect(api.rateLimits[0].callsRemaining).to.be.greaterThan(0);
            expect(api.rateLimits[1].callsRemaining).to.be.greaterThan(0);
            expect(api.rateLimits[2].callsRemaining).to.be.greaterThan(0);
            expect(api.rateLimits[3].callsRemaining).to.be.greaterThan(0);

            expect(api.rateLimits[0].resetTimeMillis).to.be.greaterThan(0);
            expect(api.rateLimits[1].resetTimeMillis).to.be.greaterThan(0);
            expect(api.rateLimits[2].resetTimeMillis).to.be.greaterThan(0);
            expect(api.rateLimits[3].resetTimeMillis).to.be.greaterThan(0);
        });
    });
});
