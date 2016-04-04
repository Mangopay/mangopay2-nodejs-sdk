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
});