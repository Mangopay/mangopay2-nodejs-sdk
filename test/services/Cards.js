var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var UserNatural = require('../../lib/models/UserNatural');

describe('Cards', function () {
    var john = new UserNatural(helpers.data.getUserNatural());

    before(function (done) {
        api.Users.create(john).then(function (data, response) {
            john = data;
            done();
        });
    });

    describe('Get PreAuthorizations', function () {
        var getPreAuthorizations;

        before(function (done) {
            helpers.getNewPayInCardDirect(api, john, function (data) {
                api.Cards.getPreAuthorizations(data.CardId, function (data, response) {
                    getPreAuthorizations = data;
                    done();
                });
            });
        });

        it('should be retrieved', function () {
            expect(getPreAuthorizations).not.to.be.undefined;
            expect(getPreAuthorizations).to.be.an('array');
        });
    });
});