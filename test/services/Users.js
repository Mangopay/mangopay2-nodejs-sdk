var _ = require('underscore');
var Promise = require('promise');
var expect = require('chai').expect;
var assert = require('chai').assert;

var helpers = require('../helpers');

var UserLegal = require('../../lib/models/UserLegal');
var UserNatural = require('../../lib/models/UserNatural');
var PersonType = require('../../lib/models/PersonType');

describe('Users', function() {
    var john = new UserNatural(helpers.data.UserNatural);
    var matrix = new UserLegal(helpers.data.UserLegal);

    before(function(done){
        Promise.all([api.Users.create(john), api.Users.create(matrix)]).then(function() {
            done()
        });
    });

    it('Create Natural', function(){
        expect(john.Id).not.to.be.undefined;
        expect(john.PersonType).to.equal(PersonType.Natural);
    });

    it('Create Legal', function() {
        expect(matrix.Id).not.to.be.undefined;
        expect(matrix.PersonType).to.equal(PersonType.Legal);
    });

    it('Create Legal Fails If Required Properties Not Provided', function(done){
        var user = new UserLegal();
        api.Users.create(user).done(function(){
            assert.fail('Request should not succeed');
        }, function(){
            assert.isOk('Our request failed');
            done();
        });
    });

    describe('Get Natural', function() {
        var john1, john2;
        before(function(done){
            Promise.all([api.Users.get(john.Id), api.Users.getNatural(john.Id)]).then(function(res){
                john1 = res[0];
                john2 = res[1];
                done();
            })
        });

        it('John should be the same', function(){
            expect(_.isMatch(john1, john.data)).to.be.true;
            expect(_.isMatch(john2, john.data)).to.be.true;
        });

        it('Fails for Legal User', function(done) {
            api.Users.getNatural(matrix.Id).done(function(){
                assert.fail('Request passed');
                done()
            }, function(){
                assert.isOk('Should fail');
                done();
            });
        });
    });

    describe('Get Legal', function(){
        var matrix1, matrix2;
        before(function(done){
            Promise.all([api.Users.get(matrix.Id), api.Users.getLegal(matrix.Id)]).then(function(res){
                matrix1 = res[0];
                matrix2 = res[1];
                done();
            })
        });

        it('Matrix should be the same', function(){
            expect(_.isMatch(matrix1, matrix.data)).to.be.true;
            expect(_.isMatch(matrix2, matrix.data)).to.be.true;
        });

        it('Fails for Natural User', function(done) {
            api.Users.getNatural(matrix.Id).done(function(){
                assert.fail('Request passed');
                done()
            }, function(){
                assert.isOk('Should fail');
                done();
            });
        });
    });

});