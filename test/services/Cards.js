var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var UserNatural = require('../../lib/models/UserNatural');
var api = require('../main');

describe('Cards', function () {
    var john = new UserNatural(helpers.data.getUserNatural());
    var card;
    var cardRegistration;

    before(function (done) {
        api.Users.create(john).then(function (data, response) {
            john = data;

            cardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };

            api.CardRegistrations.create(cardRegistration, function () {
                helpers.getPaylineCorrectRegistartionData(cardRegistration, function (data, response) {
                    cardRegistration.RegistrationData = data;
                    api.CardRegistrations.update(cardRegistration).then(function (data) {
                        cardRegistration = data;
                        api.Cards.get(cardRegistration.CardId, function (data, response) {
                            card = data;
                            done();
                        });
                    });
                });
            });
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

    describe('Get Card Fingerprint Transactions', function () {
        var transactions;

        before(function (done) {
            api.Cards.listCardFingerprintTransactions(card.Fingerprint, function (data, response) {
                    transactions = data;
                    done();
                },
                {
                    parameters: {
                        Status: 'SUCCEEDED',
                        AfterDate: 1622737599
                    }
                }
            );
        });

        it('list should be retrieved', function () {
            expect(transactions).to.be.an('array');
            transactions.forEach(function (transaction) {
                expect(transaction.Id).to.not.null
            });
        });
    });

    describe('Get Card Fingerprint Users', function () {
        var users;

        before(function (done) {
            api.Cards.listCardFingerprintUsers(card.Fingerprint, function (data, response) {
                users = data;
                done();
            });
        });

        it('list should be retrieved', function () {
            expect(users).to.be.an('array');
            users.forEach(function (user) {
                expect(user.id).to.not.null
            });
        });
    });
});
