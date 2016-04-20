var _ = require('underscore');
var expect = require('chai').expect;

var helpers = require('../helpers');

describe('Events', function() {
    var john = helpers.data.UserNatural;

    before(function(done){
        api.Users.create(john, function(){
            done();
        });
    });

    describe('Get Events List', function () {
        describe('Payin Normal Created', function () {
            var payIn, events;

            before(function (done) {
                helpers.getNewPayInCardWeb(api, john, function(data, response){
                    payIn = data;
                    api.Events.getAll(function(data, response){
                        events = data;
                        done();
                    }, {
                        parameters: {
                            BeforeDate: payIn.CreationDate+10,
                            AfterDate: payIn.CreationDate-10,
                            EventType: 'PAYIN_NORMAL_CREATED',
                            per_page: 100
                        }
                    })
                });
            });

            it('should be created', function () {
                expect(events.length).to.be.above(0);
                expect(_.findWhere(events, {ResourceId: payIn.Id})).to.exist;
            });
        });
    });
});