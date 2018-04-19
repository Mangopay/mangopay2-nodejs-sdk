var expect = require('chai').expect;
var helpers = require('../helpers');
var UserNatural = require('../../lib/models/UserNatural');
var BankAccount = require('../../lib/models/BankAccount');
var BankAccountDetailsIBAN = require('../../lib/models/BankAccountDetailsIBAN');

describe('Bank Accounts', function () {
    var john = new UserNatural(helpers.data.getUserNatural());
    var bankAccount;

    before(function (done) {
        api.Users.create(john).then(function (data, response) {
            john = data;

            var account = new BankAccount({
                OwnerName: john.FirstName + ' ' + john.LastName,
                OwnerAddress: john.Address,
                Details: new BankAccountDetailsIBAN({
                    IBAN: 'FR7618829754160173622224154',
                    BIC: 'CMBRFR2BCME'
                })
            });
            api.Users.createBankAccount(john.Id, account).then(function (account) {
                bankAccount = account;
                done();
            });
        })
    });

    describe('Get Transactions for an Account', function () {
        var getTransactions;

        before(function (done) {
            api.BankAccounts.getTransactions(bankAccount.Id, function (data, response) {
                getTransactions = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(getTransactions).not.to.be.undefined;
            expect(getTransactions).to.be.an('array');
        });
    });
});