var _ = require('underscore');
var Address = require('../lib/models/Address');
var Birthplace = require('../lib/models/Birthplace');
var UserNaturalCapacity = require('../lib/models/UserNaturalCapacity');
var UserNatural = require('../lib/models/UserNatural');
const api = require("./main");

module.exports = {
    data: {
        getUserNatural: function() {
            return {
                FirstName: 'John NodejsSDK',
                LastName: 'Doe NodejsSDK',
                Email: 'john.doe@sample.org',
                Address: new Address({
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                }),
                Birthday: 188301600,
                Nationality: 'FR',
                CountryOfResidence: 'FR',
                Occupation: 'programmer',
                IncomeRange: 3,
                PersonType: 'NATURAL',
                TermsAndConditionsAccepted: false
            };
        },
        getUserNaturalScaOwner: function() {
            return {
                FirstName: 'John SCA',
                LastName: 'Doe SCA Review',
                Email: 'john.doe.sca@sample.org',
                Address: new Address({
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "Address line 2",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                }),
                Birthday: 188301600,
                Birthplace: 'FR',
                Nationality: 'FR',
                CountryOfResidence: 'FR',
                Occupation: 'programmer',
                IncomeRange: 3,
                PersonType: 'NATURAL',
                TermsAndConditionsAccepted: true,
                UserCategory: 'OWNER',
                PhoneNumber: '+33611111111',
                PhoneNumberCountry: 'FR'
            };
        },
        getUserNaturalScaPayer: function() {
            return {
                FirstName: 'John SCA',
                LastName: 'Doe SCA Review',
                Email: 'john.doe.sca@sample.org',
                PersonType: 'NATURAL',
                TermsAndConditionsAccepted: true,
                UserCategory: 'PAYER',
                Address: new Address({
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                })
            };
        },
        getUserNaturalPayer: function() {
            return {
                PersonType: 'NATURAL',
                FirstName: 'John NodejsSDK',
                LastName: 'Doe NodejsSDK',
                Email: 'john.doe@sample.org',
                Address: new Address({
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                }),
                TermsAndConditionsAccepted: false,
                UserCategory: 'PAYER'
            };
        },
        getUserNaturalOwner: function() {
            return {
                PersonType: 'NATURAL',
                FirstName: 'John NodejsSDK',
                LastName: 'Doe NodejsSDK',
                Email: 'john.doe@sample.org',
                Address: new Address({
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                }),
                Birthday: 188301600,
                Nationality: 'FR',
                CountryOfResidence: 'FR',
                Occupation: 'programmer',
                IncomeRange: 3,
                TermsAndConditionsAccepted: false,
                UserCategory: 'OWNER',
            };
        },
        getDeclarativeUserNatural: function() {
            var user = this.getUserNatural();
            user.Capacity = UserNaturalCapacity.Declarative;
            return user;
        },
        getUbo: function () {
            return {
                FirstName: 'John NodejsSDK',
                LastName: 'Doe NodejsSDK',
                Address: new Address({
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                }),
                Nationality: 'FR',
                Birthday: 188301600,
                Birthplace: {
                    "City": "Paris",
                    "Country": "FR"
                    }
            }
        },
        getUserLegal: function(){
            return {
                Name: 'MartixSampleOrg_NodejsSDK',
                Email: 'mail@test.com',
                LegalPersonType: 'BUSINESS',
                HeadquartersAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                LegalRepresentativeFirstName: 'John NodejsSDK',
                LegalRepresentativeLastName: 'Doe NodejsSDK',
                LegalRepresentativeEmail: 'john.doe@sample.org',
                LegalRepresentativeAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                LegalRepresentativeBirthday: 188301600,
                LegalRepresentativeNationality: 'FR',
                LegalRepresentativeCountryOfResidence: 'FR',
                CompanyNumber: "123456789",
                TermsAndConditionsAccepted: false
            };
        },
        getUserLegalPayer: function(){
            return {
                PersonType: 'LEGAL',
                Name: 'MartixSampleOrg_NodejsSDK',
                Email: 'mail@test.com',
                LegalPersonType: 'BUSINESS',
                LegalRepresentativeFirstName: 'John NodejsSDK',
                LegalRepresentativeLastName: 'Doe NodejsSDK',
                LegalRepresentativeAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                TermsAndConditionsAccepted: false,
                UserCategory: 'PAYER'
            };
        },
        getUserLegalOwner: function(){
            return {
                PersonType: 'LEGAL',
                Name: 'MartixSampleOrg_NodejsSDK',
                Email: 'mail@test.com',
                LegalPersonType: 'BUSINESS',
                HeadquartersAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                LegalRepresentativeFirstName: 'John NodejsSDK',
                LegalRepresentativeLastName: 'Doe NodejsSDK',
                LegalRepresentativeEmail: 'john.doe@sample.org',
                LegalRepresentativeAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                LegalRepresentativeBirthday: 188301600,
                LegalRepresentativeNationality: 'FR',
                LegalRepresentativeCountryOfResidence: 'FR',
                CompanyNumber: "123456789",
                TermsAndConditionsAccepted: false,
                UserCategory: 'OWNER'
            };
        },
        getUserLegalScaOwner: function(){
            return {
                PersonType: 'LEGAL',
                Name: 'MartixSampleOrg',
                Email: 'mail@test.com',
                LegalPersonType: 'BUSINESS',
                HeadquartersAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "address line 2",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                LegalRepresentativeAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "address line 2",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                LegalRepresentative: {
                    FirstName: 'John NodejsSDK',
                    LastName: 'Doe NodejsSDK',
                    Email: 'john.doe@sample.org',
                    Birthday: 188301600,
                    Nationality: 'FR',
                    CountryOfResidence: 'FR',
                    PhoneNumber: '+33611111111',
                    PhoneNumberCountry: 'FR'
                },
                CompanyNumber: "123456789",
                TermsAndConditionsAccepted: true,
                UserCategory: 'OWNER'
            };
        },
        getUserLegalScaPayer: function(){
            return {
                PersonType: 'LEGAL',
                Name: 'MartixSampleOrg',
                Email: 'mail@test.com',
                LegalPersonType: 'BUSINESS',
                LegalRepresentative: {
                    FirstName: 'John Sca',
                    LastName: 'Doe SCA Review',
                    Email: 'john.doe.sca@sample.org',
                    Birthday: 188301600,
                    Nationality: 'FR',
                    CountryOfResidence: 'FR',
                    PhoneNumber: '+33611111111',
                    PhoneNumberCountry: 'FR'
                },
                LegalRepresentativeAddress: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "address line 2",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "20007",
                    "Country": "US"
                },
                TermsAndConditionsAccepted: true,
                UserCategory: 'PAYER'
            };
        },
        KYCPageFileString: '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'
    },

    getUserCardPreAuthorization: function(api, user, callback) {
        var preAuthorization;

        var cardRegistration = {
            UserId: user.Id,
            Currency: 'EUR'
        };

        api.CardRegistrations.create(cardRegistration).then(function() {
            /*
             ****** DO NOT use this code in a production environment - it is just for unit tests. In production you are not allowed to have the user's card details pass via your server (which is what is required to use this code here) *******
             */
            var options = {
                data: {
                    data: cardRegistration.PreregistrationData,
                    accessKeyRef: cardRegistration.AccessKey,
                    cardNumber: '4970107111111119',
                    cardExpirationDate: '1229',
                    cardCvx: '123'
                },
                url: cardRegistration.CardRegistrationURL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            return api.method('post', function (data, response) {
                cardRegistration.RegistrationData = Buffer.from(data).toString();
                api.CardRegistrations.update(cardRegistration).then(function(data){
                    preAuthorization = {
                        AuthorId: user.Id,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: 1000
                        },
                        CardId: cardRegistration.CardId,
                        SecureModeReturnURL: 'http://test.com',
                        Billing: {
                            FirstName: "John",
                            LastName: "Doe",
                            Address: {
                                "AddressLine1": "4101 Reservoir Rd NW",
                                "AddressLine2": "",
                                "City": "Washington",
                                "Region": "District of Columbia",
                                "PostalCode": "80400",
                                "Country": "US"
                            }
                        },
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
                    };

                    api.CardPreAuthorizations.create(preAuthorization, function(data, response){
                        if (_.isFunction(callback)) {
                            callback(preAuthorization, response);
                        }
                    });
                });
            }, options);
        });
    },

    getNewPayInCardDirect: function(api, user, callback) {
        var self = this;
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function(){
            self.getUserCardPreAuthorization(api, user, function(preauthorization, response){
                var payIn = {
                    CreditedWalletId: wallet.Id,
                    AuthorId: user.Id,
                    DebitedFunds: {
                        Amount: 1000,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 0,
                        Currency: 'EUR'
                    },
                    CardId: preauthorization.CardId,
                    SecureModeReturnURL: 'http://test.com',
                    PaymentType: 'CARD',
                    ExecutionType: 'DIRECT',
                    Billing: {
                        FirstName: "John",
                        LastName: "Doe",
                        Address: {
                          "AddressLine1": "4101 Reservoir Rd NW",
                          "AddressLine2": "",
                          "City": "Washington",
                          "Region": "District of Columbia",
                          "PostalCode": "68400",
                          "Country": "US"
                        }
                    },
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
                };
                api.PayIns.create(payIn, callback)
            });
        });
    },

    getNewPayInMbwayWeb: function(api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function(){
            var payIn = {
                CreditedWalletId: wallet.Id,
                AuthorId: user.Id,
                DebitedFunds: {
                    Amount: 500,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                PaymentType: 'MBWAY',
                ExecutionType: 'WEB',
                StatementDescriptor: "test",
                Phone: "351#269458236",
                Tag: "test tag"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInBancontactWeb: function(api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function(){
            var payIn = {
                AuthorId: user.Id,
                CreditedWalletId: wallet.Id,
                DebitedFunds: {
                    Amount: 500,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                ReturnURL: "http://mangopay.com",
                PaymentType: 'BCMC',
                ExecutionType: 'WEB',
                Culture: 'FR',
                StatementDescriptor: "test",
                Recurring: true,
                Tag: "test tag"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInPayPalWeb: function(api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function(){
            var payIn = {
                AuthorId: user.Id,
                DebitedFunds: {
                    Amount: 1000,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                CreditedWalletId: wallet.Id,
                PaymentType: 'PAYPAL',
                ExecutionType: 'WEB',
                ReturnURL: 'http://example.com',
                Shipping: {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Address: {
                        "AddressLine1": "4101 Reservoir Rd NW",
                        "AddressLine2": "",
                        "City": "Washington",
                        "Region": "District of Columbia",
                        "PostalCode": "20007",
                        "Country": "US"
                    }
                },
                LineItems: [
                    {
                        Name: "running shoes",
                        Quantity: 1,
                        UnitAmount: 500,
                        TaxAmount: 0,
                        Description: "seller1 ID"
                    },
                    {
                        Name: "running shoes",
                        Quantity: 1,
                        UnitAmount: 500,
                        TaxAmount: 0,
                        Description: "seller2 ID"
                    }
                ],
                ShippingPreference: "NO_SHIPPING",
                Reference: "Reference",
                Tag: "tag",
                StatementDescriptor: "test"
            };

            api.PayIns.createPayPal(payIn, callback);
        });
    },

    getNewPayoutBankWire: function(api, user, callback) {
        var self = this;

        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        var account = {
            OwnerName: user.FirstName + ' ' + user.LastName,
            OwnerAddress: user.Address,
            Type: 'IBAN',
            IBAN: 'FR7630004000031234567890143',
            BIC: 'BNPAFRPP'
        };

        api.Wallets.create(wallet).then(function(data){
            api.Users.createBankAccount(user.Id, account).then(function(data){
                var payOut = {
                    DebitedWalletId: wallet.Id,
                    AuthorId: user.Id,
                    CreditedUserId: user.Id,
                    Tag: 'DefaultTag',
                    DebitedFunds: {
                        Amount: 10,
                        Currency: 'EUR'
                    },
                    Fees: {
                        Amount: 5,
                        Currency: 'EUR'
                    },
                    BankAccountId: data.Id,
                    BankWireRef: 'User payment',
                    PaymentType: 'BANK_WIRE',
                    PayoutModeRequested: 'STANDARD'
                };
                api.PayOuts.create(payOut, callback);
            });
        });
    },

    getNewPayInCardWeb: function(api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function(){
            var payIn = new api.models.PayIn({
                CreditedWalletId: wallet.Id,
                AuthorId: user.Id,
                DebitedFunds: new api.models.Money({
                    Amount: 1000,
                    Currency: 'EUR'
                }),
                Fees: new api.models.Money({
                    Amount: 0,
                    Currency: 'EUR'
                }),
                PaymentType: 'CARD',
                PaymentDetails: new api.models.PayInPaymentDetailsCard({
                    CardType: 'CB_VISA_MASTERCARD'
                }),
                ExecutionType: 'WEB',
                ExecutionDetails: new api.models.PayInPaymentDetailsCard({
                    ReturnURL: 'https://test.com',
                    TemplateURL: 'https://TemplateURL.com',
                    SecureMode:  'DEFAULT',
                    Culture: 'fr'
                })
            });
            api.PayIns.create(payIn, callback)
        });
    },

    getNewRefundForPayIn: function(api, user, payIn, callback) {
        var refund = {
            CreditedWalletId: payIn.CreditedWalletId,
            AuthorId: user.Id,
            DebitedFunds: payIn.DebitedFunds,
            Fees: payIn.Fees
        };

        api.PayIns.createRefund(payIn.Id, refund, callback);
    },

    getPartialRefundForPayIn: function(api, user, payIn, callback) {
        var refund = {
            AuthorId: user.Id,
            DebitedFunds: new api.models.Money({
                Amount: 100,
                Currency: payIn.DebitedFunds.Currency
            }),
            Fees: new api.models.Money({
                Amount: 10,
                Currency: payIn.Fees.Currency
            }),
        };

        api.PayIns.createRefund(payIn.Id, refund, callback);
    },

    getPaylineCorrectRegistartionData: function(cardRegistration, callback) {
        /*
         ****** DO NOT use this code in a production environment - it is just for unit tests. In production you are not allowed to have the user's card details pass via your server (which is what is required to use this code here) *******
         */
        var options = {
            data: {
                data: cardRegistration.PreregistrationData,
                accessKeyRef: cardRegistration.AccessKey,
                cardNumber: '4970107111111119',
                cardExpirationDate: '1229',
                cardCvx: '123'
            },
            url: cardRegistration.CardRegistrationURL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return api.method('post', function (data, response) {
            callback(Buffer.from(data).toString(), response);
        }, options);
    },

    getNewPayInCardWebWithIdempotencyKey: function(api, user, idempotencyKey, callback) {
        var options = api.OptionsHelper.withIdempotency({}, idempotencyKey);
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function(){
            var payIn = new api.models.PayIn({
                CreditedWalletId: wallet.Id,
                AuthorId: user.Id,
                DebitedFunds: new api.models.Money({
                    Amount: 1000,
                    Currency: 'EUR'
                }),
                Fees: new api.models.Money({
                    Amount: 0,
                    Currency: 'EUR'
                }),
                PaymentType: 'CARD',
                PaymentDetails: new api.models.PayInPaymentDetailsCard({
                    CardType: 'CB_VISA_MASTERCARD'
                }),
                ExecutionType: 'WEB',
                ExecutionDetails: new api.models.PayInPaymentDetailsCard({
                    ReturnURL: 'https://test.com',
                    TemplateURL: 'https://TemplateURL.com',
                    SecureMode:  'DEFAULT',
                    Culture: 'fr'
                })
            });
            api.PayIns.create(payIn, callback, options);
        });
    },

    generateRandomString: function () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },

    getNewDeposit: function(cardId, authorId) {
        return {
            AuthorId: authorId,
            CardId: cardId,
            DebitedFunds: {
                Amount: 1000,
                Currency: 'EUR'
            },
            SecureModeReturnURL: 'http://mangopay-sandbox-test.com',
            StatementDescriptor: 'lorem',
            Culture: 'FR',
            IpAddress: '2001:0620:0000:0000:0211:24FF:FE80:C12C',
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
            Address: {
                AddressLine1: 'Main Street no 5',
                City: 'Paris',
                Country: 'FR',
                PostalCode: '68400',
                Region: 'Europe'
            },
            Billing: {
                FirstName: "John",
                LastName: "Doe",
                Address: {
                    "AddressLine1": "4101 Reservoir Rd NW",
                    "AddressLine2": "",
                    "City": "Washington",
                    "Region": "District of Columbia",
                    "PostalCode": "80400",
                    "Country": "US"
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
    },

    createNewDeposit: function(callback) {
        var self = this;
        var john = new UserNatural(this.data.getUserNatural());

        api.Users.create(john).then(function (data, response) {
            john = data;

            var cardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };

            api.CardRegistrations.create(cardRegistration, function () {
                self.getPaylineCorrectRegistartionData(cardRegistration, function (data, response) {
                    cardRegistration.RegistrationData = data;

                    api.CardRegistrations.update(cardRegistration).then(function (data) {
                        cardRegistration = data;

                        var newDeposit = self.getNewDeposit(cardRegistration.CardId, john.Id);

                        api.Deposits.create(newDeposit, callback);
                    });
                });
            });
        });
    },

    createNewCardPreAuthorizedDepositPayIn: function(callback) {
        var self = this;
        var john = new UserNatural(this.data.getUserNatural());

        api.Users.create(john).then(function (data, response) {
            john = data;

            var cardRegistration = {
                UserId: john.Id,
                Currency: 'EUR'
            };

            api.CardRegistrations.create(cardRegistration, function () {
                self.getPaylineCorrectRegistartionData(cardRegistration, function (data, response) {
                    cardRegistration.RegistrationData = data;

                    api.CardRegistrations.update(cardRegistration).then(function (data) {
                        cardRegistration = data;

                        var wallet = {
                            Owners: [john.Id],
                            Currency: 'EUR',
                            Description: 'WALLET IN EUR'
                        };

                        api.Wallets.create(wallet).then(function () {
                            var newDeposit = self.getNewDeposit(cardRegistration.CardId, john.Id);

                            api.Deposits.create(newDeposit, function (data, response) {
                                newDeposit = data;

                                var payIn = {
                                    AuthorId: john.Id,
                                    CreditedWalletId: wallet.Id,
                                    DebitedFunds: {
                                        Currency: 'EUR',
                                        Amount: 1000
                                    },
                                    Fees: {
                                        Currency: 'EUR',
                                        Amount: 0
                                    },
                                    DepositId: newDeposit.Id
                                };

                                api.PayIns.createCardPreAuthorizedDepositPayIn(payIn, callback);
                            });
                        });
                    });
                });
            });
        });
    },

    getNewPayInMultibancoWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                CreditedWalletId: wallet.Id,
                AuthorId: user.Id,
                DebitedFunds: {
                    Amount: 500,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                PaymentType: 'MULTIBANCO',
                ExecutionType: 'WEB',
                StatementDescriptor: "test",
                ReturnURL: "http://test.com",
                Tag: "test tag"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInSatispayWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                AuthorId: user.Id,
                DebitedFunds: {
                    Amount: 500,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                CreditedWalletId: wallet.Id,
                PaymentType: 'SATISPAY',
                ExecutionType: 'WEB',
                StatementDescriptor: "test",
                ReturnURL: "http://test.com",
                Tag: "test tag",
                Country: "IT"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInBlikWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'PLN',
            Description: 'WALLET IN PLN'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                AuthorId: user.Id,
                DebitedFunds: {
                    Amount: 500,
                    Currency: 'PLN'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'PLN'
                },
                CreditedWalletId: wallet.Id,
                PaymentType: 'BLIK',
                ExecutionType: 'WEB',
                StatementDescriptor: "test",
                ReturnURL: "http://test.com",
                Tag: "test tag"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInBlikWebWithCode: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'PLN',
            Description: 'WALLET IN PLN'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                AuthorId: user.Id,
                DebitedFunds: {
                    Amount: 500,
                    Currency: 'PLN'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'PLN'
                },
                CreditedWalletId: wallet.Id,
                PaymentType: 'BLIK',
                ExecutionType: 'WEB',
                StatementDescriptor: "test",
                ReturnURL: "http://test.com",
                Tag: "test tag",
                Code: "777365",
                IpAddress: "159.180.248.187",
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
                }
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInKlarnaWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                PaymentType: 'KLARNA',
                ExecutionType: 'WEB',
                AuthorId: user.Id,
                CreditedWalletId: wallet.Id,
                DebitedFunds: {
                    Amount: 1000,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                ReturnURL: 'http://test.com',
                LineItems: [
                    {
                        Name: "running shoes",
                        Quantity: 1,
                        UnitAmount: 500,
                        TaxAmount: 0,
                        Description: "seller1 ID"
                    },
                    {
                        Name: "running shoes",
                        Quantity: 1,
                        UnitAmount: 500,
                        TaxAmount: 0,
                        Description: "seller2 ID"
                    }
                ],
                Country: "FR",
                Phone: "351#269458236",
                Email: "mangopay@gmail.com",
                AdditionalData: "{}",
                Billing: {
                    FirstName: "John",
                    LastName: "Doe",
                    Address: {
                        "AddressLine1": "4101 Reservoir Rd NW",
                        "AddressLine2": "",
                        "City": "Washington",
                        "Region": "District of Columbia",
                        "PostalCode": "80400",
                        "Country": "FR"
                    }
                },
                Reference: "1234",
                StatementDescriptor: "test",
                Tag: "test tag"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInIdealWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                PaymentType: 'IDEAL',
                ExecutionType: 'WEB',
                AuthorId: user.Id,
                CreditedWalletId: wallet.Id,
                DebitedFunds: {
                    Amount: 1000,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                ReturnURL: 'http://test.com',
                Bic: 'SNSBNL2A',
                StatementDescriptor: "ideal",
                Tag: "test tag"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInGiropayWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                PaymentType: 'GIROPAY',
                ExecutionType: 'WEB',
                AuthorId: user.Id,
                CreditedWalletId: wallet.Id,
                DebitedFunds: {
                    Amount: 1000,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                ReturnURL: 'http://test.com',
                StatementDescriptor: "giropay",
                Tag: "test tag"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInSwishWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'SEK',
            Description: 'WALLET IN SEK'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                PaymentType: 'SWISH',
                ExecutionType: 'WEB',
                AuthorId: user.Id,
                CreditedWalletId: wallet.Id,
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'SEK'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'SEK'
                },
                ReturnURL: 'http://test.com',
                StatementDescriptor: "swish",
                Tag: "created from nodejs"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInTwintWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'CHF',
            Description: 'WALLET IN CHF'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                PaymentType: 'TWINT',
                ExecutionType: 'WEB',
                AuthorId: user.Id,
                CreditedWalletId: wallet.Id,
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'CHF'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'CHF'
                },
                ReturnURL: 'http://test.com',
                StatementDescriptor: "twint",
                Tag: "twint payin"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getNewPayInPayByBankWeb: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function () {
            var payIn = {
                PaymentType: 'PAY_BY_BANK',
                ExecutionType: 'WEB',
                AuthorId: user.Id,
                CreditedWalletId: wallet.Id,
                DebitedFunds: {
                    Amount: 10,
                    Currency: 'EUR'
                },
                Fees: {
                    Amount: 0,
                    Currency: 'EUR'
                },
                Country: "DE",
                ReturnURL: 'https://test.com',
                IBAN: "DE03500105177564668331",
                BIC: "AACSDE33",
                Scheme: "SEPA_INSTANT_CREDIT_TRANSFER",
                BankName: "de-demobank-open-banking-embedded-templates",
                Culture: "EN",
                PaymentFlow: "WEB",
                StatementDescriptor: "test",
                Tag: "created from nodejs"
            };
            api.PayIns.create(payIn, callback);
        });
    },

    getLegacyPayInIdealCardWeb: function(api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function(){
            var payIn = new api.models.PayIn({
                CreditedWalletId: wallet.Id,
                AuthorId: user.Id,
                DebitedFunds: new api.models.Money({
                    Amount: 1000,
                    Currency: 'EUR'
                }),
                Fees: new api.models.Money({
                    Amount: 0,
                    Currency: 'EUR'
                }),
                PaymentType: 'CARD',
                PaymentDetails: new api.models.PayInPaymentDetailsCard({
                    CardType: 'IDEAL',
                    Bic: 'REVOLT21'
                }),
                ExecutionType: 'WEB',
                ExecutionDetails: new api.models.PayInPaymentDetailsCard({
                    ReturnURL: 'https://test.com',
                    TemplateURL: 'https://TemplateURL.com',
                    SecureMode:  'DEFAULT',
                    Culture: 'fr'
                })
            });
            api.PayIns.create(payIn, callback);
        });
    },

    getNewQuote: function (api, callback) {
        var quoteBody = {
            DebitedFunds: {
                Amount: 100,
                Currency: 'EUR'
            },
            CreditedFunds: {
                Currency: 'GBP'
            },
            Duration: 300
        };
        api.Conversions.createQuote(quoteBody, callback);
    },

    getNewWalletWithMoney: function (api, userId, callback) {
        var self = this;
        var wallet = {
            Owners: [userId],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function (createdWallet) {
            var cardRegistration = {
                UserId: userId,
                Currency: 'EUR'
            };

            api.CardRegistrations.create(cardRegistration, function () {
                self.getPaylineCorrectRegistartionData(cardRegistration, function (data, response) {
                    cardRegistration.RegistrationData = data;
                    api.CardRegistrations.update(cardRegistration).then(function (data) {
                        cardRegistration = data;
                        var payIn = {
                            CreditedWalletId: wallet.Id,
                            AuthorId: userId,
                            DebitedFunds: {
                                Amount: 10000,
                                Currency: 'EUR'
                            },
                            Fees: {
                                Amount: 0,
                                Currency: 'EUR'
                            },
                            CardId: cardRegistration.CardId,
                            SecureModeReturnURL: 'http://test.com',
                            PaymentType: 'CARD',
                            ExecutionType: 'DIRECT',
                            Billing: {
                                FirstName: "John",
                                LastName: "Doe",
                                Address: {
                                    "AddressLine1": "4101 Reservoir Rd NW",
                                    "AddressLine2": "",
                                    "City": "Washington",
                                    "Region": "District of Columbia",
                                    "PostalCode": "68400",
                                    "Country": "US"
                                }
                            },
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
                        };

                        api.PayIns.create(payIn).then(function () {
                            api.Wallets.get(createdWallet.Id, callback);
                        });
                    });
                });
            });
        });
    },

    getNewPayInIntentAuthorization: function (api, user, callback) {
        var wallet = {
            Owners: [user.Id],
            Currency: 'EUR',
            Description: 'WALLET IN EUR'
        };

        api.Wallets.create(wallet).then(function () {
            var payInIntent = {
                "Amount": 1000,
                "Currency": "EUR",
                "ExternalData": {
                    "ExternalProcessingDate": 1728133765,
                    "ExternalProviderReference": Math.random().toString(),
                    "ExternalMerchantReference": "Order-xyz-35e8490e-2ec9-4c82-978e-c712a3f5ba16",
                    "ExternalProviderName": "Stripe",
                    "ExternalProviderPaymentMethod": "PAYPAL"
                },
                "Buyer": {
                    "Id": user.Id
                },
                "LineItems": [
                    {
                        "Seller": {
                            "WalletId": wallet.Id,
                            "AuthorId": wallet.Owners[0],
                            "TransferDate": 1728133765
                        },
                        "Sku": "item-123456",
                        "Quantity": 1,
                        "UnitAmount": 1000,
                    }
                ]
            };
            api.PayIns.createPayInIntentAuthorization(payInIntent, callback);
        });
    },
};
