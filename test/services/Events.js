var _ = require('underscore');
var expect = require('chai').expect;

var helpers = require('../helpers');

describe('Events', function() {
    var john = helpers.data.getUserNatural();

    before(function(done){
        api.Users.create(john, function(){
            done();
        });
    });

    describe('Get Events List', function () {
        describe('Payin Normal Created', function () {
            var payIn, events;

            before(function(done) {
                helpers.getNewPayInCardWeb(api, john, function(data, response){
                    payIn = data;
                    api.Events.getAll(function(data, response){
                        events = data;
                        done();
                    }, {
                        parameters: {
                            BeforeDate: payIn.CreationDate+10,
                            AfterDate: payIn.CreationDate-10,
                            EventType: 'PAYIN_NORMAL_CREATED'
                        }
                    })
                });
            });

            it('should find created event', function () {
                expect(events.length).to.be.above(0);
                expect(_.findWhere(events, {ResourceId: payIn.Id})).to.exist;
            });
        });

        describe('Payin Normal Succeeded', function () {
            var payIn, events;

            before(function(done) {
                helpers.getNewPayInCardDirect(api, john, function(data, response){
                    payIn = data;
                    api.Events.getAll(function(data, response){
                        events = data;
                        done();
                    }, {
                        parameters: {
                            BeforeDate: payIn.ExecutionDate+10,
                            AfterDate: payIn.CreationDate-10,
                            EventType: 'PAYIN_NORMAL_SUCCEEDED'
                        }
                    })
                });
            });

            it('should find succeeded event', function () {
                expect(events.length).to.be.above(0);
                expect(_.findWhere(events, {ResourceId: payIn.Id})).to.exist;
            });
        });

        describe('Payout Normal Created', function () {
            var payOut, events;

            before(function(done) {
                helpers.getNewPayoutBankWire(api, john, function(data, response){
                    payOut = data;
                    api.Events.getAll(function(data, response){
                        events = data;
                        done();
                    }, {
                        parameters: {
                            BeforeDate: payOut.CreationDate+10,
                            AfterDate: payOut.CreationDate-10,
                            EventType: 'PAYOUT_NORMAL_CREATED'
                        }
                    })
                });
            });

            it('should find payout created event', function () {
                expect(events.length).to.be.above(0);
                expect(_.findWhere(events, {ResourceId: payOut.Id})).to.exist;
            });
        });
    });

    describe('Get KYC Documents', function () {
        var kycDocument, events;
        before(function(done){
            api.Users.createKycDocument(john.Id, {
                Status: 'CREATED',
                Type: 'IDENTITY_PROOF'
            }).then(function(document){
                kycDocument = document;
                api.Events.getAll(function(data, response){
                    events = data;
                    done();
                }, {
                    parameters: {
                        BeforeDate: kycDocument.CreationDate+10,
                        AfterDate: kycDocument.CreationDate-10,
                        EventType: 'KYC_CREATED'
                    }
                });
            });
        });

        it('should find KYC Document event', function () {
            expect(events.length).to.be.above(0);
            expect(_.findWhere(events, {ResourceId: kycDocument.Id})).to.exist;
        });
    });

    // TODO: Remove the .skip() call once Get Events endpoint is fixed on the server.
    describe.skip('Get All Sort By Creation Date', function () {
        var events;
        before(function(done){
            api.Events.getAll(function(data, response){
                events = data;
                done();
            }, {
                parameters: {
                    Sort: 'CreationDate:asc'
                }
            });
        });

        it('should return events sorted', function () {
            expect(events.length).to.be.above(0);
            expect(events[1].Date).to.be.above(events[0].Date);
        });
    });
});