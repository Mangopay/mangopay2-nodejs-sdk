var _ = require('underscore');
var path = require('path');
var expect = require('chai').expect;

describe('Disputes', function() {
    var disputes;

    before(function(done){
        api.Disputes.getAll(function(data, response){
            disputes = data;
            done();
        }, {
            parameters: {
                per_page: 100,
                page: 2
            }
        });
    });

    it('should retrieve list', function(){
        expect(disputes.length).to.be.above(0);
    });

    describe('Get', function() {
        var dispute;

        before(function(done){
            api.Disputes.get(disputes[0].Id, function(data, response){
                dispute = data;
                done();
            });
        });

        it('should be retrieved', function(){
            expect(disputes).not.to.be.null;
            expect(disputes[0].Id).to.equal(dispute.Id);
        });
    });

    describe('Get Transactions', function() {
        var dispute, transactions;

        before(function(done){
            dispute = _.findWhere(disputes, {DisputeType: 'NOT_CONTESTABLE'});
            if (!dispute) {
                console.warn('Cannot test getting transactions for dispute because there\'s no not costestable disputes in the disputes list.');
                this.skip();
            }
            api.Disputes.getTransactions(dispute.Id, function(data, response){
                transactions = data;
                done();
            });
        });

        it('should be retrieved', function(){
            expect(transactions.length).to.be.above(0);
        });
    });

    describe('Get Disputes for Wallet', function() {
        var dispute, disputesForWallet, payIn;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem) {
                return disputeItem.InitialTransactionId;
            });

            if (!dispute) {
                console.warn('Cannot test getting disputes for wallet because there\'s no disputes with transaction ID in the disputes list.');
                this.skip();
            }

            payIn = api.PayIns.get(dispute.InitialTransactionId, function(data, response){
                api.Disputes.getDisputesForWallet(data.CreditedWalletId, function(data, response){
                    disputesForWallet = data;
                    done();
                });
            });

        });

        it('should be retrieved', function(){
            expect(disputesForWallet.length).to.be.above(0);
        });
    });

    describe('Get Disputes for User', function() {
        var dispute, disputesForUser;

        before(function(done){
            dispute = _.findWhere(disputes, {DisputeType: 'NOT_CONTESTABLE'});

            if (!dispute) {
                console.warn('Cannot test getting disputes for user because there\'s no not costestable disputes in the disputes list.');
                this.skip();
            }

            api.Disputes.getTransactions(dispute.Id, function(data, response){
                api.Disputes.getDisputesForUser(data[0].AuthorId, function(data, response){
                    disputesForUser = data;
                    done();
                });
            });

        });

        it('should be retrieved', function(){
            expect(disputesForUser.length).to.be.above(0);
        });
    });

    describe('Create Dispute Document', function() {
        var dispute, document;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem){
                return _.contains(['PENDING_CLIENT_ACTION', 'REOPENED_PENDING_CLIENT_ACTION'], disputeItem.Status);
            });

            if (!dispute) {
                console.warn('Cannot test creating dispute document because there\'s no dispute with expected status in the disputes list.');
                this.skip();
            }

            api.Disputes.createDisputeDocument(dispute.Id, {
                Type: 'DELIVERY_PROOF'
            }, function(data, response){
                document = data;
                done();
            });

        });

        it('should be created', function(){
            expect(document.Type).to.equal('DELIVERY_PROOF');
        });
    });

    describe('Create Dispute Document Page From File', function() {
        var dispute, document, page, requestResponse;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem){
                return _.contains(['PENDING_CLIENT_ACTION', 'REOPENED_PENDING_CLIENT_ACTION'], disputeItem.Status);
            });

            if (!dispute) {
                console.warn('Cannot test creating dispute document page because there\'s no dispute with expected status in the disputes list.');
                this.skip();
            }

            api.Disputes.createDisputeDocument(dispute.Id, {
                Type: 'DELIVERY_PROOF'
            }, function(data, response){
                document = data;
                api.Disputes.createDisputeDocumentPageFromFile(dispute.Id, document.Id, path.resolve(__dirname + '/../TestKycPageFile.png'), function(data, response){
                    page = data;
                    requestResponse = response;
                    done();
                });
            });

        });

        it('should be created', function(){
            expect(page).not.to.be.undefined;
            expect(requestResponse.statusCode).to.equal(204);
        });

        describe('Create Dispute Document Consult', function () {
            var consults;

            before(function(done) {
                if(!document) {
                    console.warn('Cannot test creating dispute document page consult because there\'s no dispute with expected status in the disputes list.');
                    this.skip();
                }

                api.Disputes.createDisputeDocumentConsult(document.Id, function(data, response) {
                    consults = data;
                    done();
                });
            });

            it('should be created', function () {
                expect(consults).not.to.be.undefined;
                expect(consults).to.be.an('array');
            });
        });
    });

    describe('Contest Dispute', function() {
        var dispute, contest;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem){
                return (_.contains(['CONTESTABLE', 'RETRIEVAL'], disputeItem.DisputeType) &&
                    _.contains(['PENDING_CLIENT_ACTION', 'REOPENED_PENDING_CLIENT_ACTION'], disputeItem.Status)
                );
            });

            if (!dispute) {
                console.warn('Cannot test contesting dispute because there\'s no disputes that can be contested in the disputes list.');
                this.skip();
            }

            var contestedFunds = null;

            if (dispute.Status === 'PENDING_CLIENT_ACTION') {
                contestedFunds = {
                    Amount: '10',
                    Currency: 'EUR'
                }
            }

            api.Disputes.contestDispute(dispute.Id, contestedFunds, function(data, response){
                contest = data;
                done();
            });

        });

        it('should be created', function(){
            expect(contest).not.to.be.undefined;
            expect(contest.Id).to.equal(dispute.Id);
            expect(contest.Status).to.equal('SUBMITTED');
        });
    });

    describe('Resubmit Dispute', function() {
        var dispute, resubmitted;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem){
                return (_.contains(['CONTESTABLE', 'RETRIEVAL'], disputeItem.DisputeType) &&
                    disputeItem.Status === 'REOPENED_PENDING_CLIENT_ACTION'
                );
            });

            if (!dispute) {
                console.warn('Cannot test contesting dispute because there\'s no disputes that can be resubmited in the disputes list.');
                this.skip();
            }

            api.Disputes.resubmitDispute(dispute.Id, function(data, response){
                resubmitted = data;
                done();
            });

        });

        it('should be resubmitted', function(){
            expect(resubmitted).not.to.be.undefined;
            expect(resubmitted.Id).to.equal(dispute.Id);
            expect(resubmitted.Status).to.equal('SUBMITTED');
        });
    });
    describe('Update', function() {
        var dispute, updated;

        before(function(done){
            dispute = {
                Id: disputes[0].Id,
                Tag: 'New Tag ' + new Date().getTime()
            };

            api.Disputes.update(dispute, function(data, response){
                updated = data;
                done();
            });

        });

        it('should be updated', function(){
            expect(updated).not.to.be.undefined;
            expect(updated.Tag).to.equal(dispute.Tag);
        });
    });

    describe('Close Dispute', function() {
        var dispute, closedDispute;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem){
                return _.contains(['PENDING_CLIENT_ACTION', 'REOPENED_PENDING_CLIENT_ACTION'], disputeItem.Status);
            });

            if (!dispute) {
                console.warn('Cannot test closing dispute because there\'s no available disputes with expected status in the disputes list.');
                this.skip();
            }

            api.Disputes.closeDispute(dispute.Id, function(data, response){
                closedDispute = data;
                done();
            });

        });

        it('should be closed', function(){
            expect(closedDispute).not.to.be.undefined;
            expect(closedDispute.Status).to.equal('CLOSED');
        });
    });

    describe('Get Document', function() {
        var dispute, document, createdDoc;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem){
                return _.contains(['PENDING_CLIENT_ACTION', 'REOPENED_PENDING_CLIENT_ACTION'], disputeItem.Status);
            });

            if (!dispute) {
                console.warn('Cannot test getting dispute\'s document because there\'s no dispute with expected status in the disputes list.');
                this.skip();
            }

            api.Disputes.createDisputeDocument(dispute.Id, {
                Type: 'OTHER'
            }, function(data, response){
                createdDoc = data;
                api.DisputeDocuments.get(createdDoc.Id, function(data, response){
                    document = data;
                    done();
                });
            });
        });

        it('should be retrieved', function(){
            expect(document).not.to.be.undefined;
            expect(document).to.eql(createdDoc);
        });
    });

    describe('Get Documents for Dispute', function() {
        var dispute, documents;

        before(function(done){
            dispute = _.findWhere(disputes, {Status: 'SUBMITTED'});

            if (!dispute) {
                console.warn('Cannot test getting dispute\'s documents because there\'s no available disputes with SUBMITTED status in the disputes list.');
                this.skip();
            }

            api.Disputes.getDocumentsForDispute(dispute.Id, function(data, response){
                documents = data;
                done();
            });
        });

        it('should be retrieved', function(){
            expect(documents.length).to.be.above(0);
        });
    });
    describe('Get All Documents', function() {
        var documents;

        before(function(done){
            api.DisputeDocuments.getAll(function(data, response){
                documents = data;
                done();
            });
        });

        it('should be retrieved', function(){
            expect(documents.length).to.be.above(0);
        });
    });
    describe('Update Dispute Document', function() {
        var dispute, document, updatedDoc;

        before(function(done){
            dispute = _.find(disputes, function(disputeItem){
                return _.contains(['PENDING_CLIENT_ACTION', 'REOPENED_PENDING_CLIENT_ACTION'], disputeItem.Status);
            });

            if (!dispute) {
                console.warn('Cannot test submitting dispute\'s documents because there\'s no dispute with expected status in the disputes list.');
                this.skip();
            }

            api.Disputes.createDisputeDocument(dispute.Id, {
                Type: 'DELIVERY_PROOF'
            }, function(data, response){
                document = data;
                // api.Disputes.createDisputeDocumentPageFromFile(dispute.Id, document.Id, path.resolve(__dirname + '../TestKycPageFile.png'), function(){
                //     done();
                // });
                
                api.Disputes.updateDisputeDocument(dispute.Id, _.extend({}, document, {
                    Status: 'VALIDATION_ASKED'
                }), function(data, response){
                    updatedDoc = data;
                    done();
                });
            });
        });

        it('should be updated', function(){
            expect(updatedDoc).not.to.be.undefined;
            expect(updatedDoc.Id).to.equal(document.Id);
            expect(updatedDoc.Status).to.equal('VALIDATION_ASKED');
        });
    });
    describe('Get Repudiation', function() {
        var dispute, transactions, repudiation;

        before(function(done){
            var self = this;

            dispute = _.find(disputes, function(disputeItem){
                return (disputeItem.InitialTransactionId && disputeItem.DisputeType === 'NOT_CONTESTABLE');
            });

            if (!dispute) {
                console.warn('Cannot test getting repudiation because there\'s no not costestable disputes with transaction ID in the disputes list.');
                this.skip();
            }

            api.Disputes.getTransactions(dispute.Id, function(data, response){
                transactions = data;
                if (!transactions.length) {
                    console.warn('Cannot test getting repudiation because dispute has no transaction.');
                    self.skip();
                }
                api.Disputes.getRepudiation(transactions[0].Id, function(data, response){
                    repudiation = data;
                    done();
                });
            });
        });

        it('should be retrieved', function(){
            expect(repudiation).not.to.be.undefined;
            expect(repudiation.Id).to.equal(transactions[0].Id);
        });
    });
    describe('Create Settlement Transfer', function() {
        var dispute, transactions, repudiation, settlementTransfer;

        before(function(done){
            var self = this;

            dispute = _.find(disputes, function(disputeItem){
                return (disputeItem.Status === 'CLOSED' && disputeItem.DisputeType === 'NOT_CONTESTABLE');
            });

            if (!dispute) {
                console.warn('Cannot test creating settlement transfer because there\'s no closed, not costestable disputes in the disputes list.');
                this.skip();
            }

            api.Disputes.getTransactions(dispute.Id, function(data, response){
                transactions = data;
                api.Disputes.getRepudiation(transactions[0].Id, function(data, response){
                    repudiation = data;
                    api.Disputes.createSettlementTransfer({
                        AuthorId: repudiation.AuthorId,
                        DebitedFunds: {
                            Amount: '1',
                            Currency: 'EUR'
                        },
                        Fees: {
                            Amount: '0',
                            Currency: 'EUR'
                        }
                    }, repudiation.Id, function(data, response){
                        settlementTransfer = data;
                        done();
                    });
                });
            });
        });

        it('should be retrieved', function(){
            expect(settlementTransfer).not.to.be.undefined;
            expect(settlementTransfer.Type).to.equal('TRANSFER');
            expect(settlementTransfer.Nature).to.equal('SETTLEMENT');
        });

        describe('Get', function(){
            var getSettlementTransfer;

            before(function(done){
                api.Disputes.getSettlementTransfer(settlementTransfer.Id, function(data, response){
                    getSettlementTransfer = data;
                    done();
                });
            });

            it('should be retrieved', function(){
                expect(getSettlementTransfer).not.to.be.undefined;
                expect(getSettlementTransfer).to.eql(settlementTransfer);
            });
        });
    });
    describe('Get Disputes Pending Settlement', function(){
        var getPendingSettlement;

        before(function(done){
            api.Disputes.getPendingSettlement(function(data, response){
                getPendingSettlement = data;
                done();
            })
        });

        it('should be retrieved', function(){
            expect(getPendingSettlement).not.to.be.undefined;
            expect(getPendingSettlement).to.be.an('array')
        })
    })
});