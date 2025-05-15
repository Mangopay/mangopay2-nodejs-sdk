var expect = require('chai').expect;
var helpers = require('../helpers');
var api = require('../main');

describe('Recipients', function() {
    var john = helpers.data.getUserNaturalScaOwner();
    var recipient;

    before(function(done){
        api.Users.create(john).then(function(data){
            john = data;
            const createRecipient = {
                DisplayName: "Alex Smith GBP account",
                PayoutMethodType: "LocalBankTransfer",
                RecipientType: "Individual",
                Currency: "GBP",
                IndividualRecipient: {
                    FirstName: "Alex",
                    LastName: "Smith",
                    Address: {
                        AddressLine1: "10 Kingsway",
                        City: "London",
                        PostalCode: "WC2B 6LH",
                        Country: "GB"
                    }
                },
                LocalBankTransfer: {
                    GBP: {
                        SortCode: "200000",
                        AccountNumber: "55779911"
                    }
                }
            };
            api.Recipients.create(createRecipient, john.Id).then(function(data){
                recipient = data;
                done();
            });
        });
    });

    describe('Create', function () {
        it('should be correctly created', function () {
            expect(recipient.Id).to.not.be.null;
            expect(recipient.Status).to.not.be.null;
            expect(recipient.DisplayName).to.not.be.null;
            expect(recipient.PayoutMethodType).to.not.be.null;
            expect(recipient.RecipientType).to.not.be.null;
            expect(recipient.IndividualRecipient).to.not.be.null;
            expect(recipient.LocalBankTransfer).to.not.be.null;
            expect(recipient.PendingUserAction).to.not.be.null;
        });
    });

    describe('GET', function () {
        var fetched;
        before(function(done){
            api.Recipients.get(recipient.Id).then(function(data){
                fetched = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(fetched.Id).to.not.be.null;
            expect(fetched.Id).to.be.eq(recipient.Id);
        });
    });

    describe('GET User Recipients', function () {
        var recipientsList;
        before(function(done){
            api.Recipients.getUserRecipients(john.Id).then(function(data){
                recipientsList = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(recipientsList).to.not.be.null;
            expect(recipientsList.length).to.be.gt(0);
        });
    });

    describe('GET Schema LocalBankTransfer Individual', function () {
        var schema;
        before(function(done){
            api.Recipients.getSchema("LocalBankTransfer", "Individual", "GBP", "GB").then(function(data){
                schema = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(schema).to.not.be.null;
            expect(schema.DisplayName).to.not.be.null;
            expect(schema.Currency).to.not.be.null;
            expect(schema.RecipientType).to.not.be.null;
            expect(schema.PayoutMethodType).to.not.be.null;
            expect(schema.RecipientScope).to.not.be.null;
            expect(schema.Tag).to.not.be.null;
            expect(schema.LocalBankTransfer).to.not.be.null;
            expect(schema.IndividualRecipient).to.not.be.null;
            expect(schema.InternationalBankTransfer).to.be.undefined;
            expect(schema.BusinessRecipient).to.be.undefined;

        });
    });

    describe('GET Schema InternationalBankTransfer Business', function () {
        var schema;
        before(function(done){
            api.Recipients.getSchema("InternationalBankTransfer", "Business", "GBP", "GB").then(function(data){
                schema = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(schema).to.not.be.null;
            expect(schema.DisplayName).to.not.be.null;
            expect(schema.Currency).to.not.be.null;
            expect(schema.RecipientType).to.not.be.null;
            expect(schema.PayoutMethodType).to.not.be.null;
            expect(schema.RecipientScope).to.not.be.null;
            expect(schema.Tag).to.not.be.null;
            expect(schema.InternationalBankTransfer).to.not.be.null;
            expect(schema.BusinessRecipient).to.not.be.null;
            expect(schema.LocalBankTransfer).to.be.undefined;
            expect(schema.IndividualRecipient).to.be.undefined;
        });
    });

    describe('GET Payout Methods', function () {
        var payoutMethods;
        before(function(done){
            api.Recipients.getPayoutMethods("DE", "GBP").then(function(data){
                payoutMethods = data;
                done();
            });
        });

        it('should be correctly fetched', function () {
            expect(payoutMethods).to.not.be.null;
            expect(payoutMethods.AvailablePayoutMethods.length).to.be.gt(0);
        });
    });

    describe('Validate recipient passes', function () {
        before(function(done){
            api.Recipients.validate(recipient, john.Id).then(function(){
                done();
            });
        });

        it('should work', function () {
            // dummy check (if the request doesn't work, it will throw error and not get here)
            expect(true).to.eq(true);
        });
    });

    describe('Validate Recipient fails', function () {
        var errorResult;

        before(function (done) {
            const currency = recipient.Currency;
            recipient.Currency = undefined;
            api.Recipients.validate(recipient, john.Id).then(function (data) {
                done();
            })
                .catch(function (error) {
                    errorResult = error;
                    // put back the currency
                    recipient.Currency = currency;
                    done();
                });
        });

        it('Should return error for missing param', function(){
            expect(errorResult.Message).to.contain("One or several required parameters are missing or incorrect");
        });
    });

    describe.skip('Deactivate', function () {
        console.warn("A recipient needs to be manually activated before running the test");
        var fetched;
        var deactivated;
        before(function(done){
            api.Recipients.deactivate(recipient.Id).then(function(data){
                deactivated = data;
                api.Recipients.get(recipient.Id).then(function(data){
                    fetched = data;
                    done();
                });
            });
        });

        it('should be deactivated', function () {
            expect(deactivated.Id).to.not.be.null;
            expect(fetched.Id).to.not.be.null;
            expect(recipient.Status).to.eq("PENDING");
            expect(deactivated.Status).to.eq("DEACTIVATED");
            expect(fetched.Status).to.eq("DEACTIVATED");
        });
    });
});
