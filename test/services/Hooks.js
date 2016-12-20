var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Hooks', function() {
    var hook;

    describe('Create', function () {
        before(function (done) {
            api.Hooks.getAll(function(data, response){
                if (data.length) {
                    hook = data[0];
                    done();
                } else {
                    api.Hooks.create({
                        EventType: 'PAYIN_NORMAL_CREATED',
                        Url: 'http://test.com'
                    }, function(data, response){
                        hook = data;
                        done()
                    });
                }
            });
        });

        it('should be created', function () {
            expect(hook.Id).to.exist;
        });
    });

    describe('Get', function () {
        var getHook;
        before(function (done) {
            api.Hooks.get(hook.Id, function(data, response){
                getHook = data;
                done();
            });
        });

        it('should be the same as the created one', function () {
            expect(getHook.Id).to.equal(hook.Id);
        });
    });

    describe('Update', function () {
        var updatedHook;
        var newUrl = 'http://test123.com?_t=' + new Date().getTime();
        before(function (done) {
            hook.Url = newUrl;
            api.Hooks.update(hook, function(data, response){
                updatedHook = data;
                done();
            });
        });

        it('should be updated', function () {
            expect(updatedHook.Url).to.equal(newUrl);
        });
    });
});
