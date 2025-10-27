var _ = require('underscore');
var path = require('path');
var Promise = require('promise');
var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var api = require('../main');

var helpers = require('../helpers');

var UserLegal = require('../../lib/models/UserLegal');
var UserLegalSca = require('../../lib/models/UserLegalSca');
var UserNatural = require('../../lib/models/UserNatural');
var UserNaturalSca = require('../../lib/models/UserNaturalSca');
var Address = require('../../lib/models/Address');
var PersonType = require('../../lib/models/PersonType');
var BankAccount = require('../../lib/models/BankAccount');
var BankAccountDetailsIBAN = require('../../lib/models/BankAccountDetailsIBAN');
var BankAccountDetailsGB = require('../../lib/models/BankAccountDetailsGB');
var KycDocument = require('../../lib/models/KycDocument');
var KycDocumentStatus = require('../../lib/models/KycDocumentStatus');
var KycDocumentType = require('../../lib/models/KycDocumentType');
var UboDeclaration = require('../../lib/models/UboDeclaration');
var Ubo = require('../../lib/models/Ubo');
var UboDeclarationStatus = require('../../lib/models/UboDeclarationStatus');
var UserNaturalPut = require('../../lib/models/UserNaturalPut');
var CategorizeUserNatural = require('../../lib/models/CategorizeUserNatural');
var CategorizeUserLegal = require('../../lib/models/CategorizeUserLegal');

describe('Users', function() {
    var john = new UserNatural(helpers.data.getUserNatural());
    var johnScaOwner = new UserNaturalSca(helpers.data.getUserNaturalScaOwner());
    var johnScaPayer = new UserNaturalSca(helpers.data.getUserNaturalScaPayer());
    var matrix = new UserLegal(helpers.data.getUserLegal());
    var matrixScaOwner = new UserLegalSca(helpers.data.getUserLegalScaOwner());
    var matrixScaPayer = new UserLegalSca(helpers.data.getUserLegalScaPayer());

    var johnPayer = new UserNatural(helpers.data.getUserNaturalPayer());
    var johnOwner = new UserNatural(helpers.data.getUserNaturalOwner());

    var matrixPayer = new UserLegal(helpers.data.getUserLegalPayer());
    var matrixOwner = new UserLegal(helpers.data.getUserLegalOwner());

    before(function(done){
        api.Users.create(john).then(function(data){
            john = data;
            api.Users.create(matrix).then(function(data){
                matrix = data;
                done();
            });
        });
    });

    before(function(done){
        api.Users.create(johnPayer).then(function(data){
            johnPayer = data;
            api.Users.create(johnOwner).then(function(data){
                johnOwner = data;
                done();
            });
        });
    });

    before(function(done){
        api.Users.create(matrixPayer).then(function(data){
            matrixPayer = data;
            api.Users.create(matrixOwner).then(function(data){
                matrixOwner = data;
                done();
            });
        });
    });

    before(function(done){
        api.Users.create(johnScaOwner).then(function(data, err){
            johnScaOwner = data;
            done();
        });
    });

    before(function(done){
        api.Users.create(matrixScaOwner).then(function(data, err){
            matrixScaOwner = data;
            done();
        });
    });

    before(function(done){
        api.Users.create(johnScaPayer).then(function(data, err){
            johnScaPayer = data;
            done();
        });
    });

    before(function(done){
        api.Users.create(matrixScaPayer).then(function(data, err){
            matrixScaPayer = data;
            done();
        });
    });

    it('Create Natural', function(){
        expect(john.Id).not.to.be.undefined;
        expect(john.PersonType).to.equal(PersonType.Natural);
        expect(john.TermsAndConditionsAccepted).to.be.true;
        expect(john.UserCategory).to.equal('OWNER');
    });

    it('Create Natural SCA', function(){
        expect(johnScaOwner.Id).not.to.be.undefined;
        expect(johnScaOwner.PersonType).to.equal(PersonType.Natural);
        expect(johnScaOwner.TermsAndConditionsAccepted).to.be.true;
        expect(johnScaOwner.UserCategory).to.equal('OWNER');
        expect(johnScaOwner.PendingUserAction).not.to.be.undefined;
        expect(johnScaOwner.PhoneNumber).not.to.be.undefined;
        expect(johnScaOwner.PhoneNumberCountry).not.to.be.undefined;
        expect(johnScaOwner.UserStatus).to.equal('PENDING_USER_ACTION');
    });

    it('Create Legal', function() {
        expect(matrix.Id).not.to.be.undefined;
        expect(matrix.PersonType).to.equal(PersonType.Legal);
        expect(matrix.TermsAndConditionsAccepted).to.be.true;
        expect(matrix.UserCategory).to.equal('OWNER');
    });

    it('Create Legal SCA', function() {
        expect(matrixScaOwner.Id).not.to.be.undefined;
        expect(matrixScaOwner.PersonType).to.equal(PersonType.Legal);
        expect(matrixScaOwner.TermsAndConditionsAccepted).to.be.true;
        expect(matrixScaOwner.UserCategory).to.equal('OWNER');
        expect(matrixScaOwner.PendingUserAction).not.to.be.undefined;
        expect(matrixScaOwner.LegalRepresentative).not.to.be.undefined;
    });

    it('Create Natural Payer', function(){
        expect(johnPayer.Id).not.to.be.undefined;
        expect(johnPayer.PersonType).to.equal(PersonType.Natural);
        expect(johnPayer.UserCategory).to.equal('PAYER');
    });

    it('Create Natural Owner', function(){
        expect(johnOwner.Id).not.to.be.undefined;
        expect(johnOwner.PersonType).to.equal(PersonType.Natural);
        expect(johnOwner.UserCategory).to.equal('OWNER');
    });

    it('Create Legal Payer', function() {
        expect(matrixPayer.Id).not.to.be.undefined;
        expect(matrixPayer.PersonType).to.equal(PersonType.Legal);
        expect(matrixPayer.UserCategory).to.equal('PAYER');
    });

    it('Create Legal Owner', function() {
        expect(matrixOwner.Id).not.to.be.undefined;
        expect(matrixOwner.PersonType).to.equal(PersonType.Legal);
        expect(matrixOwner.UserCategory).to.equal('OWNER');
    });

    it('Create Legal Fails If Required Properties Not Provided', function(done){
        var user = new UserLegal();

        api.Users.create(user, function(data){
            expect(data.errors).to.exist;
            done();
        });
    });

    describe('Get Natural', function() {
        var john1, john2;
        before(function(done){
            Promise.all([api.Users.get(john.Id), api.Users.getNatural(john.Id)]).then(function(res){
                john1 = res[0];
                john2 = res[1];
                done();
            })
        });

        it('John should be the same', function(){
            expect(_.isMatch(john1, _.omit(john.data, 'Address'))).to.be.true;
            expect(_.isMatch(john2, _.omit(john.data, 'Address'))).to.be.true;
            expect(john1.TermsAndConditionsAccepted).to.be.true;
            expect(john2.TermsAndConditionsAccepted).to.be.true;
        });

        it('Fails for Legal User', function(done) {
            api.Users.getLegal(john.Id, function(data) {
                expect(data.errors).to.exist;
                done();
            });
        });
    });

    describe('Get Natural SCA', function() {
        var john1, john2;
        before(function (done) {
            Promise.all(
                [api.Users.getSca(johnScaOwner.Id),
                    api.Users.getNaturalSca(johnScaOwner.Id)
                ]).then(function (res) {
                john1 = res[0];
                john2 = res[1];
                done();
            });
        });

        it('John SCA should be the same', function(){
            expect(_.isMatch(john1, _.omit(john.data, 'Address'))).to.be.true;
            expect(_.isMatch(john2, _.omit(john.data, 'Address'))).to.be.true;
            expect(john1.TermsAndConditionsAccepted).to.eq(john2.TermsAndConditionsAccepted);
            expect(john1.Id).to.eq(john2.Id);
            expect(john1.UserStatus).to.eq(john2.UserStatus);
        });
    });

    describe('Get Legal SCA', function() {
        var matrix1, matrix2;
        before(function (done) {
            Promise.all(
                [api.Users.getSca(matrixScaOwner.Id),
                    api.Users.getLegalSca(matrixScaOwner.Id)
                ]).then(function (res) {
                matrix1 = res[0];
                matrix2 = res[1];
                done();
            });
        });

        it('Matrix SCA should be the same', function(){
            expect(matrix1.TermsAndConditionsAccepted).to.eq(matrix2.TermsAndConditionsAccepted);
            expect(matrix1.Id).to.eq(matrix2.Id);
            expect(matrix1.CompanyNumber).to.eq(matrix2.CompanyNumber);
        });
    });

    describe('Get Natural Payer', function() {
        var johnPayer1, johnPayer2;
        before(function(done){
            Promise.all([api.Users.get(johnPayer.Id), api.Users.getNatural(johnPayer.Id)]).then(function(res){
                johnPayer1 = res[0];
                johnPayer2 = res[1];
                done();
            })
        });

        it('John Payer should be the same', function(){
            expect(johnPayer1.Id).to.equal(johnPayer.Id);
            expect(johnPayer2.Id).to.equal(johnPayer.Id);

            expect(johnPayer1.UserCategory).to.equal('PAYER');
            expect(johnPayer2.UserCategory).to.equal('PAYER');
        });
    });

    describe('Get Natural Owner', function() {
        var johnOwner1, johnOwner2;
        before(function(done){
            Promise.all([api.Users.get(johnOwner.Id), api.Users.getNatural(johnOwner.Id)]).then(function(res){
                johnOwner1 = res[0];
                johnOwner2 = res[1];
                done();
            })
        });

        it('John Owner should be the same', function(){
            expect(johnOwner1.Id).to.equal(johnOwner.Id);
            expect(johnOwner2.Id).to.equal(johnOwner.Id);

            expect(johnOwner1.UserCategory).to.equal('OWNER');
            expect(johnOwner2.UserCategory).to.equal('OWNER');
        });
    });

    describe('Get Legal', function(){
        var matrix1, matrix2;
        before(function(done){
            Promise.all([api.Users.get(matrix.Id), api.Users.getLegal(matrix.Id)]).then(function(res){
                matrix1 = res[0];
                matrix2 = res[1];
                done();
            })
        });

        it('Matrix should be the same', function(){
            expect(_.isMatch(matrix1, _.omit(matrix.data, 'HeadquartersAddress', 'LegalRepresentativeAddress'))).to.be.true;
            expect(_.isMatch(matrix2, _.omit(matrix.data, 'HeadquartersAddress', 'LegalRepresentativeAddress'))).to.be.true;
            expect(matrix1.TermsAndConditionsAccepted).to.be.true;
            expect(matrix2.TermsAndConditionsAccepted).to.be.true;
        });

        it('Fails for Natural User', function(done) {
            api.Users.getNatural(matrix.Id, function(data) {
                expect(data.errors).to.exist;
                done();
            });
        });
    });

    describe('Get Legal Payer', function() {
        var matrixPayer1, matrixPayer2;
        before(function(done){
            Promise.all([api.Users.get(matrixPayer.Id), api.Users.getLegal(matrixPayer.Id)]).then(function(res){
                matrixPayer1 = res[0];
                matrixPayer2 = res[1];
                done();
            })
        });

        it('Legal Payer should be the same', function(){
            expect(matrixPayer1.Id).to.equal(matrixPayer.Id);
            expect(matrixPayer2.Id).to.equal(matrixPayer.Id);

            expect(matrixPayer1.UserCategory).to.equal('PAYER');
            expect(matrixPayer2.UserCategory).to.equal('PAYER');
        });
    });

    describe('Get Legal Owner', function() {
        var matrixOwner1, matrixOwner2;
        before(function(done){
            Promise.all([api.Users.get(matrixOwner.Id), api.Users.getLegal(matrixOwner.Id)]).then(function(res){
                matrixOwner1 = res[0];
                matrixOwner2 = res[1];
                done();
            })
        });

        it('Legal Owner should be the same', function(){
            expect(matrixOwner1.Id).to.equal(matrixOwner.Id);
            expect(matrixOwner2.Id).to.equal(matrixOwner.Id);

            expect(matrixOwner1.UserCategory).to.equal('OWNER');
            expect(matrixOwner2.UserCategory).to.equal('OWNER');
        });
    });

    describe('Save Natural', function(){
        var updatedJohn;
        before(function(done){
            john.LastName = john.LastName + " - CHANGED";
            john.TermsAndConditionsAccepted = true;

            api.Users.update(john).then(function(){
                api.Users.get(john.Id).then(function(user){
                    updatedJohn = user;
                    done();
                });
            });
        });

        it('Models should be the same', function() {
            expect(_.isMatch(john.LastName, updatedJohn.LastName)).to.be.true
            expect(updatedJohn.TermsAndConditionsAccepted).to.be.true;
        });
    });

    describe('Save Natural SCA', function(){
        var updatedJohn;
        const changedLastName = johnScaOwner.LastName + " - CHANGED";

        before(function(done){
            johnScaOwner.LastName = changedLastName;

            api.Users.updateSca(johnScaOwner).then(function(){
                api.Users.getSca(johnScaOwner.Id).then(function(user){
                    updatedJohn = user;
                    done();
                });
            });
        });

        it('Models should be the same', function() {
            expect(_.isMatch(johnScaOwner.LastName, updatedJohn.LastName)).to.be.true;
            expect(updatedJohn.LastName).to.be.eq(changedLastName);
        });
    });

    describe('Save Legal SCA', function(){
        var updatedMatrix;
        const changedName = matrixScaOwner.Name + " - CHANGED";

        before(function(done){
            matrixScaOwner.Name = changedName;

            api.Users.updateSca(matrixScaOwner).then(function(){
                api.Users.getSca(matrixScaOwner.Id).then(function(user){
                    updatedMatrix = user;
                    done();
                });
            });
        });

        it('Models should be the same', function() {
            expect(_.isMatch(matrixScaOwner.Name, updatedMatrix.Name)).to.be.true;
            expect(updatedMatrix.Name).to.be.eq(changedName);
        });
    });

    describe('Categorize Natural SCA', function(){
        var updatedUser;

        before(function (done) {
            var categorizeNatural = new CategorizeUserNatural(
                {
                    Id: johnScaPayer.Id,
                    UserCategory: 'OWNER',
                    TermsAndConditionsAccepted: true,
                    Birthday: 188301600,
                    Nationality: 'FR',
                    CountryOfResidence: 'FR',
                    ScaContext: 'USER_PRESENT'
                }
            );

            api.Users.categorize(categorizeNatural).then(function(data){
                updatedUser = data;
                done();
            });
        });

        it('Category should be OWNER', function() {
            expect(updatedUser.UserCategory).to.be.eq('OWNER');
            expect(updatedUser.Birthday).to.not.be.undefined;
            expect(updatedUser.Nationality).to.not.be.undefined;
            expect(updatedUser.CountryOfResidence).to.not.be.undefined;
        });
    });

    describe('Categorize Legal SCA', function(){
        var updatedUser;

        before(function (done) {
            var categorizeLegal = new CategorizeUserLegal(
                {
                    Id: matrixScaPayer.Id,
                    UserCategory: 'OWNER',
                    TermsAndConditionsAccepted: true,
                    LegalRepresentative: {
                        FirstName: 'John SCA',
                        LastName: 'Doe SCA Review',
                        Email: 'john.doe.sca@sample.org',
                        Birthday: 188301600,
                        Nationality: 'FR',
                        CountryOfResidence: 'FR',
                        PhoneNumber: '+33611111111',
                        PhoneNumberCountry: 'FR'
                    },
                    HeadquartersAddress: {
                        "AddressLine1": "4101 Reservoir Rd NW",
                        "AddressLine2": "address line 2",
                        "City": "Washington",
                        "Region": "District of Columbia",
                        "PostalCode": "20007",
                        "Country": "US"
                    },
                    CompanyNumber: "123456789",
                    ScaContext: 'USER_NOT_PRESENT'
                }
            );

            api.Users.categorize(categorizeLegal).then(function(data){
                updatedUser = data;
                done();
            });
        });

        it('Category should be OWNER', function() {
            expect(updatedUser.UserCategory).to.be.eq('OWNER');
            expect(updatedUser.HeadquartersAddress).to.not.be.undefined;
            expect(updatedUser.LegalRepresentative).to.not.be.undefined;
        });
    });

    describe('Enroll to SCA', function(){
        var enrollmentResult;

        before(function (done) {
            api.Users.enroll(johnOwner.Id).then(function(data){
                enrollmentResult = data;
                done();
            });
        });

        it('Category should be OWNER', function() {
            expect(enrollmentResult.PendingUserAction.RedirectUrl).to.not.be.undefined;
        });
    });

    describe('Manage consent', function(){
        var consentResult;

        before(function (done) {
            api.Users.enroll(johnOwner.Id).then(function(data){
                api.Users.manageConsent(johnOwner.Id).then(function(data){
                    consentResult = data;
                    done();
                });
            });
        });

        it('Correct result expected', function() {
            expect(consentResult.PendingUserAction.RedirectUrl).to.not.be.undefined;
        });
    });

    describe('Save Natural Payer to Owner', function(){
        var updatedJohn;
        before(function(done){
            johnPayer.Name += ' - CHANGED';
            johnPayer.TermsAndConditionsAccepted = true;
            johnPayer.UserCategory = 'OWNER';

            //when changing the UserCategory, we need to add the missing fields for the new Category
            johnPayer.CountryOfResidence = 'FR';
            johnPayer.Birthday = 188301600;
            johnPayer.Nationality = 'FR';

            api.Users.update(johnPayer).then(function(){
                api.Users.get(johnPayer.Id).then(function(user){
                    updatedJohn = user;
                    done();
                });
            });
        });

        it('Models should be the same', function() {
            expect(_.isMatch(johnPayer.LastName, updatedJohn.LastName)).to.be.true
            expect(updatedJohn.TermsAndConditionsAccepted).to.be.true;
            expect(updatedJohn.UserCategory).to.equal('OWNER');
        });
    });

    describe('Save Legal', function(){
        var updatedMatrix;
        before(function(done){
            matrix.Name += ' - CHANGED';
            matrix.TermsAndConditionsAccepted = true;

            api.Users.update(matrix).then(function(){
                api.Users.get(matrix.Id).then(function(user){
                    updatedMatrix = user;
                    done();
                });
            });
        });

        it('Models should be the same', function(){
            expect(_.isMatch(matrix.Name, updatedMatrix.Name)).to.be.true;
            expect(updatedMatrix.TermsAndConditionsAccepted).to.be.true;
        });
    });

    describe('Save Legal Payer to Owner', function(){
        var updatedMatrix;
        before(function(done){
            matrixPayer.Name += ' - CHANGED';
            matrixPayer.TermsAndConditionsAccepted = true;
            matrixPayer.UserCategory = 'OWNER';

            //when changing the UserCategory, we need to add the missing fields for the new Category
            matrixPayer.HeadquartersAddress = {
                "AddressLine1": "4101 Reservoir Rd NW",
                "AddressLine2": "",
                "City": "Washington",
                "Region": "District of Columbia",
                "PostalCode": "20007",
                "Country": "US"
            };
            matrixPayer.CompanyNumber = 123456789;
            matrixPayer.LegalRepresentativeNationality = 'FR';
            matrixPayer.LegalRepresentativeCountryOfResidence = 'FR';
            matrixPayer.LegalRepresentativeBirthday = 188301600;

            api.Users.update(matrixPayer).then(function(){
                api.Users.get(matrixPayer.Id).then(function(user){
                    updatedMatrix = user;
                    done();
                });
            });
        });

        it('Models should be the same', function(){
            expect(_.isMatch(matrixPayer.Name, updatedMatrix.Name)).to.be.true;
            expect(updatedMatrix.TermsAndConditionsAccepted).to.be.true;
            expect(updatedMatrix.UserCategory).to.equal('OWNER');
        });
    });

    describe('Close natural', function(){
        var john = new UserNatural(helpers.data.getUserNatural());
        var johnSca = new UserNaturalSca(helpers.data.getUserNaturalScaPayer());

        var closedJohn, closedJohnSca;

        before(function (done) {
            // create new UserNatural
            api.Users.create(john).then(function(data){
                john = data;
                // create new UserNaturalSca
                api.Users.create(johnSca).then(function(data){
                    johnSca = data;
                    // close the UserNatural
                    api.Users.close(john).then(function(){
                        // close the UserNaturalSca
                        api.Users.close(johnSca).then(function (){
                            // fetch the closed UserNatural
                            api.Users.get(john.Id).then(function(data){
                                closedJohn = data;
                                // fetch the closed UserNaturalSca
                                api.Users.get(johnSca.Id).then(function(data){
                                    closedJohnSca = data;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it('Status should be CLOSED', function() {
            expect(closedJohn.UserStatus).to.be.eq('CLOSED');
            expect(closedJohnSca.UserStatus).to.be.eq('CLOSED');
        });
    });

    describe('Close legal', function(){
        var matrix = new UserLegal(helpers.data.getUserLegal());
        var matrixSca = new UserLegalSca(helpers.data.getUserLegalScaPayer());

        var closedMatrix, closedMatrixSca;

        before(function (done) {
            // create new UserLegal
            api.Users.create(matrix).then(function(data){
                matrix = data;
                // create new UserLegalSca
                api.Users.create(matrixSca).then(function(data){
                    matrixSca = data;
                    // close the UserLegal
                    api.Users.close(matrix).then(function(){
                        // close the UserLegalSca
                        api.Users.close(matrixSca).then(function (){
                            // fetch the closed UserLegal
                            api.Users.get(matrix.Id).then(function(data){
                                closedMatrix = data;
                                // fetch the closed UserLegalSca
                                api.Users.get(matrixSca.Id).then(function(data){
                                    closedMatrixSca = data;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it('Status should be CLOSED', function() {
            expect(closedMatrix.UserStatus).to.be.eq('CLOSED');
            expect(closedMatrixSca.UserStatus).to.be.eq('CLOSED');
        });
    });

    describe('Create Bank Account', function(){
        describe('IBAN', function() {
            var ibanAccount;
            before(function(done){
                var account = new BankAccount({
                    OwnerName: john.FirstName + ' ' + john.LastName,
                    OwnerAddress: john.Address,
                    Details: new BankAccountDetailsIBAN({
                        IBAN: 'FR7630004000031234567890143',
                        BIC: 'BNPAFRPP'
                    })
                });
                api.Users.createBankAccount(john.Id, account).then(function(account){
                    ibanAccount = account;
                    done();
                });
            });

            it('Account should be created correctly', function(){
                expect(ibanAccount.Id).to.not.be.undefined;
                expect(ibanAccount.UserId).to.equal(john.Id);
            });
        });

        describe('GB', function() {
            var gbAccount;
            before(function(done){
                var account = new BankAccount({
                    OwnerName: john.FirstName + ' ' + john.LastName,
                    OwnerAddress: john.Address,
                    Details: new BankAccountDetailsGB({
                        AccountNumber: '63956474',
                        SortCode: '200000'
                    })
                });
                api.Users.createBankAccount(john.Id, account).then(function(account){
                    gbAccount = account;
                    done();
                });
            });

            it('Account should be created correctly', function(){
                expect(gbAccount.Id).to.not.be.undefined;
                expect(gbAccount.UserId).to.equal(john.Id);
                expect(gbAccount.Type).to.equal('GB');
            });
        });

        describe('US', function() {
            var usAccount;
            before(function(done){
                var account = new api.models.BankAccount({
                    OwnerName: john.FirstName + ' ' + john.LastName,
                    OwnerAddress: john.Address,
                    Details: new api.models.BankAccountDetailsUS({
                        AccountNumber: '234234234234',
                        ABA: '234334789'
                    })
                });
                api.Users.createBankAccount(john.Id, account).then(function(account){
                    usAccount = account;
                    done();
                });
            });

            it('Account should be created correctly', function(){
                expect(usAccount.Id).to.not.be.undefined;
                expect(usAccount.UserId).to.equal(john.Id);
                expect(usAccount.Type).to.equal('US');
            });
        });

        describe('CA', function() {
            var caAccount;
            before(function(done){
                var account = new BankAccount({
                    OwnerName: john.FirstName + ' ' + john.LastName,
                    OwnerAddress: john.Address,
                    Type: 'CA',
                    BankName: 'TestBankName',
                    BranchCode: '12345',
                    AccountNumber: '234234234234',
                    InstitutionNumber: '123'
                });
                api.Users.createBankAccount(john.Id, account).then(function(account){
                    caAccount = account;
                    done();
                });
            });

            it('Account should be created correctly', function(){
                expect(caAccount.Id).to.not.be.undefined;
                expect(caAccount.UserId).to.equal(john.Id);
                expect(caAccount.Type).to.equal('CA');
            });
        });

        describe('OTHER', function() {
            var otherAccount;
            before(function(done){
                var account = new BankAccount({
                    OwnerName: john.FirstName + ' ' + john.LastName,
                    OwnerAddress: john.Address,
                    Type: 'OTHER',
                    Country: 'FR',
                    AccountNumber: '234234234234',
                    BIC: 'BINAADADXXX'
                });
                api.Users.createBankAccount(john.Id, account).then(function(account){
                    otherAccount = account;
                    done();
                });
            });

            it('Account should be created correctly', function(){
                expect(otherAccount.Id).to.not.be.undefined;
                expect(otherAccount.UserId).to.equal(john.Id);
                expect(otherAccount.Type).to.equal('OTHER');
            });
        });
    });

    describe('Bank Accounts', function() {
        var bankAccounts;
        before(function(done){
            api.Users.getBankAccounts(john.Id).then(function(list){
                bankAccounts = list;
                done();
            });
        });

        it('List should contain instances of BankAccount', function(){
            expect(bankAccounts[0] instanceof BankAccount).to.be.true;
            expect(bankAccounts[0].UserId).to.equal(john.Id);
        });

        describe('Sort by creation date', function() {
            var bankAccounts;
            before(function(done){
                api.Users.getBankAccounts(john.Id, {
                    parameters: {
                        Sort: 'CreationDate:desc'
                    }
                }).then(function(list){
                    bankAccounts = list;
                    done();
                });
            });

            it('Should work properly', function(){
                expect(bankAccounts[0].CreationDate).to.be.above(bankAccounts[3].CreationDate - 1);
            });
        });
    });

    describe('Deactivate Bank Account', function(){
        var otherAccount;
        var deactivatedBankAccount;
        before(function(done){
            var account = new BankAccount({
                UserId: john.Id,
                OwnerName: john.FirstName + ' ' + john.LastName,
                OwnerAddress: john.Address,
                Type: 'OTHER',
                Country: 'FR',
                AccountNumber: '234234234234',
                BIC: 'BINAADADXXX'
            });
            api.Users.createBankAccount(john.Id, account).then(function(account){
                otherAccount = account;

                api.Users.deactivateBankAccount(otherAccount.UserId, otherAccount.Id).then(function(account){
                    deactivatedBankAccount = account;
                    done();
                });

            });
        });

        it('Should be deactivated correctly', function(){
           expect(deactivatedBankAccount.Id).not.to.be.undefined;
           expect(deactivatedBankAccount.Id).to.equal(otherAccount.Id);
           expect(deactivatedBankAccount.Active).to.equal(false) ;
        });

    });

    describe('Create KYC Document', function() {
        var kycDocument, getKycDocument;

        before(function(done){
            api.Users.createKycDocument(john.Id, {
                Status: KycDocumentStatus.Created,
                Type: KycDocumentType.IdentityProof
            }).then(function(document){
                kycDocument = document;
                api.Users.getKycDocument(john.Id, kycDocument.Id).then(function(document){
                    getKycDocument = document;
                });
                done();
            });
        });

        it('Should be created and fetched correctly', function(){
            expect(kycDocument.Id).not.to.be.undefined;
            expect(kycDocument.Status).to.equal(KycDocumentStatus.Created);
            expect(kycDocument.Type).to.equal(KycDocumentType.IdentityProof);
            expect(_.isMatch(kycDocument, getKycDocument)).to.be.true;
        });

        describe('Update KYC Document', function() {
            var updatedKycDocument;

            before(function(done){
            	var filePath = path.resolve(__dirname, '../TestKycPageFile.png');
                api.Users.createKycPageFromFile(john.Id, kycDocument.Id, filePath).then(function(){
                    kycDocument.Status = KycDocumentStatus.ValidationAsked;
                    api.Users.updateKycDocument(john.Id, kycDocument).then(function(){
                        api.Users.getKycDocument(john.Id, kycDocument.Id).then(function(document){
                            updatedKycDocument = document;
                            done();
                        });
                    });
                });
            });

            it('Should be updated correctly', function(){
                expect(updatedKycDocument.Status).to.equal(KycDocumentStatus.ValidationAsked);
            });
        });

        describe('Create KYC Page', function() {
            describe('Empty File String', function() {
                var emptyFileStringResult;

                before(function(done){
                    api.Users.createKycPage(john.Id, kycDocument.Id, {File: ''}, function (data) {
                        emptyFileStringResult = data;
                        done();
                    });
                });

                it('Should return error for empty file string', function(){
                    expect(emptyFileStringResult.errors).to.not.be.null;
                });
            });

            describe('Wrong File String', function() {
                var wrongFileStringResult;

                before(function(done){
                    api.Users.createKycPage(john.Id, kycDocument.Id, {File: ''}, function (data) {
                        wrongFileStringResult = data;
                        done();
                    });
                });

                it('Should return error for wrong file string', function(){
                    expect(wrongFileStringResult.errors).to.not.be.null;
                });
            });

            describe('Correct File String', function() {
                var kycDocument;
                // Create new KYC Document and add a page
                before(function(done){
                    api.Users.createKycDocument(john.Id, {
                        Status: KycDocumentStatus.Created,
                        Type: KycDocumentType.IdentityProof
                    }).then(function(document){
                        kycDocument = document;
                        done();
                    });
                });

                it('Should be correctly created', function(done){
                    api.Users.createKycPage(john.Id, kycDocument.Id, {
                        File: helpers.data.KYCPageFileString
                    }).then(function(){
                        assert.isOk('Request succeeded');
                        done();
                    }, function(){
                        assert.fail('Request failed');
                        done();
                    });
                });
            });

            describe('Empty File Path', function() {
                before(function(){
                    sinon.stub(api, 'errorHandler');
                    api.Users.createKycPageFromFile(john.Id, kycDocument.Id, '');
                });

                it('Should call error handler', function(){
                    assert(api.errorHandler.calledOnce);
                    assert(api.errorHandler.calledWith('File path cannot be empty'));
                });

                after(function(){
                    api.errorHandler.restore();
                });
            });

            describe('Wrong File Path', function() {
                before(function(){
                    sinon.stub(api, 'errorHandler');
                    api.Users.createKycPageFromFile(john.Id, kycDocument.Id, 'notExistFileName.tmp');
                });

                it('Should call error handler', function(){
                    assert(api.errorHandler.calledOnce);
                    assert(api.errorHandler.calledWith('File does not exist'));
                });

                after(function(){
                    api.errorHandler.restore();
                });
            });

            describe('Correct File Path', function() {
                var kycDocument;
                // Create new KYC Document and add a page
                before(function(done){
                    api.Users.createKycDocument(john.Id, {
                        Status: KycDocumentStatus.Created,
                        Type: KycDocumentType.IdentityProof
                    }).then(function(document){
                        kycDocument = document;
                        done();
                    });
                });

                it('Should be correctly created', function(done){
                    var filePath = path.resolve(__dirname, '../TestKycPageFile.png');
                    api.Users.createKycPageFromFile(john.Id, kycDocument.Id, filePath).then(function(){
                        assert.isOk('Request succeeded');
                        done();
                    }, function(){
                        assert.fail('Request failed');
                        done();
                    });
                });
            });
        });
    });

    describe('Get KYC Documents', function() {
        var kycDocuments;
        before(function(done){
            api.Users.getKycDocuments(john.Id).then(function(list){
                kycDocuments = list;
                done();
            });
        });

        it('List should contain instances of BankAccount', function(){
            expect(kycDocuments[0] instanceof KycDocument).to.be.true;
        });

        describe('Sort by creation date', function() {
            var kycDocuments;
            before(function(done){
                // Create a new document
                api.Users.createKycDocument(john.Id, {
                    Status: KycDocumentStatus.Created,
                    Type: KycDocumentType.IdentityProof
                }).then(function(){
                    // Request documents sorted
                    api.Users.getKycDocuments(john.Id, {
                        parameters: {
                            Sort: 'CreationDate:desc'
                        }
                    }).then(function(list){
                        kycDocuments = list;
                        done();
                    });
                });
            });

            it('Should work properly', function(){
                expect(kycDocuments[0].CreationDate).to.be.above(kycDocuments[1].CreationDate - 1);
            });
        });
    });

    describe('Transactions', function() {
        var payIn, transactions;

        before(function(done){
            helpers.getNewPayInCardDirect(api, john, function(data){
                payIn = data;
                done();
            });
        });

        describe('Get all transactions', function(){
            before(function(done){
                api.Users.getTransactions(john.Id, function(data, response){
                    transactions = data;
                    done();
                }, {
                    parameters: {
                        Type: 'PAYIN',
                        AfterDate: payIn.CreationDate - 10,
                        BeforeDate: payIn.CreationDate + 10
                    }
                });
            });

            it('should have one transaction', function(){
                expect(transactions.length).to.equal(1);
            });

            it('transaction data should be correct', function(){
                expect(transactions[0].AuthorId).to.equal(john.Id);
            });
        });

        describe('Get all transactions Sca', function(){
            var responseError;

            before(function(done){
                api.Users.getTransactions(john.Id, function(data, response) {}, {
                    parameters: {
                        Type: 'PAYIN',
                        AfterDate: payIn.CreationDate - 10,
                        BeforeDate: payIn.CreationDate + 10,
                        ScaContext: 'USER_PRESENT'
                    },
                    resolveWithFullResponse: true
                }).catch(function (error) {
                    responseError = error;
                    done();
                });
            });

            it('redirectUrl should be present on response headers', function () {
                expect(responseError.headers['www-authenticate']).to.contain("PendingUserAction RedirectUrl");
            });
        });

        describe('Get all Cards', function(){
            var card, cards;

            before(function(done){
                api.Cards.get(payIn.CardId, function(data, response){
                    card = data;
                    api.Users.getCards(john.Id, function(data, response){
                        cards = data;
                        done();
                    });
                });
            });

            it('should have one card', function(){
                expect(cards.length).to.equal(1);
            });

            it('card data should be correct', function(){
                expect(cards[0].UserId).to.equal(john.Id);
            });
        });

        describe('Get Transactions for Card', function(){
            var getTransactions;

            before(function(done){
                api.Cards.getTransactions(payIn.CardId, function(data, response){
                    getTransactions = data;
                    done();
                });
            });

            it('should be retrieved', function(){
                expect(getTransactions).not.to.be.undefined;
                expect(getTransactions).to.be.an('array');
            });
        });
    });

    describe('Wallets', function() {
        var wallets, wallet;


        before(function(done){
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(wallet).then(function(){
                api.Users.getWallets(john.Id, function(data, response){
                    wallets = data;
                    done();
                });
            });
        });

        it('should have two wallets', function(){
            expect(wallets.length).to.equal(2);
        });

        it('wallet should contain the right data', function(){
            assert(_.contains(wallets[0].Owners, john.Id));
        });
    });

    describe('Wallets Sca', function () {
        var responseError;


        before(function (done) {
            api.Users.getWallets(john.Id, function (data, response) {
                },
                {
                    parameters: {
                        ScaContext: 'USER_PRESENT'
                    },
                    resolveWithFullResponse: true
                }).catch(function (error) {
                responseError = error;
                done();
            });
        });

        it('redirectUrl should be present on response headers', function () {
            expect(responseError.headers['www-authenticate']).to.contain("PendingUserAction RedirectUrl");
        });
    });

    describe('Create UBO declaration', function() {
        var declarativeUser, createdDeclaration, ubo;

        before(function(done) {
            declarativeUser = helpers.data.getUbo();

                api.UboDeclarations.create(matrix.Id, function (data, response) {
                    uboDeclaration = data;

                    api.UboDeclarations.createUbo(matrix.Id, uboDeclaration.Id, declarativeUser, function (data, response) {
                        ubo = data;

                        done();
                    });
                });
        });

        it('should be successful', function() {
            expect(uboDeclaration).not.to.be.null;
            expect(uboDeclaration.Status).to.equal(UboDeclarationStatus.Created);
            expect(ubo).not.to.be.null;
            expect(ubo.FirstName).to.equal(declarativeUser.FirstName);
        });
    });

    describe('Get PreAuthorizations', function() {
        var getPreAuthorizations;

        before(function(done) {
            api.Users.getPreAuthorizations(john.Id, function(data, response) {
                getPreAuthorizations = data;
                done();
            });
        });

        it('should be retrieved', function() {
            expect(getPreAuthorizations).not.to.be.undefined;
            expect(getPreAuthorizations).to.be.an('array');
        });
    });

    describe('Get BlockStatus', function () {
        var blockStatus;

        before(function (done) {
            api.Users.getBlockStatus(john.Id, function (data, response) {
                blockStatus = data;
                done();
            });
        });

        it('should get the block status', function() {
            expect(blockStatus).not.to.be.undefined;
        });
    });

    describe('Get Regulatory', function () {
        var blockStatus;

        before(function (done) {
            api.Users.getRegulatory(john.Id, function (data, response) {
                blockStatus = data;
                done();
            });
        });

        it('should get regulatory', function () {
            expect(blockStatus).not.to.be.undefined;
        });
    });

    describe('Validate data format', function () {
        var successResult;
        var errorResult;

        before(function (done) {
            var validation = {
                CompanyNumber: {
                    CompanyNumber: "AB123456",
                    CountryCode: "IT"
                }
            };
            api.Users.validateDataFormat(validation, function (data, response) {
                successResult = data;
                validation = {
                    CompanyNumber: {
                        CompanyNumber: "123"
                    }
                };
                api.Users.validateDataFormat(validation, function (data, response) {
                })
                    .catch(function (data) {
                        errorResult = data;
                        done();
                    });
            });
        });

        it('should be valid', function () {
            expect(successResult.CompanyNumber).not.to.be.undefined;
        });

        it('should fail', function () {
            expect(successResult.CompanyNumber).not.to.be.undefined;
        });
    });
});
