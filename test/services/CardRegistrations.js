var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Card Registrations', function () {
    var cardRegistration;
    var john = helpers.data.getUserNatural();

    before(function(done){
        api.Users.create(john, function(){
            done();
        });
    });

    describe('Create', function () {
        before(function (done) {
            cardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };
            api.CardRegistrations.create(cardRegistration, function(data, response){
                done();
            });
        });

        it('should be created', function () {
            expect(cardRegistration.Id).not.to.be.undefined;
            expect(cardRegistration.AccessKey).not.to.be.undefined;
            expect(cardRegistration.PreregistrationData).not.to.be.undefined;
            expect(cardRegistration.CardRegistrationURL).not.to.be.undefined;
            expect(cardRegistration.Status).to.equal('CREATED');
            expect(cardRegistration.Currency).to.equal('EUR');
            expect(cardRegistration.UserId).to.equal(john.Id);
        });
    });

    describe('Get', function () {
        var cardRegistrationGet;

        before(function (done) {
            api.CardRegistrations.get(cardRegistration.Id, function(data, response){
                cardRegistrationGet = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(cardRegistrationGet.Id).to.equal(cardRegistration.Id);
            expect(cardRegistrationGet.PreregistrationData).to.equal(cardRegistration.PreregistrationData);
        });
    });

    describe('Update', function () {
        var updatedCardRegistration, newRegistrationData;

        before(function (done) {
            var options = {
                data: {
                    data: cardRegistration.PreregistrationData,
                    accessKeyRef: cardRegistration.AccessKey,
                    cardNumber: '4970101122334422',
                    cardExpirationDate: '1224',
                    cardCvx: '123'
                },
                url: cardRegistration.CardRegistrationURL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            api.method('post', function (data, response) {
                cardRegistration.RegistrationData = Buffer.from(data).toString();
                newRegistrationData = cardRegistration.RegistrationData;
                api.CardRegistrations.update(cardRegistration).then(function(data){
                    updatedCardRegistration = data;
                    done();
                });
            }, options);
        });

        it('should be updated', function () {
            expect(updatedCardRegistration.RegistrationData).to.equal(newRegistrationData);
            expect(updatedCardRegistration.Status).to.equal('VALIDATED');
            expect(updatedCardRegistration.ResultCode).to.equal('000000');
            expect(updatedCardRegistration.CardId).to.not.be.undefined;
        });
    });

    describe('Update Error', function () {
        var newCardRegistration;
        before(function (done) {
            newCardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };

            api.CardRegistrations.create(newCardRegistration, function(data, response){
                newCardRegistration.RegistrationData = 'Wrong-data';
                api.CardRegistrations.update(newCardRegistration, function(data, response){
                    done();
                });
            });
        });

        it('should fail', function () {
            expect(newCardRegistration.ResultCode).not.to.be.undefined;
            expect(newCardRegistration.ResultMessage).not.to.be.undefined;
            expect(newCardRegistration.Status).to.equal('ERROR');
        });
    });

    describe('Cards', function () {
        var card;
        before(function(done) {
            api.Cards.get(cardRegistration.CardId, function(data, response){
                card = data;
                done();
            });
        });

        describe('Check Card Existing', function () {
            it('should be retrieved', function () {
                expect(card.Id).to.not.be.undefined;
                expect(card.Validity).to.equal('UNKNOWN');
            });
        });

        describe('Get By Fingerprint', function() {
            var cards;

            before(function (done) {
                api.Cards.getByFingerprint(card.Fingerprint, function(data, response) {
                    cards = data;
                    done();
                });
            });

            it('should retrieve list', function () {
                expect(cards).to.be.an('array');
                cards.forEach(function (cardByFingerprint) {
                    expect(cardByFingerprint.Fingerprint).to.equal(card.Fingerprint);
                });
            });
        });

        describe('Update', function () {
            var updatedCard;

            before(function(done) {
                updatedCard = {
                    Id: card.Id,
                    Validity: 'INVALID'
                };
                api.Cards.update(updatedCard, function(data, response){
                    updatedCard = data;
                    done();
                });
            });

            it('should be updated', function () {
                expect(updatedCard.Id).to.equal(card.Id);
                expect(updatedCard.Active).to.be.false;
            });
        });
    });

    describe('Creating Invalid user card registration', function () {
        var newInvalidCardRegistration = {
            UserId: '12345678',
            Currency: 'EUR',
            CardType: 'CB_VISA_MASTERCARD'
          };
        var failedResponse;

        before(function(done) {
          api.CardRegistrations.create(newInvalidCardRegistration)
            .then(function(){
              done('Creating invalid card registration did not failed the promise');
            })
            .catch(function(data, response){
              failedResponse = data;
              done();
            });
        });

        it('should fail', function () {
            expect(failedResponse.Type).to.equal('ressource_not_found');
        });
    });
});
