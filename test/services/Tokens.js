var expect = require('chai').expect;
var mangopay = require('../../index');

describe('Tokens', function() {
    var authentication1, authentication2;

    before(function(done){
        api.authorize()
            .then(function(data){
                authentication1 = data;
                api.authorize()
                    .then(function(data){
                        authentication2 = data;
                        done();
                    });
            });
    });

    it('should have different token values', function(){
        expect(authentication1.access_token).to.not.equal(authentication2.access_token);
    });
});

describe('When trying to authenticate with wrong credentials', function() {
    var wrongCredentialsError;

    before('Build API object with wrong credentials', function(done){
        var wrongApi = new mangopay({
            clientId: 'sdk-unit-tests',
            clientApiKey: 'wrongPass'
        });

        wrongApi.authorize()
            .then(function(){
                done('Promise should not pass');
            })
            .catch(function(data) {
                wrongCredentialsError = data;
                done();
            })
    });

    it('should have the right error message', function(){
        expect(wrongCredentialsError.error).to.equal('invalid_client');
    })
});
