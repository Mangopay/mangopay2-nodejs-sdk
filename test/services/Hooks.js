var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Hooks', function() {
    var john = helpers.data.UserNatural;
    var hook;

    before(function(done){
        api.Users.create(john).then(function(){
            done();
        });
    });

    describe('Create', function () {
        before(function (done) {
        });

        it('should create', function () {
            expect().to.equal();
        });
    });
});
