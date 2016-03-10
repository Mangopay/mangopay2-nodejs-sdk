var api = require('../setup').api;
var expect = require('chai').expect;

describe('User Model Test', function() {
    it('should have create function', function(){
        expect(api.Users.create).to.be.a.function;
    });
});