var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');
const UserNatural = require("../../lib/models/UserNatural");

describe('IdentityVerifications', function () {

    describe('Create', function () {
        var john = new UserNatural(helpers.data.getUserNatural());
        var identityVerification;

        before(function (done) {
            const identityVerificationCreate = {
                "ReturnUrl": "https://example.com",
                "Tag": "Created using the NodeJS SDK"
            };

            api.Users.create(john).then(function (data, response) {
                john = data;
                api.IdentityVerifications.create(john.Id, identityVerificationCreate).then(function (data, response) {
                    identityVerification = data;
                    done();
                });
            });
        });

        it('should be created', function () {
            expect(identityVerification).not.to.be.undefined;
            expect(identityVerification.HostedUrl).not.to.be.undefined;
            expect(identityVerification.ReturnUrl).not.to.be.undefined;
            expect(identityVerification.Status).to.equal("PENDING");
        });
    });
});
