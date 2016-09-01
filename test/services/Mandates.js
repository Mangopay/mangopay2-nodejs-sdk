var _ = require('underscore');
var path = require('path');
var Promise = require('promise');
var expect = require('chai').expect;
var assert = require('chai').assert;

var helpers = require('../helpers');

var Mandate = require('../../lib/models/Mandate');
var UserNatural = require('../../lib/models/UserNatural');
var BankAccount = require('../../lib/models/BankAccount');
var BankAccountDetailsIBAN = require('../../lib/models/BankAccountDetailsIBAN');


describe('Mandates', function() {
    var ibanAccount, mandate;
    var john = new UserNatural(helpers.data.UserNatural);

    before(function(done){
        api.Users.create(john).then(function(data, response){
            john = data;

            var account = new BankAccount({
                OwnerName: john.FirstName + ' ' + john.LastName,
                OwnerAddress: john.Address,
                Details: new BankAccountDetailsIBAN({
                    IBAN: 'FR7618829754160173622224154',
                    BIC: 'CMBRFR2BCME'
                })
            });

            api.Users.createBankAccount(john.Id, account).then(function(data){
                ibanAccount = data;

                mandate = new Mandate({
                    Tag: 'custom meta',
                    BankAccountId: ibanAccount.Id,
                    Culture: 'EN',
                    ReturnURL: 'http://www.my-site.com/returnURL/'
                });

                api.Mandates.create(mandate, function(data){
                    mandate = data;
                    done();
                });

            });
        });
    });

    it('should be created with the right properties', function(){
        expect(mandate.Id).not.to.be.undefined;
        expect(mandate.BankAccountId).to.equal(ibanAccount.Id);
        expect(mandate.MandateType).to.equal('DIRECT_DEBIT');
        expect(mandate.ExecutionType).to.equal('WEB');
        expect(mandate.ReturnURL).to.equal('http://www.my-site.com/returnURL/?MandateId=' + mandate.Id);
        expect(mandate.Tag).to.equal('custom meta');
        expect(mandate.Status).to.equal('CREATED');
    });

    describe('Get created mandate', function() {
        before(function(done){
            api.Mandates.get(mandate.Id, function(data){
                mandate = data;
                done();
            });
        });

        it('should be received with the right properties', function(){
            expect(mandate.Id).not.to.be.undefined;
            expect(mandate.BankAccountId).to.equal(ibanAccount.Id);
            expect(mandate.MandateType).to.equal('DIRECT_DEBIT');
            expect(mandate.ExecutionType).to.equal('WEB');
            expect(mandate.ReturnURL).to.equal('http://www.my-site.com/returnURL/?MandateId=' + mandate.Id);
            expect(mandate.Tag).to.equal('custom meta');
            expect(mandate.Status).to.equal('CREATED');
        });
    });

    describe('Get all mandates', function() {
        var mandates;

        before(function(done){
            api.Mandates.getAll(function(data){
                mandates = data;
                done();
            });
        });

        it('should be retrieve at least one mandate', function(){
            expect(mandates.length).to.be.above(1);
        });
    });

    describe('Cancel a mandate with CREATED status', function() {
        var response;
        before(function(done){
            api.Mandates.cancel(mandate.Id, function(data){
                response = data;
                done();
            });
        });

        it('shouldn\'t be able to cancel a mandate with the status "CREATED"', function(){
            expect(response.Type).to.equal('mandate_cannot_be_cancelled');
        });
    });
});