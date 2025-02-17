var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');
const UserNatural = require("../../lib/models/UserNatural");

describe('IdentityVerifications', function () {
    var john = new UserNatural(helpers.data.getUserNatural());
    var identityVerification;

    before(function (done) {
        api.Users.create(john).then(function (data, response) {
            john = data;
            const identityVerificationCreate = {
                "ReturnUrl": "https://example.com",
                "Tag": "Created using the NodeJS SDK"
            };

            api.IdentityVerifications.create(john.Id, identityVerificationCreate).then(function (data, response) {
                identityVerification = data;
                done();
            });
        });
    });

    describe('Create', function () {
        it('should be created', function () {
            expect(identityVerification).not.to.be.undefined;
            expect(identityVerification.HostedUrl).not.to.be.undefined;
            expect(identityVerification.ReturnUrl).not.to.be.undefined;
            expect(identityVerification.Status).to.equal("PENDING");
        });
    });

    describe('Get', function () {
        var fetched;

        before(function (done) {
            api.IdentityVerifications.get(identityVerification.Id).then(function (data, response) {
                fetched = data;
                done();
            });
        });

        it('should be fetched', function () {
            expect(fetched).not.to.be.undefined;
            expect(fetched.HostedUrl).to.equal(identityVerification.HostedUrl);
            expect(fetched.ReturnUrl).to.equal(identityVerification.ReturnUrl);
            expect(fetched.Status).to.equal(identityVerification.Status);
        });
    });
});
