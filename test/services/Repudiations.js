var expect = require('chai').expect;

describe('Repudiations', function() {
    var REPUDIATION_ID = '41631014';

    describe('Get Refunds', function() {
        var getRefunds;

        before(function(done) {
            api.Repudiations.getRefunds(REPUDIATION_ID, function(data, response) {
                getRefunds = data;
                done();
            })
        });

        it('should be retrieved', function() {
            expect(getRefunds).not.to.be.undefined;
            expect(getRefunds).to.be.an('array');
        });
    });
});