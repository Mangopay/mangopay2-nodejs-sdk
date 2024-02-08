var expect = require('chai').expect;
var api = require('../main');

var helpers = require('../helpers');
var mangopay = require('../../index');

var api = global.api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

describe('Idempotency', function () {
    var idempotencyKey = helpers.generateRandomString();

    describe('Get Valid Response', function () {
        var validIdempotencyResponse;
        var payIn;
        var john = helpers.data.getUserNatural();

        before(function (done) {
            api.Users.create(john, function () {
                done();
            });
        });

        before(function (done) {
            helpers.getNewPayInCardWebWithIdempotencyKey(api, john, idempotencyKey, function (data, response) {
                payIn = data;
                done();
            });
        });

        before(function (done) {
            api.Idempotency.get(idempotencyKey, function (data, response) {
                validIdempotencyResponse = data;
                done();
            });
        });

        it('should get the Valid Idempotency Response', function () {
            expect(validIdempotencyResponse.StatusCode).to.equal('200');
            expect(validIdempotencyResponse.Resource).to.exist;
        });
    });

});
