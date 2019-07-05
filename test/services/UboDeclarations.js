var expect = require('chai').expect;
var helpers = require('../helpers');

var UboDeclaration = require('../../lib/models/UboDeclaration');
var Ubo = require('../../lib/models/Ubo');
var UboDeclarationStatus = require('../../lib/models/UboDeclarationStatus');
var UserNatural = require('../../lib/models/UserNatural');
var UserLegal = require('../../lib/models/UserLegal');
var mangopay = require('../../lib/mangopay');

var api = global.api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

describe('UBO Declarations', function () {
    var user = new UserLegal(helpers.data.getUserLegal());
    var uboDeclaration;
    var ubo = new Ubo(helpers.data.getUbo());

    before(function (done) {
        api.Users.create(user, function (data, response) {
            user = data;
            api.UboDeclarations.create(user.Id, function (data, response) {
                uboDeclaration = data;
                api.UboDeclarations.createUbo(user.Id, uboDeclaration.Id, ubo, function (data, response) {
                    ubo = data;
                    done();
                });
            });
        });
    });

    describe('Get', function () {
        var getDeclaration;

        before(function (done) {
            api.UboDeclarations.get(user.Id, uboDeclaration.Id, function (data, response) {
                getDeclaration = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(getDeclaration).not.to.be.null;
            expect(getDeclaration.Id).to.equal(uboDeclaration.Id);
        });
    });

    describe('GetAll', function () {
        var getDeclarations;

        before(function (done) {
            api.UboDeclarations.get(user.Id, uboDeclaration.Id, function (data, response) {
                getDeclarations = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(getDeclarations).not.to.be.null;
        });
    });

    describe('GetUBO', function () {
        var uboResponse;
        before(function (done) {
            api.UboDeclarations.getUbo(user.Id, uboDeclaration.Id, ubo.Id, function (data, response) {
                uboResponse = data;
                done();
            });
        });
        it('should be retrieved', function () {
            expect(uboResponse).not.to.be.null;
            expect(uboResponse.Id).to.equal(ubo.Id);
        });

    });

    describe('UpdateUBO', function () {
        var uboResponse;
        before(function (done) {

            uboResponse = new Ubo(ubo);
            uboResponse.FirstName = 'John_NodejsSDK';
            uboResponse.LastName = 'Michael_NodejsSDK';

            api.UboDeclarations.updateUbo(user.Id, uboDeclaration.Id, uboResponse, function (data, response) {
                uboResponse = data;
                done();
            });
        });
        it('should be updated', function () {
            expect(uboResponse).not.to.be.null;
            expect(uboResponse.Id).to.equal(ubo.Id);
            expect(uboResponse.FirstName).to.equal('John_NodejsSDK');
            expect(uboResponse.LastName).to.equal('Michael_NodejsSDK');
        });
    });

    describe('Update', function () {
        var updatedDeclaration;

        before(function (done) {
            uboDeclaration.Status = UboDeclarationStatus.ValidationAsked;

            api.UboDeclarations.update(user.Id, uboDeclaration, function (data, response) {
                updatedDeclaration = data;
                done();
            });
        });

        it('should be updated', function () {
            expect(updatedDeclaration).not.to.be.null;
            expect(updatedDeclaration.Status).to.equal(UboDeclarationStatus.ValidationAsked);
        });
    });

});