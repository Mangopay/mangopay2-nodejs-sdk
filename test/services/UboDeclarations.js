var expect = require('chai').expect;
var helpers = require('../helpers');

var UboDeclaration = require('../../lib/models/UboDeclaration');
var UboDeclarationStatus = require('../../lib/models/UboDeclarationStatus');
var UserNatural = require('../../lib/models/UserNatural');
var UserLegal = require('../../lib/models/UserLegal');
var mangopay = require('../../lib/mangopay');

var api = global.api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

describe('UBO Declarations', function () {
    var company = new UserLegal(helpers.data.getUserLegal());
    var ubo = new UserNatural(helpers.data.getDeclarativeUserNatural());
    var uboDeclaration = new UboDeclaration();

    before(function (done) {
        api.Users.create(company, function (data, response) {
            company = data;
            api.Users.create(ubo, function (data, response) {
                ubo = data;
                uboDeclaration.DeclaredUBOs = [ubo.Id];
                api.Users.createUboDeclaration(company.Id, uboDeclaration, function (data, response) {
                    uboDeclaration = data;
                    done();
                });
            });
        });
    });

    describe('Get', function () {
        var getDeclaration;

        before(function (done) {
            api.UboDeclarations.get(uboDeclaration.Id, function (data, response) {
                getDeclaration = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(getDeclaration).not.to.be.null;
            expect(getDeclaration.Id).to.equal(uboDeclaration.Id);
        });
    });

    describe('Update', function () {
        var updatedDeclaration;

        before(function (done) {
            uboDeclaration.Status = UboDeclarationStatus.ValidationAsked;

            api.UboDeclarations.update(uboDeclaration, function (data, response) {
                updatedDeclaration = data;
                done();
            });
        });

        it('should be updated', function() {
            expect(updatedDeclaration).not.to.be.null;
            expect(updatedDeclaration.Status).to.equal(UboDeclarationStatus.ValidationAsked);
        });
    });
});