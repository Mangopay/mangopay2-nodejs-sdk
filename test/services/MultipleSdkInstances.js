const {expect} = require("chai");
const mangopay = require("../../index");

var api_1 = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

var api_2 = new mangopay({
    clientId: 'bad-client',
    clientApiKey: 'bad-key'
});

describe('sdk instances', function () {
    var data1, data2;
    var error;

    before(function (done) {
        api_1.Users.getAll(function (data) {
            data1 = data;
            api_2.Users.getAll(function (data) {
                data2 = data;
                done();
            })
                .catch(function (data) {
                    error = data;
                    done();
                });
        });
    });

    it('should work', function () {
        expect(api_1.config.clientId).not.to.be.eq(api_2.config.clientId);
        expect(api_1.config.clientApiKey).not.to.be.eq(api_2.config.clientApiKey);
        expect(api_1.requestOptions.path.clientId).not.to.be.eq(api_2.requestOptions.path.clientId);

        expect(data1).to.be.an('array');
        expect(data2).to.be.undefined;
        expect(error.error).to.eq("invalid_client");
    });
});