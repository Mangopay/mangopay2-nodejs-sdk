var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;

describe("Clients", function(){
    var client;
    before(function(done){
        api.Clients.get().then(function(data, response){
            client = data;
            done();
        });
    });

    it('Get Client', function(){
        expect(client.ClientId).not.to.be.undefined;
        expect(client.ClientId).to.equal(api.config.clientId);
    });

    describe("Update client", function(){
        var updatedClient;
        var themeColor = '#123456';
        var buttonColor = '#654321';

        before(function(done){
            api.Clients.update({PrimaryThemeColour: themeColor, PrimaryButtonColour: buttonColor})
                .then(function(data, response){
                updatedClient = data;
                done();
            });
        });

        it("should have updated colors", function(){
            expect(updatedClient.ClientId).not.to.be.undefined;
            expect(updatedClient.PrimaryThemeColour).to.equal(themeColor);
            expect(updatedClient.PrimaryButtonColour).to.equal(buttonColor);
        });
    });

    describe("Upload Logo", function(){
        var filePath = path.resolve(__dirname, '../TestKycPageFile.png');
        var requestResponse;
        before(function(done){
            api.Clients.uploadLogoFromFile(filePath, function(data, response){
                requestResponse = response;
                done();
            });
        });

        it('should be uploaded', function(){
            expect(requestResponse.statusCode).to.equal(204);
        });

    });
});
