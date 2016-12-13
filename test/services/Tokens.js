var expect = require('chai').expect;

describe('Tokens', function() {
    var authentication1, authentication2;

    before(function(done){
        api.authorize(function(data){
            authentication1 = data;
            api.authorize(function(data){
                authentication2 = data;
                done();
            });
        });
    });

    it('should have different token values', function(){
        expect(authentication1.access_token).to.not.equal(authentication2.access_token);
    });
});
