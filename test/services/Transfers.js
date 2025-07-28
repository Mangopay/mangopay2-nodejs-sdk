var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');
const UserLegalSca = require("../../lib/models/UserLegalSca");

describe('Transfers', function () {
    var john = helpers.data.getUserNatural();
    var wallet, secondWallet, transfer;

    before(function (done) {
        api.Users.create(john).then(function () {
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };
            secondWallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };
            api.Wallets.create(wallet).then(function () {
                api.Wallets.create(secondWallet).then(function () {
                    api.Transfers.create({
                        AuthorId: john.Id,
                        Tag: 'DefaultTag',
                        CreditedUserId: john.Id,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: 1
                        },
                        Fees: {
                            Currency: 'EUR',
                            Amount: 0
                        },
                        DebitedWalletId: wallet.Id,
                        CreditedWalletId: secondWallet.Id
                    }, function (data, response) {
                        transfer = data;
                        done();
                    });
                });
            });
        });
    });

    describe('Create', function () {
        it('should not happen because of insufficient funds', function () {
            expect(transfer.Status).to.equal('FAILED');
            expect(transfer.CreditedUserId).to.equal(john.Id);
            expect(transfer.DebitedWalletId).to.equal(wallet.Id);
            expect(transfer.CreditedWalletId).to.equal(secondWallet.Id);
        });
    });

    describe('Create Transfer Sca User Present', function () {
        var validUserNaturalScaId = "user_m_01JRFJJN9BR864A4KG7MH1WCZG";
        var transferWithPendingUserAction;
        var transferWithoutPendingUserAction;
        var transferUserNotPresent;

        before(function (done) {
            // var johnSca = helpers.data.getUserNaturalScaOwner();
            var matrixScaOwnerPost = new UserLegalSca(helpers.data.getUserLegalScaOwner());
            api.Users.create(matrixScaOwnerPost).then(function (matrixScaOwner) {
                helpers.getNewWalletWithMoney(api, validUserNaturalScaId, function (debitedWallet) {
                    var creditedWalletPost = {
                        Owners: [matrixScaOwner.Id],
                        Currency: 'EUR',
                        Description: 'WALLET IN EUR'
                    };

                    api.Wallets.create(creditedWalletPost).then(function (creditedWallet) {
                        var transferPost = {
                            AuthorId: validUserNaturalScaId,
                            CreditedUserId: matrixScaOwner.Id,
                            DebitedFunds: {
                                Currency: 'EUR',
                                Amount: 3001
                            },
                            Fees: {
                                Currency: 'EUR',
                                Amount: 0
                            },
                            DebitedWalletId: debitedWallet.Id,
                            CreditedWalletId: creditedWallet.Id,
                            ScaContext: 'USER_PRESENT'
                        };

                        api.Transfers.create(transferPost).then(function (data) {
                            transferWithPendingUserAction = data;
                            transferPost.DebitedFunds = {
                                Currency: 'EUR',
                                Amount: 20
                            };
                            api.Transfers.create(transferPost).then(function (data) {
                                transferWithoutPendingUserAction = data;
                                transferPost.ScaContext = 'USER_NOT_PRESENT';
                                api.Transfers.create(transferPost).then(function (data) {
                                    transferUserNotPresent = data;
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        it('should be created', function () {
            expect(transferWithPendingUserAction.Status).to.equal('SUCCEEDED');
            expect(transferWithPendingUserAction.PendingUserAction).not.to.be.undefined;

            expect(transferWithoutPendingUserAction.Status).to.equal('SUCCEEDED');
            expect(transferWithoutPendingUserAction.PendingUserAction).to.be.null;

            expect(transferUserNotPresent.Status).to.equal('SUCCEEDED');
            expect(transferUserNotPresent.PendingUserAction).to.be.null;
        });
    });

    describe('Get Refunds', function () {
        var getRefunds;

        before(function (done) {
            api.Transfers.getRefunds(transfer.Id, function (data, response) {
                getRefunds = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(getRefunds).not.to.be.undefined;
            expect(getRefunds).to.be.an('array');
        });
    });
});
