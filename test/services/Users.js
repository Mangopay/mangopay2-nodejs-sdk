var _ = require('underscore');
var path = require('path');
var Promise = require('promise');
var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');

var helpers = require('../helpers');

var UserLegal = require('../../lib/models/UserLegal');
var UserNatural = require('../../lib/models/UserNatural');
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

describe('Users', function() {
    var john = new UserNatural(helpers.data.getUserNatural());
    var matrix = new UserLegal(helpers.data.getUserLegal());

    before(function(done){
        api.Users.create(john).then(function(data){
            john = data;
            api.Users.create(matrix).then(function(data){
                matrix = data;
                done();
            });
        });
    });

    it('Create Natural', function(){
        expect(john.Id).not.to.be.undefined;
        expect(john.PersonType).to.equal(PersonType.Natural);
    });

    it('Create Legal', function() {
        expect(matrix.Id).not.to.be.undefined;
        expect(matrix.PersonType).to.equal(PersonType.Legal);
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
        });

        it('Fails for Legal User', function(done) {
            api.Users.getLegal(john.Id, function(data) {
                expect(data.errors).to.exist;
                done();
            });
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
        });

        it('Fails for Natural User', function(done) {
            api.Users.getNatural(matrix.Id, function(data) {
                expect(data.errors).to.exist;
                done();
            });
        });
    });

    describe('Save Natural', function(){
        var johnClone;
        before(function(done){
            john.LastName += ' - CHANGED';
            api.Users.update(john).then(function(){
                api.Users.get(john.Id).then(function(user){
                    johnClone = user;
                    done();
                });
            });
        });

        it('Models should be the same', function(){
            expect(_.isMatch(john, _.omit(johnClone, 'Address'))).to.be.true;

        });
    });
    describe('Save Legal', function(){
        var matrixClone;
        before(function(done){
            matrix.LastName += ' - CHANGED';
            api.Users.update(matrix).then(function(){
                api.Users.get(matrix.Id).then(function(user){
                    matrixClone = user;
                    done();
                });
            });
        });

        it('Models should be the same', function(){
            expect(_.isMatch(matrix, _.omit(matrixClone, 'HeadquartersAddress', 'LegalRepresentativeAddress'))).to.be.true;
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
                        IBAN: 'FR7618829754160173622224154',
                        BIC: 'CMBRFR2BCME'
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
        var kycDocument;

        before(function(done){
            api.Users.createKycDocument(john.Id, {
                Status: KycDocumentStatus.Created,
                Type: KycDocumentType.IdentityProof
            }).then(function(document){
                kycDocument = document;
                done();
            });
        });

        it('Should be created correctly', function(){
            expect(kycDocument.Id).not.to.be.undefined;
            expect(kycDocument.Status).to.equal(KycDocumentStatus.Created);
            expect(kycDocument.Type).to.equal(KycDocumentType.IdentityProof);
        });

        describe('Get KYC Document', function() {
            var getKycDocument;
            before(function(done){
                api.Users.getKycDocument(john.Id, kycDocument.Id).then(function(document){
                    getKycDocument = document;
                    done();
                });
            });

            it('Should be retrieved correctly', function(){
                expect(_.isMatch(kycDocument, getKycDocument)).to.be.true;
            });
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
                before(function(done){
                    sinon.stub(api, 'errorHandler');
                    api.Users.createKycPage(john.Id, kycDocument.Id, {
                        File: ''
                    }).then(function(){done()}, function(){done()});
                });

                it('Should call error handler', function(){
                    assert(api.errorHandler.calledOnce);
                });

                after(function(){
                    api.errorHandler.restore();
                });
            });

            describe('Wrong File String', function() {
                before(function(done){
                    sinon.stub(api, 'errorHandler');
                    api.Users.createKycPage(john.Id, kycDocument.Id, {
                        File: 'qqqq'
                    }).then(function(){done()}, function(){done()});
                });

                it('Should call error handler', function(){
                    assert(api.errorHandler.calledOnce);
                });

                after(function(){
                    api.errorHandler.restore();
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
});
