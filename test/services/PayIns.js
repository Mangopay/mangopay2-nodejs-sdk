var expect = require('chai').expect;

var helpers = require('../helpers');
var mangopay = require('../../index');

var api = global.api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientApiKey: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});

describe('PayIns', function () {
    var payIn;
    var john = helpers.data.getUserNatural();

    before(function (done) {
        api.Users.create(john, function () {
            done();
        });
    });

    describe('Card Web', function () {

        before(function (done) {
            helpers.getNewPayInCardWeb(api, john, function (data, response) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('CARD');
                expect(payIn.ExecutionType).to.equal('WEB');
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).not.to.be.undefined;
                expect(getPayIn.PaymentType).to.equal('CARD');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Status).to.equal('CREATED');
                expect(getPayIn.ExecutionDate).to.be.null;
                expect(getPayIn.RedirectURL).not.to.be.undefined;
                expect(getPayIn.ReturnURL).not.to.be.undefined;
            });
        });
    });

    describe('Card Direct', function () {
        var payIn;

        before(function (done) {
            helpers.getNewPayInCardDirect(api, john, function (data, response) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('CARD');
                expect(payIn.ExecutionType).to.equal('DIRECT');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Status).to.equal('SUCCEEDED');
                expect(payIn.Type).to.equal('PAYIN');
                expect(payIn.SecurityInfo.AVSResult).to.equal('NO_CHECK')
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('CARD');
                expect(getPayIn.ExecutionType).to.equal('DIRECT');
                expect(getPayIn.CardId).not.to.be.null;
            });
        });

        describe('Create Refund', function () {
            var refund;

            before(function (done) {
                helpers.getNewRefundForPayIn(api, john, payIn, function (data, response) {
                    refund = data;
                    done();
                });
            });

            it('should succeed', function () {
                expect(refund.DebitedFunds).to.eql(payIn.DebitedFunds);
                expect(refund.Type).to.equal('PAYOUT');
                expect(refund.Nature).to.equal('REFUND');
            });
        });
    });

    describe('PreAuthorizedDirect', function () {
        var preAuthorization, payIn, wallet;
        var transactionsData;

        before(function (done) {
            helpers.getUserCardPreAuthorization(api, john, function (data, response) {
                preAuthorization = data;

                wallet = {
                    Owners: [john.Id],
                    Currency: 'EUR',
                    Description: 'WALLET IN EUR'
                };

                api.Wallets.create(wallet).then(function () {
                    payIn = {
                        CreditedWalletId: wallet.Id,
                        AuthorId: john.Id,
                        DebitedFunds: {
                            Amount: 1000,
                            Currency: 'EUR'
                        },
                        Fees: {
                            Amount: 0,
                            Currency: 'EUR'
                        },
                        CardId: preAuthorization.CardId,
                        SecureModeReturnURL: 'http://test.com',
                        PaymentType: 'PREAUTHORIZED',
                        ExecutionType: 'DIRECT',
                        PreauthorizationId: preAuthorization.Id
                    };

                    api.PayIns.create(payIn, function (data, response) {
                        done();
                    });
                });
            });
        });

        it('should succeed', function () {
            expect(payIn.Id).not.to.be.undefined;
            expect(payIn.data.AuthorId).to.equal(john.Id);
            expect(payIn.data.PaymentType).to.equal('PREAUTHORIZED');
            expect(payIn.data.ExecutionType).to.equal('DIRECT');
            expect(payIn.data.CardId).not.to.be.null;
            expect(payIn.data.Type).to.equal('PAYIN');
            expect(payIn.data.Status).to.equal('SUCCEEDED');
        });

        before(function(done){
            api.CardPreAuthorizations.getTransactions(preAuthorization.Id, function(data, response){
                transactionsData = data;
                done();
            });
        });

        it('should get transactions', function () {
            expect(transactionsData[0].Status).to.equal('SUCCEEDED');
        });
    });

    describe('BankWireDirect', function () {
        var payIn, wallet;

        before(function (done) {
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(wallet).then(function () {
                done();
            });
        });

        describe('Create', function () {
            before(function (done) {
                payIn = {
                    CreditedWalletId: wallet.Id,
                    AuthorId: john.Id,
                    DeclaredDebitedFunds: {
                        Amount: 10000,
                        Currency: 'EUR'
                    },
                    DeclaredFees: {
                        Amount: 0,
                        Currency: 'EUR'
                    },
                    PaymentType: 'BANK_WIRE',
                    ExecutionType: 'DIRECT'
                };

                api.PayIns.create(payIn, function (data, response) {
                    done();
                });
            });

            it('should succeed', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.data.AuthorId).to.equal(john.Id);
                expect(payIn.data.PaymentType).to.equal('BANK_WIRE');
                expect(payIn.data.ExecutionType).to.equal('DIRECT');
                expect(payIn.data.Type).to.equal('PAYIN');
                expect(payIn.data.Status).to.equal('CREATED');
            });
        });

        describe('Get', function () {
            var getPayIn;

            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done();
                });
            });

            it('should succeed', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.BankAccount.Type).to.equal('IBAN');
                expect(getPayIn.AuthorId).to.equal(john.Id);
                expect(getPayIn.ExecutionType).to.equal('DIRECT');
                expect(getPayIn.Type).to.equal('PAYIN');
                expect(getPayIn.Status).to.equal('CREATED');
            });
        });
    });

    describe('DirectDebitWeb', function () {
        var payIn, wallet;

        before(function (done) {
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(wallet).then(function () {
                done();
            });
        });

        describe('Create', function () {
            before(function (done) {
                payIn = {
                    CreditedWalletId: wallet.Id,
                    AuthorId: john.Id,
                    DebitedFunds: {
                        Amount: 10000,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 100,
                        Currency: 'EUR'
                    },
                    PaymentType: 'DIRECT_DEBIT',
                    ExecutionType: 'WEB',
                    DirectDebitType: 'GIROPAY',
                    ReturnURL: 'http://www.mysite.com/returnURL/',
                    Culture: 'FR',
                    PAYLINE: 'https://www.maysite.com/payline_template/'
                };

                api.PayIns.create(payIn, function (data, response) {
                    done();
                });
            });

            it('should succeed', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.data.AuthorId).to.equal(john.Id);
                expect(payIn.data.PaymentType).to.equal('DIRECT_DEBIT');
                expect(payIn.data.ExecutionType).to.equal('WEB');
                expect(payIn.data.CardId).not.to.be.null;
                expect(payIn.data.Type).to.equal('PAYIN');
                expect(payIn.data.Status).to.equal('CREATED');
            });
        });
    });

    describe('PayPalWeb', function () {
        var payIn, wallet;

        before(function (done) {
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(wallet).then(function () {
                done();
            });
        });

        describe('Create', function () {
            var shippingAddress = {
                RecipientName: "Mangopay Test",
                Address: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                }
            };

            before(function (done) {
                payIn = {
                    CreditedWalletId: wallet.Id,
                    AuthorId: john.Id,
                    CreditedUserId: john.Id,
                    DebitedFunds: {
                        Amount: 10000,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 100,
                        Currency: 'EUR'
                    },
                    PaymentType: 'PAYPAL',
                    ExecutionType: 'WEB',
                    ReturnURL: 'http://www.mysite.com/returnURL/',
                    ShippingAddress: shippingAddress
                };

                api.PayIns.create(payIn, function (data, response) {
                    done();
                });
            });

            it('should be created', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.data.AuthorId).to.equal(john.Id);
                expect(payIn.data.PaymentType).to.equal('PAYPAL');
                expect(payIn.data.ExecutionType).to.equal('WEB');
                expect(payIn.data.CardId).not.to.be.null;
                expect(payIn.data.Type).to.equal('PAYIN');
                expect(payIn.data.Status).to.equal('CREATED');
            });

            describe('Get', function () {
                var getPayIn;

                before(function (done) {
                    api.PayIns.get(payIn.Id, function (data, response) {
                        getPayIn = data;
                        done();
                    });
                });

                it('should be retrieved', function () {
                    expect(getPayIn.Id).not.to.be.undefined;
                    expect(getPayIn.Id).to.equal(payIn.Id);
                    expect(getPayIn.ShippingAddress).not.to.be.undefined;
                    expect(getPayIn.ShippingAddress).to.deep.equal(shippingAddress);
                });
            });
        });

        describe("Get with Email", function () {
            var payInId = "54088959";
            var accountEmail = "paypal-buyer-user@mangopay.com";
            var payinWithEmail;

            before(function (done) {
                api.PayIns.get(payInId, function (data, response) {
                    payinWithEmail = data;
                    done();
                });
            });

            it("should contain buyer's email", function () {
                expect(payinWithEmail).not.to.be.undefined;
                expect(payinWithEmail.Id).to.equal(payInId);
                expect(payinWithEmail.PaypalBuyerAccountEmail).not.to.be.undefined;
                expect(payinWithEmail.PaypalBuyerAccountEmail).to.equal(accountEmail);
            });
        });

    });

    // describe('ApplePay', function () {
    //     var applePayPayIn, wallet;

    //     before(function (done) {
    //         wallet = {
    //             Owners: [john.Id],
    //             Currency: 'EUR',
    //             Description: 'WALLET IN EUR'
    //         };

    //         api.Wallets.create(wallet).then(function () {
    //             done();
    //         });
    //     });

    //     describe('Create', function () {

    //         var paymentData = {
    //             TransactionId: '061EB32181A2D9CA42AD16031B476EEBAA62A9A095AD660E2759FBA52B51A61',
    //             Network: 'VISA',
    //             TokenData: "{\"version\":\"EC_v1\",\"data\":\"w4HMBVqNC9ghPP4zncTA\/0oQAsduERfsx78oxgniynNjZLANTL6+0koEtkQnW\/K38Zew8qV1GLp+fLHo+qCBpiKCIwlz3eoFBTbZU+8pYcjaeIYBX9SOxcwxXsNGrGLk+kBUqnpiSIPaAG1E+WPT8R1kjOCnGvtdombvricwRTQkGjtovPfzZo8LzD3ZQJnHMsWJ8QYDLyr\/ZN9gtLAtsBAMvwManwiaG3pOIWpyeOQOb01YcEVO16EZBjaY4x4C\/oyFLWDuKGvhbJwZqWh1d1o9JT29QVmvy3Oq2JEjq3c3NutYut4rwDEP4owqI40Nb7mP2ebmdNgnYyWfPmkRfDCRHIWtbMC35IPg5313B1dgXZ2BmyZRXD5p+mr67vAk7iFfjEpu3GieFqwZrTl3\/pI5V8Sxe3SIYKgT5Hr7ow==\",\"signature\":\"MIAGCSqGSIb3DQEHAqCAMIACAQExDzANBglghkgBZQMEAgEFADCABgkqhkiG9w0BBwEAAKCAMIID5jCCA4ugAwIBAgIIaGD2mdnMpw8wCgYIKoZIzj0EAwIwejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTE2MDYwMzE4MTY0MFoXDTIxMDYwMjE4MTY0MFowYjEoMCYGA1UEAwwfZWNjLXNtcC1icm9rZXItc2lnbl9VQzQtU0FOREJPWDEUMBIGA1UECwwLaU9TIFN5c3RlbXMxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEgjD9q8Oc914gLFDZm0US5jfiqQHdbLPgsc1LUmeY+M9OvegaJajCHkwz3c6OKpbC9q+hkwNFxOh6RCbOlRsSlaOCAhEwggINMEUGCCsGAQUFBwEBBDkwNzA1BggrBgEFBQcwAYYpaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZWFpY2EzMDIwHQYDVR0OBBYEFAIkMAua7u1GMZekplopnkJxghxFMAwGA1UdEwEB\/wQCMAAwHwYDVR0jBBgwFoAUI\/JJxE+T5O8n5sT2KGw\/orv9LkswggEdBgNVHSAEggEUMIIBEDCCAQwGCSqGSIb3Y2QFATCB\/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMDQGA1UdHwQtMCswKaAnoCWGI2h0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlYWljYTMuY3JsMA4GA1UdDwEB\/wQEAwIHgDAPBgkqhkiG92NkBh0EAgUAMAoGCCqGSM49BAMCA0kAMEYCIQDaHGOui+X2T44R6GVpN7m2nEcr6T6sMjOhZ5NuSo1egwIhAL1a+\/hp88DKJ0sv3eT3FxWcs71xmbLKD\/QJ3mWagrJNMIIC7jCCAnWgAwIBAgIISW0vvzqY2pcwCgYIKoZIzj0EAwIwZzEbMBkGA1UEAwwSQXBwbGUgUm9vdCBDQSAtIEczMSYwJAYDVQQLDB1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwHhcNMTQwNTA2MjM0NjMwWhcNMjkwNTA2MjM0NjMwWjB6MS4wLAYDVQQDDCVBcHBsZSBBcHBsaWNhdGlvbiBJbnRlZ3JhdGlvbiBDQSAtIEczMSYwJAYDVQQLDB1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATwFxGEGddkhdUaXiWBB3bogKLv3nuuTeCN\/EuT4TNW1WZbNa4i0Jd2DSJOe7oI\/XYXzojLdrtmcL7I6CmE\/1RFo4H3MIH0MEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcwAYYqaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZXJvb3RjYWczMB0GA1UdDgQWBBQj8knET5Pk7yfmxPYobD+iu\/0uSzAPBgNVHRMBAf8EBTADAQH\/MB8GA1UdIwQYMBaAFLuw3qFYM4iapIqZ3r6966\/ayySrMDcGA1UdHwQwMC4wLKAqoCiGJmh0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlcm9vdGNhZzMuY3JsMA4GA1UdDwEB\/wQEAwIBBjAQBgoqhkiG92NkBgIOBAIFADAKBggqhkjOPQQDAgNnADBkAjA6z3KDURaZsYb7NcNWymK\/9Bft2Q91TaKOvvGcgV5Ct4n4mPebWZ+Y1UENj53pwv4CMDIt1UQhsKMFd2xd8zg7kGf9F3wsIW2WT8ZyaYISb1T4en0bmcubCYkhYQaZDwmSHQAAMYIBizCCAYcCAQEwgYYwejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTAghoYPaZ2cynDzANBglghkgBZQMEAgEFAKCBlTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xOTA1MjMxMTA1MDdaMCoGCSqGSIb3DQEJNDEdMBswDQYJYIZIAWUDBAIBBQChCgYIKoZIzj0EAwIwLwYJKoZIhvcNAQkEMSIEIIvfGVQYBeOilcB7GNI8m8+FBVZ28QfA6BIXaggBja2PMAoGCCqGSM49BAMCBEYwRAIgU01yYfjlx9bvGeC5CU2RS5KBEG+15HH9tz\/sg3qmQ14CID4F4ZJwAz+tXAUcAIzoMpYSnM8YBlnGJSTSp+LhspenAAAAAAAA\",\"header\":{\"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE0rs3wRpirXjPbFDQfPRdfEzRIZDWm0qn7Y0HB0PNzV1DDKfpYrnhRb4GEhBF\/oEXBOe452PxbCnN1qAlqcSUWw==\",\"publicKeyHash\":\"saPRAqS7TZ4bAYwzBj8ezDDC55ZolyH1FL+Xc8fd93o=\",\"transactionId\":\"b061eb32181a2d9ca42ad16031b476eebaa62a9a095ad660e2759fba52b51a61\"}}"
    //         };

    //         before(function (done) {
    //             applePayPayIn = {
    //                 CreditedWalletId: wallet.Id,
    //                 AuthorId: john.Id,
    //                 CreditedUserId: john.Id,
    //                 DebitedFunds: {
    //                     Amount: 199,
    //                     Currency: 'EUR'
    //                 },
    //                 Fees: {
    //                     Amount: 1,
    //                     Currency: 'EUR'
    //                 },
    //                 PaymentType: 'APPLEPAY',
    //                 ExecutionType: 'DIRECT',
    //                 PaymentData: paymentData,
    //                 Tag: "Create an ApplePay card direct Payin",
    //                 StatementDescriptor: "php"
    //             };

    //             api.PayIns.create(applePayPayIn, function (data, response) {
    //                 done();
    //             });
    //         });

    //         it('should be created', function () {
    //             expect(applePayPayIn.Id).not.to.be.undefined;
    //             expect(applePayPayIn.data.AuthorId).to.equal(john.Id);
    //             expect(applePayPayIn.data.PaymentType).to.equal('APPLEPAY');
    //             expect(applePayPayIn.data.ExecutionType).to.equal('DIRECT');
    //             expect(applePayPayIn.data.Type).to.equal('PAYIN');
    //             expect(applePayPayIn.data.Status).to.equal('SUCCEEDED');
    //         });
    //     });
    // });

    describe.skip('GooglePay', function () {
        var googlePayIn, wallet;

        before(function (done) {
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(wallet).then(function () {
                done();
            });
        });

        describe('Create', function () {

            var paymentData = {
                TransactionId: 'placeholder',
                Network: 'placeholder',
                TokenData: "placeholder"
            };

            before(function (done) {
                googlePayIn = {
                    CreditedWalletId: wallet.Id,
                    AuthorId: john.Id,
                    CreditedUserId: john.Id,
                    DebitedFunds: {
                        Amount: 199,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 1,
                        Currency: 'EUR'
                    },
                    PaymentType: 'GOOGLEPAY',
                    ExecutionType: 'DIRECT',
                    PaymentData: paymentData,
                    Tag: "Create an GooglePay card direct Payin",
                    StatementDescriptor: "php"
                };

                api.PayIns.create(googlePayIn, function (data, response) {
                    done();
                });
            });

            it('should be created', function () {
                expect(googlePayIn.Id).not.to.be.undefined;
                expect(googlePayIn.data.AuthorId).to.equal(john.Id);
                expect(googlePayIn.data.PaymentType).to.equal('GOOGLEPAY');
                expect(googlePayIn.data.ExecutionType).to.equal('DIRECT');
                expect(googlePayIn.data.Type).to.equal('PAYIN');
                expect(googlePayIn.data.Status).to.equal('SUCCEEDED');
            });
        });
    });

    describe('Get Refunds', function () {
        var getRefunds;

        before(function (done) {
            api.PayIns.getRefunds(payIn.Id, function (data, response) {
                getRefunds = data;
                done();
            });
        });

        it('should be retrieved', function () {
            expect(getRefunds).not.to.be.undefined;
            expect(getRefunds).to.be.an('array');
        });
    });

    describe('ExetrnalInstructionIBAN', function () {

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get("74980101", function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.PaymentType).to.equal('BANK_WIRE');
                expect(getPayIn.ExecutionType).to.equal('EXTERNAL_INSTRUCTION');
                expect(getPayIn.DebitedBankAccount.Type).to.equal('IBAN');
                expect(getPayIn.DebitedBankAccount.IBAN).not.to.be.null;
                expect(getPayIn.DebitedBankAccount.AccountNumber).to.be.null;
            });
        });
    });

    describe('ExetrnalInstructionAccountNumber', function () {

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get("74981216", function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.PaymentType).to.equal('BANK_WIRE');
                expect(getPayIn.ExecutionType).to.equal('EXTERNAL_INSTRUCTION');
                expect(getPayIn.DebitedBankAccount.Type).to.equal('OTHER');
                expect(getPayIn.DebitedBankAccount.IBAN).to.be.null;
                expect(getPayIn.DebitedBankAccount.AccountNumber).not.to.be.null;
            });
        });
    });

    describe('Recurring Payments', function() {
        var cardId;
        var walletId;
        before('Create a wallet with money and a card', function(done){
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };
            cardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };
            api.Wallets.create(wallet).then(function(){
                api.CardRegistrations.create(cardRegistration, function() {
                    helpers.getPaylineCorrectRegistartionData(cardRegistration, function(data, response){
                        cardRegistration.RegistrationData = data;
                        api.CardRegistrations.update(cardRegistration).then(function(data){
                            updatedCardRegistration = data;
                            cardId = updatedCardRegistration.CardId;
                            walletId = wallet.Id;
                        });
                        api.Cards.get(cardRegistration.CardId, function(data, response) {
                            card = data;
                            api.PayIns.create({
                                CreditedWalletId: wallet.Id,
                                AuthorId: john.Id,
                                DebitedFunds: {
                                    Amount: 10000,
                                    Currency: 'EUR'
                                },
                                Fees: {
                                    Amount: 0,
                                    Currency: 'EUR'
                                },
                                CardId: card.Id,
                                SecureMode: 'DEFAULT',
                                SecureModeReturnURL: 'https://test.com',
                                PaymentType: 'CARD',
                                ExecutionType: 'DIRECT'
                            }, function(data, response) {
                                done();
                            })
                        })
                    })
                })
            })
        });

        describe('Create a Recurring Payment', function() {
            var recurring;
            before(function(done){
                recurringPayin = {
                    AuthorId: john.Id,
                    CardId: cardId,
                    CreditedUserId: john.Id,
                    CreditedWalletId: walletId,
                    FirstTransactionDebitedFunds: {
                        Amount: 10,
                        Currency: 'EUR'
                    },
                    FirstTransactionFees: {
                        Amount: 1,
                        Currency: 'EUR'
                    },
                    Billing: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    },
                    Shipping: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    },
                    FreeCycles: 0
                };

                api.PayIns.createRecurringPayment(recurringPayin, function(data, response){
                    recurring = data;
                }).then(function(){
                    cit = {
                        RecurringPayinRegistrationId: recurring.Id,
                        BrowserInfo: {
                            AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
                            JavaEnabled: true,
                            Language: "FR-FR",
                            ColorDepth: 4,
                            ScreenHeight: 1800,
                            ScreenWidth: 400,
                            JavascriptEnabled: true,
                            TimeZoneOffset: "+60",
                            UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                        },
                        IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
                        SecureModeReturnURL: "http://www.my-site.com/returnurl",
                        StatementDescriptor: "lorem",
                        Tag: "custom meta",
                        DebitedFunds: {
                            Amount: 10,
                            Currency: 'EUR'
                        },
                        Fees: {
                            Amount: 1,
                            Currency: 'EUR'
                        },
                    };

                    api.PayIns.createRecurringPayInRegistrationCIT(cit, function(data, response){
                        createCit = data;
                        done();
                    })
                })
            })

            it('should be created', function() {
                expect(recurring).to.not.be.null;
                expect(recurring.FreeCycles).to.not.be.null;
                expect(createCit).to.not.be.null;
            })
        })

        describe('Get Recurring Payment', function () {
            var recurring;
            before(function(done){
                recurringPayin = {
                    AuthorId: john.Id,
                    CardId: cardId,
                    CreditedUserId: john.Id,
                    CreditedWalletId: walletId,
                    FirstTransactionDebitedFunds: {
                        Amount: 10,
                        Currency: 'EUR'
                    },
                    FirstTransactionFees: {
                        Amount: 1,
                        Currency: 'EUR'
                    },
                    Billing: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    },
                    Shipping: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    },
                    FreeCycles: 0
                };

                api.PayIns.createRecurringPayment(recurringPayin, function(data, response){
                    recurring = data;
                }).then(function(){
                    api.PayIns.getRecurringPayin(recurring.Id, function (data, response) {
                        getRecurring = data;
                        done();
                    });
                });
            });

            it('should get the RecurringPayin', function () {
                expect(getRecurring.Id).not.to.be.undefined;
                expect(getRecurring.Status).not.to.be.undefined;
                expect(getRecurring.FreeCycles).not.to.be.undefined;
            });
        });

        describe('Update Recurring Payment', function () {
            var recurring, updateRec;
            before(function(done){
                recurringPayin = {
                    AuthorId: john.Id,
                    CardId: cardId,
                    CreditedUserId: john.Id,
                    CreditedWalletId: walletId,
                    FirstTransactionDebitedFunds: {
                        Amount: 10,
                        Currency: 'EUR'
                    },
                    FirstTransactionFees: {
                        Amount: 1,
                        Currency: 'EUR'
                    },
                    Billing: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    },
                    Shipping: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    }
                };

                api.PayIns.createRecurringPayment(recurringPayin, function (data, response) {
                    recurring = data;
                }).then(function () {
                    updateObj = {
                        Billing: {
                            FirstName: 'TEST',
                            LastName: 'TEST',
                            Address: {
                                AddressLine1: '1 MangoPay Street',
                                AddressLine2: 'The Loop',
                                City: 'Paris',
                                Region: 'Ile de France',
                                PostalCode: '75001',
                                Country: 'FR'
                            }
                        },
                        Shipping: {
                            FirstName: 'TEST',
                            LastName: 'TEST',
                            Address: {
                                AddressLine1: '1 MangoPay Street',
                                AddressLine2: 'The Loop',
                                City: 'Paris',
                                Region: 'Ile de France',
                                PostalCode: '75001',
                                Country: 'FR'
                            }
                        },
                        Status: "ENDED"
                    };

                    api.PayIns.updateRecurringPayin(recurring.Id, updateObj, function (data, response) {
                        updateRec = data;
                        done();
                    });
                });
            });

            it('should get the updated RecurringPayin', function () {
                expect(updateRec.Id).not.to.be.undefined;
                expect(updateRec.Status).not.to.be.undefined;
                expect(updateRec.Status).to.equal("ENDED");
            });
        });
    });

    describe('Payconiq Web', function () {
        var payIn, wallet;

        before(function (done) {
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(wallet).then(function () {
                payIn = {
                    Tag: 'custom meta',
                    CreditedWalletId: wallet.Id,
                    AuthorId: john.Id,
                    DebitedFunds: {
                        Amount: 1000,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 0,
                        Currency: 'EUR'
                    },
                    PaymentType: 'PAYCONIQ',
                    ExecutionType: 'WEB',
                    ReturnURL: 'http://www.my-site.com/returnURL',
                    Country: 'BE'
                };

                api.PayIns.create(payIn, function (data, response) {
                    payIn = data;
                    done();
                });
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('PAYCONIQ');
                expect(payIn.ExecutionType).to.equal('WEB');
                expect(payIn.Status).to.equal('CREATED');
                expect(payIn.RedirectURL).not.to.be.undefined;
                expect(payIn.DeepLinkURL).not.to.be.undefined;
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).not.to.be.undefined;
                expect(getPayIn.PaymentType).to.equal('PAYCONIQ');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Status).to.equal('CREATED');
                expect(payIn.RedirectURL).not.to.be.undefined;
                expect(payIn.DeepLinkURL).not.to.be.undefined;
            });
        });
    });

    describe('Mbway Web', function () {
        var payIn;

        before(function (done) {
            helpers.getNewPayInMbwayWeb(api, john, function (data, response) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('MBWAY');
                expect(payIn.ExecutionType).to.equal('WEB');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Status).to.equal('CREATED');
                expect(payIn.Type).to.equal('PAYIN');
                expect(payIn.Phone).not.to.be.null;
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('MBWAY');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Phone).not.to.be.null;
            });
        });
    });

    describe('PayPal Web V2', function () {
        var payIn;

        before(function (done) {
            helpers.getNewPayInPayPalWeb(api, john, function (data, response) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('PAYPAL');
                expect(payIn.ExecutionType).to.equal('WEB');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Status).to.equal('CREATED');
                expect(payIn.Type).to.equal('PAYIN');
                expect(payIn.LineItems).not.to.be.null;
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('PAYPAL');
                expect(getPayIn.ExecutionType).to.equal('WEB');
            });
        });
    })

    describe('Multibanco Web', function () {
        var payIn;

        before(function (done) {
            helpers.getNewPayInMultibancoWeb(api, john, function (data) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('MULTIBANCO');
                expect(payIn.ExecutionType).to.equal('WEB');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Status).to.equal('CREATED');
                expect(payIn.Type).to.equal('PAYIN');
                expect(payIn.Phone).not.to.be.null;
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('MULTIBANCO');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Phone).not.to.be.null;
            });
        });
    });

    describe('Satispay Web', function () {
        var payIn;

        before(function (done) {
            helpers.getNewPayInSatispayWeb(api, john, function (data) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('SATISPAY');
                expect(payIn.ExecutionType).to.equal('WEB');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Status).to.equal('CREATED');
                expect(payIn.Type).to.equal('PAYIN');
                expect(payIn.Phone).not.to.be.null;
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('SATISPAY');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Phone).not.to.be.null;
            });
        });
    });

    describe('Blik Web', function () {
        var payIn;

        before(function (done) {
            helpers.getNewPayInBlikWeb(api, john, function (data) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('BLIK');
                expect(payIn.ExecutionType).to.equal('WEB');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Status).to.equal('CREATED');
                expect(payIn.Type).to.equal('PAYIN');
                expect(payIn.Phone).not.to.be.null;
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('BLIK');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Phone).not.to.be.null;
            });
        });
    });

    describe('Klarna Web', function () {
        var payIn;

        before(function (done) {
            helpers.getNewPayInKlarnaWeb(api, john, function (data) {
                payIn = data;
                done();
            });
        });

        describe('Create', function () {
            it('should create the PayIn', function () {
                expect(payIn.Id).not.to.be.undefined;
                expect(payIn.PaymentType).to.equal('KLARNA');
                expect(payIn.ExecutionType).to.equal('WEB');
                expect(payIn.AuthorId).to.equal(john.Id);
                expect(payIn.Type).to.equal('PAYIN');
                expect(payIn.Phone).not.to.be.null;
            });
        });

        describe('Get', function () {
            var getPayIn;
            before(function (done) {
                api.PayIns.get(payIn.Id, function (data, response) {
                    getPayIn = data;
                    done()
                });
            });

            it('should get the PayIn', function () {
                expect(getPayIn.Id).to.equal(payIn.Id);
                expect(getPayIn.PaymentType).to.equal('KLARNA');
                expect(getPayIn.ExecutionType).to.equal('WEB');
                expect(getPayIn.Phone).not.to.be.null;
            });
        });
    });

    describe('GooglePay V2', function () {
        var googlePayIn, wallet;

        before(function (done) {
            wallet = {
                Owners: [john.Id],
                Currency: 'EUR',
                Description: 'WALLET IN EUR'
            };

            api.Wallets.create(wallet).then(function () {
                done();
            });
        });

        describe('Create', function () {

            var paymentData = "{\"signature\":\"MEUCIQCLXOan2Y9DobLVSOeD5V64Peayvz0ZAWisdz/1iTdthAIgVFb4Hve4EhtW81k46S" +
                "iMlnXLIiCn1h2+vVQGjHe+sSo\\u003d\",\"intermediateSigningKey\":{\"signedKey\":\"{\\\"keyValue\\\":\\\"M" +
                "FkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEDGRER6R6PH6K39YTIYX+CpDNej6gQgvi/Wx19SOPtiDnkjAl4/LF9pXlvZYe+aJH0Dy" +
                "095I6BlfY8bNBB5gjPg\\\\u003d\\\\u003d\\\",\\\"keyExpiration\\\":\\\"1688521049102\\\"}\"," +
                "\"signatures\":[\"MEYCIQDup1B+rkiPAWmpg7RmqY0NfgdGhmdyL8wvAX+6C1aOU2QIhAIZACSDQ/ZexIyEia5KrRlG2B+y3AnK" +
                "NlhRzumRcnNOR\"]},\"protocolVersion\":\"ECv2\",\"signedMessage\":\"{\\\"encryptedMessage\\\":\\\"YSSG" +
                "K9yFdKP+mJB5+wAjnOujnThPM1E/KbbJxd3MDzPVI66ip1DBESldvQXYjjeLq6Rf1tKE9oLwwaj6u0/gU7Z9t3g1MoW+9YoEE1bs1" +
                "IxImif7IQGAosfYjjbBBfDkOaqEs2JJC5qt6xjKO9lQ/E6JPkPFGqF7+OJ1vzmD83Pi3sHWkVge5MhxXQ3yBNhrjus3kV7zUoYA+u" +
                "qNrciWcWypc1NndF/tiwSkvUTzM6n4dS8X84fkJiSO7PZ65C0yw0mdybRRnyL2fFdWGssve1zZFAvYfzcpNamyuZGGlu/SCoayit" +
                "ojmMsqe5Cu0efD9+WvvDr9PA+Vo1gzuz7LmiZe81SGvdFhRoq62FBAUiwSsi2A3pWinZxM2XbYNph+HJ5FCNspWhz4ur9JG4ZMLem" +
                "CXuaybvL++W6PWywAtoiE0mQcBIX3vhOq5itv0RkaKVe6nbcAS2UryRz2u /nDCJLKpIv2Wi11NtCUT2mgD8F6qfcXhvVZHyeLqZ1O" +
                "LgCudTTSdKirzezbgPTg4tQpW++KufeD7bgG+01XhCWt+7/ftqcSf8n//gSRINne8j2G6w+2\\\",\\" +
                "\"ephemeralPublicKey\\\":\\\"BLY2+R8C0T+BSf/W3HEq305qH63IGmJxMVmbfJ6+x1V7GQg9W9v7eHc3j+8TeypVn+nRl" +
                "Pu98tivuMXECg+rWZs\\\\u003d\\\",\\\"tag\\\":\\\"MmEjNdLfsDNfYd/FRUjoJ4/IfLypNRqx8zgHfa6Ftmo\\\\u003d\\\"}\"}"

            before(function (done) {
                googlePayIn = {
                    AuthorId: john.Id,
                    CreditedWalletId: wallet.Id,
                    DebitedFunds: {
                        Amount: 199,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 1,
                        Currency: 'EUR'
                    },
                    PaymentType: 'GOOGLE_PAY',
                    ExecutionType: 'DIRECT',
                    PaymentData: paymentData,
                    Tag: "Create an GooglePay card direct Payin",
                    StatementDescriptor: "php",
                    BrowserInfo: {
                        AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
                        JavaEnabled: true,
                        Language: "FR-FR",
                        ColorDepth: 4,
                        ScreenHeight: 1800,
                        ScreenWidth: 400,
                        JavascriptEnabled: true,
                        TimeZoneOffset: "+60",
                        UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                    },
                    IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
                    SecureModeReturnURL: "http://www.my-site.com/returnurl",
                    SecureMode: "DEFAULT",
                    ReturnURL: "http://test.com",
                    Billing: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    },
                    Shipping: {
                        FirstName: 'Joe',
                        LastName: 'Blogs',
                        Address: {
                            AddressLine1: '1 MangoPay Street',
                            AddressLine2: 'The Loop',
                            City: 'Paris',
                            Region: 'Ile de France',
                            PostalCode: '75001',
                            Country: 'FR'
                        }
                    }
                };

                api.PayIns.createGooglePay(googlePayIn, function (data, response) {
                    googlePayIn = data;
                    done();
                });
            });

            it('should be created', function () {
                expect(googlePayIn.Id).not.to.be.undefined;
                expect(googlePayIn.AuthorId).to.equal(john.Id);
                expect(googlePayIn.PaymentType).to.equal('GOOGLE_PAY');
                expect(googlePayIn.ExecutionType).to.equal('DIRECT');
                expect(googlePayIn.Type).to.equal('PAYIN');
            });
        });
    });

    // describe('Card PreAuthorized Deposit', function () {
    //     var payIn;
    //
    //     before(function (done) {
    //         helpers.createNewCardPreAuthorizedDepositPayIn(function (data, response) {
    //             payIn = data;
    //             done();
    //         });
    //     });
    //
    //     it('should be fetched', function () {
    //         expect(payIn).not.to.be.undefined;
    //         expect(payIn.Status).to.equal('SUCCEEDED');
    //     });
    // });
});
