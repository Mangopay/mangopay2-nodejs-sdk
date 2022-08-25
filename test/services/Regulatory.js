var expect = require('chai').expect;

describe('Regulatory', function() {

    describe('Get Authorizations For One Country', function () {
        var countryAuthorization;

        before(function(done){
            api.Regulatory.getCountryAuthorizations("FR", function(data, response){
                countryAuthorization = data;
                done();
            });
        });

        it('should be returned', function () {
            expect(countryAuthorization).not.to.be.undefined;
            expect(countryAuthorization.CountryCode).not.to.be.undefined;
            expect(countryAuthorization.CountryName).not.to.be.undefined;
            expect(countryAuthorization.Authorization).not.to.be.undefined;
            expect(countryAuthorization.LastUpdate).not.to.be.undefined;
        });
    });

    describe('Get Authorizations For All Countries', function () {
        var countryAuthorizations;

        before(function(done){
            api.Regulatory.getAllCountriesAuthorizations(function(data, response){
                countryAuthorizations = data;
                done();
            });
        });

        it('should be returned', function () {
            expect(countryAuthorizations).not.to.be.undefined;
            expect(countryAuthorizations).not.to.be.empty;

            expect(countryAuthorizations[0].CountryCode).not.to.be.undefined;
            expect(countryAuthorizations[0].CountryName).not.to.be.undefined;
            expect(countryAuthorizations[0].Authorization).not.to.be.undefined;
            expect(countryAuthorizations[0].LastUpdate).not.to.be.undefined;
        });
    });
});
