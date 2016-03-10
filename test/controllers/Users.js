var api = require('../setup').api;
var expect = require('chai').expect;

describe('User Controller Test', function() {
    it('should exist', function(){
        expect(api.Users).not.to.be.undefined;
    });
});