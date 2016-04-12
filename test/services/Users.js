var _ = require('underscore');
var path = require('path');
var Promise = require('promise');
var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');

var helpers = require('../helpers');

var UserLegal = require('../../lib/models/UserLegal');
var UserNatural = require('../../lib/models/UserNatural');
var PersonType = require('../../lib/models/PersonType');
var BankAccount = require('../../lib/models/BankAccount');
var BankAccountDetailsIBAN = require('../../lib/models/BankAccountDetailsIBAN');
var BankAccountDetailsGB = require('../../lib/models/BankAccountDetailsGB');
var KycDocument = require('../../lib/models/KycDocument');
var KycDocumentStatus = require('../../lib/models/KycDocumentStatus');
var KycDocumentType = require('../../lib/models/KycDocumentType');


describe('Users', function() {
    var john = new UserNatural(helpers.data.UserNatural);
    var matrix = new UserLegal(helpers.data.UserLegal);

    before(function(done){
        Promise.all([api.Users.create(john), api.Users.create(matrix)]).then(function() {
            done();
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
        api.Users.create(user).done(function(){
            assert.fail('Request should not succeed');
        }, function(){
            assert.isOk('Our request failed');
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
            expect(_.isMatch(john1, john.data)).to.be.true;
            expect(_.isMatch(john2, john.data)).to.be.true;
        });

        it('Fails for Legal User', function(done) {
            api.Users.getNatural(matrix.Id).done(function(){
                assert.fail('Request passed');
                done()
            }, function(){
                assert.isOk('Should fail');
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
            expect(_.isMatch(matrix1, matrix.data)).to.be.true;
            expect(_.isMatch(matrix2, matrix.data)).to.be.true;
        });

        it('Fails for Natural User', function(done) {
            api.Users.getNatural(matrix.Id).done(function(){
                assert.fail('Request passed');
                done()
            }, function(){
                assert.isOk('Should fail');
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
            expect(_.isMatch(john, johnClone)).to.be.true;
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
            expect(_.isMatch(matrix, matrixClone)).to.be.true;
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
                var account = new BankAccount({
                    OwnerName: john.FirstName + ' ' + john.LastName,
                    OwnerAddress: john.Address,
                    Type: 'US',
                    AccountNumber: '234234234234',
                    ABA: '234334789'
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
                expect(bankAccounts[0].CreationDate).to.be.above(bankAccounts[1].CreationDate);
            });
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
                kycDocument.Status = KycDocumentStatus.ValidationAsked;
                api.Users.updateKycDocument(john.Id, kycDocument).then(function(){
                    api.Users.getKycDocument(john.Id, kycDocument.Id).then(function(document){
                        updatedKycDocument = document;
                        done();
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
                expect(kycDocuments[0].CreationDate).to.be.above(kycDocuments[1].CreationDate);
            });
        });
    });

    describe('Transactions', function() {
        var preAuthorization, transactions;

        before(function(done){
            helpers.getNewPayInCardDirect(api, john, function(data){
                preAuthorization = data;
                api.Users.getTransactions(john.Id, function(data, response){
                    transactions = data;
                    done();
                }, {
                    parameters: {
                        Type: 'PAYIN',
                        AfterDate: preAuthorization.CreationDate - 100,
                        BeforeDate: preAuthorization.CreationDate + 100,
                        page: 1,
                        per_page: 10
                    }
                })

            });

        });

        it('should have one transaction', function(){
            expect(transactions.length).to.equal(1);
        });

        it('transaction data should be correct', function(){
            expect(transactions[0].AuthorId).to.equal(john.Id);
        });
    });

    //describe('Wallets', function() {
    //    before(function(done){
    //
    //    });
    //
    //    it('', function(){
    //        expect(kycDocuments[0].CreationDate).to.be.above(kycDocuments[1].CreationDate);
    //    });
    //});

    /**
     * TODO implements tests once we have API coverage
     */

    //function test_Users_AllTransactions() {
    //    $john = $this->getJohn();
    //    $payIn = $this->getNewPayInCardDirect();
    //
    //    $pagination = new \MangoPay\Pagination(1, 1);
    //    $filter = new \MangoPay\FilterTransactions();
    //    $filter->Type = 'PAYIN';
    //    $filter->AfterDate = $payIn->CreationDate - 1;
    //    $filter->BeforeDate = $payIn->CreationDate + 1;
    //    $transactions = $this->_api->Users->GetTransactions($john->Id, $pagination, $filter);
    //
    //    $this->assertEqual(count($transactions), 1);
    //    $this->assertIsA($transactions[0], '\MangoPay\Transaction');
    //    $this->assertEqual($transactions[0]->AuthorId, $john->Id);
    //    $this->assertIdenticalInputProps($transactions[0], $payIn);
    //}
    //
    //function test_Users_AllTransactions_SortByCreationDate() {
    //    $john = $this->getJohn();
    //    $this->getNewPayInCardDirect();
    //    $this->getNewPayInCardDirect();
    //    $sorting = new \MangoPay\Sorting();
    //    $sorting->AddField("CreationDate", \MangoPay\SortDirection::DESC);
    //    $pagination = new \MangoPay\Pagination(1, 20);
    //    $filter = new \MangoPay\FilterTransactions();
    //    $filter->Type = 'PAYIN';
    //
    //    $transactions = $this->_api->Users->GetTransactions($john->Id, $pagination, $filter, $sorting);
    //
    //    $this->assertTrue($transactions[0]->CreationDate > $transactions[1]->CreationDate);
    //}
    //
    //function test_Users_AllCards() {
    //    $john = $this->getNewJohn();
    //    $payIn = $this->getNewPayInCardDirect($john->Id);
    //    $card =$this->_api->Cards->Get($payIn->PaymentDetails->CardId);
    //    $pagination = new \MangoPay\Pagination(1, 1);
    //
    //    $cards = $this->_api->Users->GetCards($john->Id, $pagination);
    //
    //    $this->assertEqual(count($cards), 1);
    //    $this->assertIsA($cards[0], '\MangoPay\Card');
    //    $this->assertIdenticalInputProps($cards[0], $card);
    //}
    //
    //function test_Users_AllCards_SortByCreationDate() {
    //    $john = $this->getNewJohn();
    //    $this->getNewPayInCardDirect($john->Id);
    //    $this->getNewPayInCardDirect($john->Id);
    //    $pagination = new \MangoPay\Pagination(1, 20);
    //    $sorting = new \MangoPay\Sorting();
    //    $sorting->AddField("CreationDate", \MangoPay\SortDirection::ASC);
    //
    //    $cards = $this->_api->Users->GetCards($john->Id, $pagination, $sorting);
    //
    //    $this->assertTrue($cards[0]->CreationDate < $cards[1]->CreationDate);
    //}
    //function test_Users_AllWallets() {
    //    $john = $this->getJohn();
    //    $this->getJohnsWallet();
    //    $pagination = new \MangoPay\Pagination(1, 1);
    //
    //    $wallets = $this->_api->Users->GetWallets($john->Id, $pagination);
    //
    //    $this->assertEqual(count($wallets), 1);
    //    $this->assertIsA($wallets[0], '\MangoPay\Wallet');
    //}
    //
    //function test_Users_AllWallets_SortByCreationDate() {
    //    $john = $this->getJohn();
    //    $this->getJohnsWallet();
    //    self::$JohnsWallet = null;
    //    $this->getJohnsWallet();
    //    $pagination = new \MangoPay\Pagination(1, 20);
    //    $sorting = new \MangoPay\Sorting();
    //    $sorting->AddField("CreationDate", \MangoPay\SortDirection::DESC);
    //
    //    $wallets = $this->_api->Users->GetWallets($john->Id, $pagination, $sorting);
    //
    //    $this->assertTrue($wallets[0]->CreationDate > $wallets[1]->CreationDate);
    //}




});