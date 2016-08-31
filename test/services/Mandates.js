var _ = require('underscore');
var path = require('path');
var Promise = require('promise');
var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');

var helpers = require('../helpers');

var Mandate = require('../../lib/models/Mandate');
var UserNatural = require('../../lib/models/UserNatural');
var BankAccount = require('../../lib/models/BankAccount');


describe('Mandates', function() {
    var john = new UserNatural(helpers.data.UserNatural);

    before(function(done){
        api.Users.create(john).then(function(data, response){
            done()
        });
    });

    it('Create Natural', function(){
        expect(john.Id).not.to.be.undefined;
        expect(john.PersonType).to.equal(PersonType.Natural);
    });
});