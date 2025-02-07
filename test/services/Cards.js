var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var UserNatural = require('../../lib/models/UserNatural');
var api = require('../main');

describe('Cards', function () {
    var john = new UserNatural(helpers.data.getUserNatural());
    var cardId;

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
                cardId = data.CardId;
                api.Cards.getPreAuthorizations(cardId, function (data, response) {
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

    describe('Get Transactions for Card', function(){
        var getTransactions;

        before(function(done){
            api.Cards.get(cardId, function(data, response){
                api.Cards.getTransactions(data.Fingerprint, function(data, response){
                    getTransactions = data;
                    done();
                });
            });
        });

        it('should be retrieved', function(){
            expect(getTransactions).not.to.be.undefined;
            expect(getTransactions).to.be.an('array');
        });
    });
});
