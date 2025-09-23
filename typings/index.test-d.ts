import {expectError, expectType} from 'tsd';
import Mangopay = require("./index");
import {base} from "./index";

// Config tests
const invalidConfig = {};
expectError<Mangopay.base.Config>(invalidConfig);

const validConfig: Mangopay.base.Config = {
    clientId: "your_client_id",
    clientApiKey: "your_client_api_key",
    baseUrl: "https://api.mangopay.com"
};

// API instance tests
const api = new Mangopay(validConfig);
expectType<Mangopay>(api);

// Models tests
const payIn = new api.models.PayIn({});
expectType<Mangopay.models.PayIn>(payIn);

const address = new api.models.Address({});
expectType<Mangopay.models.Address>(address);

// User tests
const legalUser = new api.models.UserLegal({
    Name: "MangoPay",
    Email: "info@mangopay.com",
    LegalPersonType: "BUSINESS",
    LegalRepresentativeFirstName: "Mango",
    LegalRepresentativeLastName: "Pay",
    LegalRepresentativeEmail: "mango@mangopay.com",
    HeadquartersAddress: new api.models.Address({
        AddressLine1: "4101 Reservoir Rd NW",
        City: "Washington",
        Region: "District of Columbia",
        PostalCode: "20007",
        Country: "US"
    }),
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: "FR",
    LegalRepresentativeCountryOfResidence: "FR"
});
expectType<Mangopay.models.UserLegal>(legalUser);

api.Users.create(legalUser).then(data => {
    expectType<Mangopay.user.UserLegalData>(data);
    expectType<"LEGAL">(data.PersonType);
    expectType<Mangopay.models.RateLimit[]>(api.rateLimits);

    console.log(`${legalUser.Name} user created at ${legalUser.CreationDate}`);
});

api.Users.create(legalUser, {resolveWithFullResponse: true}).then(data => {
    expectType<Mangopay.base.WithResponse<Mangopay.user.UserLegalData>>(data);
    expectType<Mangopay.user.UserLegalData>(data.body);
});

api.Users.create(
    {
        PersonType: "LEGAL",
        Name: "MangoPay",
        Email: "info@mangopay.com",
        LegalPersonType: "BUSINESS",
        LegalRepresentativeFirstName: "Mango",
        LegalRepresentativeLastName: "Pay",
        LegalRepresentativeEmail: "mango@mangopay.com",
        HeadquartersAddress: new api.models.Address({
            AddressLine1: "4101 Reservoir Rd NW",
            AddressLine2: "",
            City: "Washington",
            Region: "District of Columbia",
            PostalCode: "20007",
            Country: "US"
        }),
        LegalRepresentativeAddress: new api.models.Address({
            AddressLine1: "4101 Reservoir Rd NW",
            AddressLine2: "",
            City: "Washington",
            Region: "District of Columbia",
            PostalCode: "20007",
            Country: "US"
        }),
        LegalRepresentativeBirthday: 1300186358,
        LegalRepresentativeNationality: "FR",
        LegalRepresentativeCountryOfResidence: "FR",
        Tag: "custom tag",
        TermsAndConditionsAccepted: true
    },
    {headers: {}}
).then(data => {
    expectType<Mangopay.user.UserLegalData>(data);
});

const naturalUser = new api.models.UserNatural({
    Email: "info@mangopay.com",
    Birthday: 1300186358,
    FirstName: "Sara",
    LastName: "McNick",
    CountryOfResidence: "GB",
    Nationality: "US"
});

api.Users.create(naturalUser, {}).then(data => {
    expectType<Mangopay.user.UserNaturalData>(data);
    expectType<"NATURAL">(data.PersonType);
});

api.Users.create(
    {
        PersonType: "NATURAL",
        Email: "info@mangopay.com",
        Birthday: 1300186358,
        FirstName: "Sara",
        LastName: "McNick",
        CountryOfResidence: "GB",
        Nationality: "US",
        Tag: "natural-user",
        TermsAndConditionsAccepted: true
    },
    data => {
        expectType<Mangopay.user.UserNaturalData>(data);
    }
);

// create User Natural Payer with mandatory props
const userNaturalPayer = new api.models.UserNaturalPayer({
    UserCategory: "PAYER",
    FirstName: "Sara",
    LastName: "McNick",
    Email: "info@mangopay.com"
});

api.Users.create(userNaturalPayer,
    data => {
        expectType<Mangopay.user.UserNaturalData>(data);
    }
);

// create User Natural Owner with mandatory props
const userNaturalOwner = new api.models.UserNaturalOwner({
    PersonType: "NATURAL",
    UserCategory: "OWNER",
    FirstName: "Sara",
    LastName: "McNick",
    Email: "info@mangopay.com",
    Birthday: 1300186358,
    CountryOfResidence: "GB",
    Nationality: "US",
    TermsAndConditionsAccepted: false
});

api.Users.create(userNaturalOwner,
    data => {
        expectType<Mangopay.user.UserNaturalData>(data);
    }
);

// create User Legal Payer with mandatory props
const userLegalPayer = new api.models.UserLegalPayer({
    UserCategory: "PAYER",
    PersonType: "LEGAL",
    Name: "MangoPay",
    Email: "info@mangopay.com",
    LegalPersonType: "BUSINESS",
    LegalRepresentativeFirstName: "Mango",
    LegalRepresentativeLastName: "Pay",
    LegalRepresentativeEmail: "mango@mangopay.com"
});

api.Users.create(userLegalPayer,
    data => {
        expectType<Mangopay.user.UserLegalData>(data);
    }
);

// create User Legal Owner with mandatory props
const userLegalOwner = new api.models.UserLegalOwner({
    UserCategory: "OWNER",
    Name: "MangoPay",
    Email: "info@mangopay.com",
    LegalPersonType: "BUSINESS",
    LegalRepresentativeFirstName: "Mango",
    LegalRepresentativeLastName: "Pay",
    HeadquartersAddress: new api.models.Address({
        AddressLine1: "4101 Reservoir Rd NW",
        AddressLine2: "",
        City: "Washington",
        Region: "District of Columbia",
        PostalCode: "20007",
        Country: "US"
    }),
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: "FR",
    LegalRepresentativeCountryOfResidence: "FR",
    CompanyNumber: "12345",
    TermsAndConditionsAccepted: false
});

api.Users.create(userLegalOwner,
    data => {
        expectType<Mangopay.user.UserLegalData>(data);
    }
);

api.Users.get("1234").then(data => {
    expectType<Mangopay.user.UserLegalData | Mangopay.user.UserNaturalData>(data);
    if (data.PersonType === "LEGAL") {
        expectType<Mangopay.user.UserLegalData>(data);
    } else {
        expectType<Mangopay.user.UserNaturalData>(data);
    }
});

api.Users.getAll().then(users => {
    users.forEach(user => {
        expectType<Mangopay.user.UserLegalData | Mangopay.user.UserNaturalData>(user);
        if (user.PersonType === "LEGAL") {
            expectType<Mangopay.user.UserLegalData>(user);
        } else {
            expectType<Mangopay.user.UserNaturalData>(user);
        }
    });
});

api.Users.update({
    Id: "1234",
    PersonType: "NATURAL",
    Email: "info@mangopay.com",
    Birthday: 1300186358,
    FirstName: "Sara",
    LastName: "McNick",
    CountryOfResidence: "GB",
    Nationality: "US",
    TermsAndConditionsAccepted: true
}).then(data => {
    expectType<Mangopay.user.UserNaturalData>(data);
});

api.Users.update({
    Id: "1234",
    PersonType: "LEGAL",
    Tag: "custom meta",
    TermsAndConditionsAccepted: true
}).then(data => {
    expectType<Mangopay.user.UserLegalData>(data);
});

api.Users.createBankAccount("user-id", {
    Type: "GB",
    AccountNumber: "12345678",
    SortCode: "123456",
    OwnerAddress: "",
    OwnerName: ""
}).then(data => {
    expectType<Mangopay.bankAccount.GBData>(data);
});

api.Users.getBankAccount("user-id", "bankAccount-id").then(data => {
    expectType<Mangopay.bankAccount.Data>(data);
});

api.Users.getBankAccounts("user-id", {parameters: {Sort: "CreationDate:ASC"}}).then(data => {
    expectType<Mangopay.bankAccount.Data[]>(data);
});

api.Users.deactivateBankAccount("user-id", "bankAccount-id").then(data => {
    expectType<Mangopay.bankAccount.Data>(data);
});

api.Users.getTransactions("user-id").then(data => {
    expectType<Mangopay.transaction.TransactionData[]>(data);
});

api.Users.getWallets("user-id").then(data => {
    expectType<Mangopay.wallet.WalletData[]>(data);
});

api.Users.getCards("user-id").then(data => {
    expectType<Mangopay.card.CardData[]>(data);
});

api.Users.createKycDocument("user-id", {Type: "ADDRESS_PROOF", Tag: "custom meta"}).then(data => {
    expectType<Mangopay.kycDocument.KycDocumentData>(data);
});

api.Users.getKycDocuments("user-id").then(data => {
    expectType<Mangopay.kycDocument.KycDocumentData[]>(data);
});

api.Users.getKycDocument("user-id", "kycDocument-id").then(data => {
    expectType<Mangopay.kycDocument.KycDocumentData>(data);
});

api.Users.updateKycDocument("user-id", {Status: "VALIDATION_ASKED", Id: "kycDocument-id"}).then(
    data => {
        expectType<Mangopay.kycDocument.KycDocumentData>(data);
    }
);

api.Users.createKycPage("user-id", "kycDocument-id", {
    File: "...base64data..."
}).then(data => {
    expectType<Mangopay.kycDocument.KycDocumentData>(data);
});

api.Users.createKycPageFromFile(
    "user-id",
    "kyc-document-id",
    "path/to/file"
).then(data => {
    expectType<Mangopay.kycDocument.KycDocumentData>(data);
});

// MangoPay.
api.Users.getEMoney("user-id").then(data => {
    expectType<Mangopay.money.EMoneyData>(data);
});

api.Users.getPreAuthorizations("user-id").then(data => {
    expectType<Mangopay.cardPreAuthorization.CardPreAuthorizationData[]>(data);
});

/* KycDocuments */
api.KycDocuments.getAll().then(data => {
    expectType<Mangopay.kycDocument.KycDocumentData[]>(data);
});

api.KycDocuments.get("kyc-id").then(data => {
    expectType<Mangopay.kycDocument.KycDocumentData>(data);
});

api.KycDocuments.createKycDocumentConsult("kyc-id").then(data => {
    expectType<any>(data); // TODO unsure of expected type from docs
});

/* UboDeclarations */
api.UboDeclarations.get("userId", "id").then(data => {
    expectType<Mangopay.uboDeclaration.UboDeclarationData>(data);
});

api.UboDeclarations.update("userId", {
    Id: "uboId",
    Ubos: ["user1", "user2"]
}).then(data => {
    expectType<Mangopay.uboDeclaration.UboDeclarationData>(data);
});

api.UboDeclarations.create("userId").then(data => {
    expectType<Mangopay.uboDeclaration.UboDeclarationData>(data);
});


api.UboDeclarations.createUbo("userId", "uboDeclarationId", {
    Address: address,
    Birthday: 1300186358,
    FirstName: "John",
    LastName: "Silver",
    Nationality: "US",
    Birthplace: {
        City: "Brasov",
        Country: "RO"
    }
}).then(data => {
    expectType<Mangopay.uboDeclaration.UboData>(data);
});

api.UboDeclarations.getAll("userId").then((data => {
    expectType<Mangopay.uboDeclaration.UboDeclarationData[]>(data);
}));

api.UboDeclarations.getUbo("userId", "uboDeclarationId", "uboId").then(data => {
    expectType<Mangopay.uboDeclaration.UboData>(data);
});

api.UboDeclarations.updateUbo("userId", "uboDeclarationId", {
    Id: "uboId",
    Address: address,
    Birthday: 1300186358,
    FirstName: "John",
    LastName: "Silver",
    Nationality: "US",
    Birthplace: {
        City: "Brasov",
        Country: "RO"
    }
}).then(data => {
    expectType<Mangopay.uboDeclaration.UboData>(data);
});

/* BankAccounts */
api.BankAccounts.getTransactions("account-id").then(data => {
    expectType<Mangopay.transaction.TransactionData[]>(data);
});

/* Wallets */
api.Wallets.create({
    Currency: "GBP",
    Description: "A description",
    Owners: ["user-id"]
}).then(data => {
    expectType<Mangopay.wallet.WalletData>(data);
});

const wallet = new api.models.Wallet({
    Currency: "EUR",
    Description: "A description",
    Owners: ["user-id"]
});

api.Wallets.create(wallet).then(data => {
    expectType<Mangopay.wallet.WalletData>(data);
});

api.Wallets.update({
    Description: "A description"
}).then(data => {
    expectType<Mangopay.wallet.WalletData>(data);
});

api.Wallets.get("wallet-id").then(data => {
    expectType<Mangopay.wallet.WalletData>(data);
});

api.Wallets.getTransactions("wallet-id").then(data => {
    expectType<Mangopay.transaction.TransactionData[]>(data);
});

/* Cards */
api.Cards.get("card-id").then(data => {
    expectType<Mangopay.card.CardData>(data);
});

api.Cards.getByFingerprint("fingerprinthash").then(data => {
    expectType<Mangopay.card.CardData[]>(data);
});

api.Cards.update({Active: false, Id: "card-id"}).then(data => {
    expectType<Mangopay.card.CardData>(data);
});

api.Cards.getTransactions("card-id").then(data => {
    expectType<Mangopay.transaction.TransactionData[]>(data);
});

api.Cards.validate(
    "id",
    {
        AuthorId: "placeholder",
        IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
        BrowserInfo: {
            AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
            ColorDepth: 4,
            JavaEnabled: true,
            JavascriptEnabled: true,
            Language: 'FR-FR',
            ScreenHeight: 1800,
            ScreenWidth: 400,
            TimeZoneOffset: "+60",
            UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
        },
        SecureModeReturnURL: "http://example.com"
    }
).then(data => {
    expectType<Mangopay.cardValidation.CardValidationData>(data);
});

api.Cards.getCardValidation(
    "cardId",
    "cardValidationId"
).then(data => {
    expectType<Mangopay.cardValidation.CardValidationData>(data);
});

/* CardRegistrations */
api.CardRegistrations.create({
    CardType: "BCMC",
    Currency: "GBP",
    UserId: "user-id"
}).then(data => {
    expectType<Mangopay.cardRegistration.CardRegistrationData>(data);
});

api.CardRegistrations.get("reg-id").then(data => {
    expectType<Mangopay.cardRegistration.CardRegistrationData>(data);
});

api.CardRegistrations.update({RegistrationData: "hmmm", Id: "Id"}).then(data => {
    expectType<Mangopay.cardRegistration.CardRegistrationData>(data);
});

/* CardPreAuthorizations */
api.CardPreAuthorizations.create({
    AuthorId: "user",
    CardId: "card-id",
    DebitedFunds: {Currency: "AUD", Amount: 4000},
    SecureModeReturnURL: "https://secureurl.com",
    IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
    BrowserInfo: {
        AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
        ColorDepth: 4,
        JavaEnabled: true,
        JavascriptEnabled: true,
        Language: 'FR-FR',
        ScreenHeight: 1800,
        ScreenWidth: 400,
        TimeZoneOffset: "+60",
        UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
    }
}).then(data => {
    expectType<Mangopay.cardPreAuthorization.CardPreAuthorizationData>(data);
});

api.CardPreAuthorizations.get("auth-id").then(data => {
    expectType<Mangopay.cardPreAuthorization.CardPreAuthorizationData>(data);
});

api.CardPreAuthorizations.update({
    Id: "auth-id",
    PaymentStatus: "CANCELED"
}).then(data => {
    expectType<Mangopay.cardPreAuthorization.CardPreAuthorizationData>(data);
});

/* Refunds */
api.Refunds.get("refund-id").then(data => {
    expectType<Mangopay.refund.RefundData>(data);
});

/* PayIns */
api.PayIns.create({
    PaymentType: "CARD",
    ExecutionType: "DIRECT",
    AuthorId: "user-id",
    CardId: "card-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    SecureModeReturnURL: "https://secure-return.co"
}).then(data => {
    expectType<Mangopay.payIn.CardDirectPayInData>(data);
});

api.PayIns.create({
    PaymentType: "MBWAY",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    Phone: "351#269458236",
    Tag: "test tag",
    StatementDescriptor: "test"
}).then(data => {
    expectType<Mangopay.payIn.MbwayWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "KLARNA",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    ReturnURL: "http://test.com",
    LineItems: [
        {
            Name: "test",
            Quantity: 100,
            TaxAmount: undefined,
            UnitAmount: 10,
            Description: "placeholder"
        }
    ],
    Country: "FR",
    Phone: "351#269458236",
    Email: "test@test.com",
    AdditionalData: "{}",
    Billing: {
        FirstName: "John",
        LastName: "Doe",
        Address: {
            AddressLine1: "test addr1",
            AddressLine2: undefined,
            City: "Paris",
            Country: "FR",
            Region: "Europe",
            PostalCode: "68400"
        }
    },
    Reference: "1234"
}).then(data => {
    expectType<Mangopay.payIn.KlarnaWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "MULTIBANCO",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    CreditedWalletId: "123",
    ReturnURL: "http://test.com",
    Tag: "test tag",
    StatementDescriptor: "test"
}).then(data => {
    expectType<Mangopay.payIn.MultibancoWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "SATISPAY",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    CreditedWalletId: "123",
    ReturnURL: "http://test.com",
    Country: "IT",
    Tag: "test tag",
    StatementDescriptor: "test"
}).then(data => {
    expectType<Mangopay.payIn.SatispayWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "BLIK",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    CreditedWalletId: "123",
    ReturnURL: "http://test.com",
    Tag: "test tag",
    StatementDescriptor: "test"
}).then(data => {
    expectType<Mangopay.payIn.BlikWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "IDEAL",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    ReturnURL: "http://test.com",
    StatementDescriptor: "Ideal",
    Bic: "RBRBNL21",
    Tag: "test"
}).then(data => {
    expectType<Mangopay.payIn.IdealWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "GIROPAY",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    ReturnURL: "http://test.com",
    StatementDescriptor: "Giropay",
    Tag: "test"
}).then(data => {
    expectType<Mangopay.payIn.GiropayWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "SWISH",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 0, Currency: "SEK"},
    DebitedFunds: {Amount: 100, Currency: "SEK"},
    ReturnURL: "http://test.com",
    StatementDescriptor: "Swish",
    Tag: "test",
    PaymentFlow: "WEB"
}).then(data => {
    expectType<Mangopay.payIn.SwishWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "CARD",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    ReturnURL: "https://secure-return.co",
    Culture: "FR",
    Bic: "RBRBNL21",
    CardType: "IDEAL"
}).then(data => {
    expectType<Mangopay.payIn.CardWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "CARD",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    ReturnURL: "https://secure-return.co",
    Culture: "AD",
    CardType: "MAESTRO"
}).then(data => {
    expectType<Mangopay.payIn.CardWebPayInData>(data);
});

api.PayIns.createPayPal({
    PaymentType: "PAYPAL",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    LineItems: [
        {
            Name: "test",
            Quantity: 100,
            TaxAmount: undefined,
            UnitAmount: 10,
            Description: "placeholder"
        }
    ],
    Shipping: {
        FirstName: "John",
        LastName: "Doe",
        Address: {
            AddressLine1: "test addr1",
            AddressLine2: undefined,
            City: "Paris",
            Country: "FR",
            Region: "Europe",
            PostalCode: "68400"
        }
    },
    ReturnURL: "http://test.com",
    Tag: "test tag",
    StatementDescriptor: "test",
    Reference: "Reference",
    Culture: "FR"
}).then(data => {
    expectType<Mangopay.payIn.PayPalWebPayInData>(data);
});

api.PayIns.addPayPalTrackingInformation(
    "payInId",
    {
        TrackingNumber: "123456789",
        Carrier: "DHL",
        NotifyBuyer: true
    }).then(data => {
    expectType<Mangopay.payIn.PayPalWebPayInData>(data);
});

api.PayIns.createGooglePay({
    PaymentType: "GOOGLE_PAY",
    ExecutionType: "DIRECT",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    SecureModeReturnURL: "http://test.com",
    BrowserInfo: {
        AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
        ColorDepth: 4,
        JavaEnabled: true,
        JavascriptEnabled: true,
        Language: 'FR-FR',
        ScreenHeight: 1800,
        ScreenWidth: 400,
        TimeZoneOffset: "+60",
        UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
    },
    IpAddress: "1234",
    PaymentData: "placeholder"
}).then(data => {
    expectType<Mangopay.payIn.GooglePayDirectPayInData>(data);
});

api.PayIns.create({
    PaymentType: "BANK_WIRE",
    ExecutionType: "DIRECT",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    DeclaredDebitedFunds: {Amount: 10000, Currency: "GBP"},
    DeclaredFees: {Amount: 500, Currency: "GBP"}
}).then(data => {
    expectType<Mangopay.payIn.BankWireDirectPayInData>(data);
});

// create Payconiq PayIn
api.PayIns.create({
    PaymentType: "PAYCONIQ",
    ExecutionType: "WEB",
    Tag: "custom meta",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    DebitedFunds: {Amount: 500, Currency: "GBP"},
    Fees: {Amount: 500, Currency: "GBP"},
    ReturnURL: "http://www.my-site.com/returnURL",
    Country: "BE"
}).then(data => {
    expectType<Mangopay.payIn.PayconiqWebPayInData>(data);
});

api.PayIns.create({
    PaymentType: "DIRECT_DEBIT",
    ExecutionType: "DIRECT",
    AuthorId: "user-id",
    CreditedUserId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    StatementDescriptor: "placeholder",
    MandateId: "mandate-id"
}).then(data => {
    expectType<Mangopay.payIn.DirectDebitDirectPayInData>(data);
});

api.PayIns.create({
    PaymentType: "DIRECT_DEBIT",
    ExecutionType: "WEB",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    Fees: {Amount: 100, Currency: "GBP"},
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    ReturnURL: "placeholder",
    DirectDebitType: "GIROPAY",
    Culture: "EN"
}).then(data => {
    expectType<Mangopay.payIn.DirectDebitWebPayInData>(data);
});

api.PayIns.get("payin-id").then(data => {
    expectType<Mangopay.payIn.PayInData>(data);
});

api.PayIns.createRefund("payin-id", {AuthorId: "user-id"}).then(data => {
    expectType<Mangopay.refund.RefundData>(data);
});

api.PayIns.createRefund("payin-id", {
    AuthorId: "user-id",
    DebitedFunds: {Amount: 100, Currency: "EUR"},
    Fees: {Amount: 15, Currency: "EUR"}
}).then(data => {
    expectType<Mangopay.refund.RefundData>(data);
});

api.PayIns.getRefunds("payin-id").then(data => {
    expectType<Mangopay.refund.RefundData[]>(data);
});

api.PayIns.createRecurringPayment({
    AuthorId: "author-id",
    CardId: "card-id",
    CreditedUserId: "credited-user-id",
    CreditedWalletId: "credited-wallet-id",
    FirstTransactionDebitedFunds: {Amount: 10000, Currency: "EUR"},
    FirstTransactionFees: {Amount: 10000, Currency: "EUR"},
    Billing: {
        FirstName: "FN", LastName: "LN", Address: {
            AddressLine1: "20 T Street",
            AddressLine2: "",
            City: "London",
            Country: "AD",
            PostalCode: "FR43 2WE",
            Region: "London"
        }
    },
    Shipping: {
        FirstName: "FN", LastName: "LN", Address: {
            AddressLine1: "20 T Street",
            AddressLine2: "",
            City: "London",
            Country: "AD",
            PostalCode: "FR43 2WE",
            Region: "London"
        }
    },
    EndDate: 1234,
    Frequency: "Monthly",
    FixedNextAmount: false,
    FractionedPayment: false,
    Migration: false,
    NextTransactionDebitedFunds: {Amount: 10000, Currency: "EUR"},
    NextTransactionFees: {Amount: 10000, Currency: "EUR"},
    FreeCycles: 0
}).then(data => {
    expectType<Mangopay.payIn.PayInRecurringRegistrationData>(data);
});

api.PayIns.getRecurringPayin("payin-id").then(data => {
    expectType<Mangopay.payIn.PayInRecurringRegistrationData>(data);
});

api.PayIns.updateRecurringPayin("payin-id", {
    CardId: "card-id",
    Billing: {
        FirstName: "FN", LastName: "LN", Address: {
            AddressLine1: "20 T Street",
            AddressLine2: "",
            City: "London",
            Country: "AD",
            PostalCode: "FR43 2WE",
            Region: "London"
        }
    },
    Shipping: {
        FirstName: "FN", LastName: "LN", Address: {
            AddressLine1: "20 T Street",
            AddressLine2: "",
            City: "London",
            Country: "AD",
            PostalCode: "FR43 2WE",
            Region: "London"
        }
    }
}).then(data => {
    expectType<Mangopay.payIn.PayInRecurringRegistrationData>(data);
});

api.PayIns.createRecurringPayInRegistrationCIT({
    RecurringPayinRegistrationId: "recurring-payin-reg-id",
    BrowserInfo: {
        AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
        ColorDepth: 4,
        JavaEnabled: true,
        JavascriptEnabled: true,
        Language: 'FR-FR',
        ScreenHeight: 1800,
        ScreenWidth: 400,
        TimeZoneOffset: "+60",
        UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
    },
    IpAddress: "1234",
    SecureModeReturnURL: "http://www.my-site.com/returnURL",
    DebitedFunds: {Amount: 100, Currency: "EUR"},
    Fees: {Amount: 100, Currency: "EUR"},
    StatementDescriptor: "lorem",
    Tag: "custom meta"
}).then(data => {
    expectType<Mangopay.payIn.RecurringPayInData>(data);
});

api.PayIns.createRecurringPayInRegistrationMIT({
    RecurringPayinRegistrationId: "recurring-payin-reg-id",
    DebitedFunds: {Amount: 100, Currency: "EUR"},
    Fees: {Amount: 100, Currency: "EUR"},
    StatementDescriptor: "lorem",
    Tag: "custom meta"
}).then(data => {
    expectType<Mangopay.payIn.RecurringPayInData>(data);
});

api.PayIns.getPaymentMethodMetadata({
    Type: "BIN",
    Bin: "1234"
}).then(data => {
    expectType<Mangopay.payIn.PaymentMethodMetadata>(data);
});

/* Clients */
api.Clients.get().then(data => {
    expectType<Mangopay.client.ClientData>(data);
});

api.Clients.update({PlatformType: "CROWDFUNDING_DONATION"}).then(data => {
    expectType<Mangopay.client.ClientData>(data);
});

api.Clients.uploadLogo("...logobase64...").then(data => {
    expectType<Mangopay.client.ClientData>(data);
});

api.Clients.uploadLogoFromFile("path/to/file").then(data => {
    expectType<Mangopay.client.ClientData>(data);
});

api.Clients.getClientWallets().then(data => {
    expectType<Mangopay.wallet.ClientWalletData[]>(data);
});

api.Clients.getClientWallet("CREDIT", "GBP").then(data => {
    expectType<Mangopay.wallet.ClientWalletData>(data);
});

api.Clients.getClientWalletsByFundsType("FEES").then(data => {
    expectType<Mangopay.wallet.ClientWalletData[]>(data);
});

api.Clients.getClientWalletTransactions("CREDIT", "GBP").then(data => {
    expectType<Mangopay.transaction.TransactionData[]>(data);
});

/* PayOuts */
api.PayOuts.create({
    Fees: {Amount: 0, Currency: "GBP"},
    AuthorId: "user-id",
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    BankAccountId: "bank-id",
    DebitedWalletId: "wallet-id",
    BankWireRef: "placeholder",
    Tag: "placeholder",
    PaymentType: api.models.PayOutPaymentType.BankWire
}).then(data => {
    expectType<Mangopay.payOut.PayOutData>(data);
});

api.PayOuts.get("payout-id").then(data => {
    expectType<Mangopay.payOut.PayOutData>(data);
});

api.PayOuts.getRefunds("payout-id").then(data => {
    expectType<Mangopay.refund.RefundData[]>(data);
});

api.PayOuts.checkEligibility({
    AuthorId: "user-id",
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    BankAccountId: "bank-id",
    PayoutModeRequested: "INSTANT_PAYMENT",
    DebitedWalletId: "wallet_id",
    PaymentType: api.models.PayOutPaymentType.BankWire
}).then(data => {
    expectType<Mangopay.payOut.CheckPayOutEligibilityData>(data);
});

/* Transfers */
api.Transfers.create({
    Fees: {Amount: 0, Currency: "GBP"},
    AuthorId: "user-id",
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    DebitedWalletId: "debit-wallet-id",
    CreditedWalletId: "credit-wallet-id"
}).then(data => {
    expectType<Mangopay.transfer.TransferData>(data);
});

api.Transfers.get("transfer-id").then(data => {
    expectType<Mangopay.transfer.TransferData>(data);
});

api.Transfers.createRefund("transfer-id", {AuthorId: "user-id"}).then(
    data => {
        expectType<Mangopay.refund.RefundData>(data);
    }
);

api.Transfers.getRefunds("transfer-id").then(data => {
    expectType<Mangopay.refund.RefundData[]>(data);
});

/* BankingAliases */
api.BankingAliases.create({
    Country: "GB",
    OwnerName: "owner-id",
    Type: 'IBAN',
    WalletId: '1234'
}).then(data => {
    expectType<Mangopay.bankingAlias.IBANBankingAliasData>(data);
});

api.BankingAliases.get("alias-id").then(data => {
    expectType<Mangopay.bankingAlias.IBANBankingAliasData>(data);
});

api.BankingAliases.getAll("1234").then(data => {
    expectType<Mangopay.bankingAlias.IBANBankingAliasData[]>(data);
});

api.BankingAliases.update({
    Id: '1234',
    Active: false
}).then(data => {
    expectType<Mangopay.bankingAlias.IBANBankingAliasData>(data);
});

api.BankingAliases.deactivate("alias-id").then(data => {
    expectType<Mangopay.bankingAlias.IBANBankingAliasData>(data);
});

api.BankingAliases.activate("alias-id").then(data => {
    expectType<Mangopay.bankingAlias.IBANBankingAliasData>(data);
});

/* DisputeDocuments */
api.DisputeDocuments.getAll().then(data => {
    expectType<Mangopay.disputeDocument.DisputeDocumentData[]>(data);
});

api.DisputeDocuments.get("dispute-doc-id").then(data => {
    expectType<Mangopay.disputeDocument.DisputeDocumentData>(data);
});

api.DisputeDocuments.createDisputeDocumentConsult("dispute-doc-id").then(
    data => {
        expectType<any>(data); // TODO unsure of expected type from docs
    }
);

/* Repudiations */
api.Repudiations.getRefunds("repudiation-id").then(data => {
    expectType<Mangopay.refund.RefundData[]>(data);
});

/* Disputes */
api.Disputes.get("dispute-id").then(data => {
    expectType<Mangopay.dispute.DisputeData>(data);
});

api.Disputes.getAll().then(data => {
    expectType<Mangopay.dispute.DisputeData[]>(data);
});

api.Disputes.update({Tag: "any tags"}).then(data => {
    expectType<Mangopay.dispute.DisputeData>(data);
});

api.Disputes.contestDispute("dispute-id", {
    Amount: 1000,
    Currency: "GBP"
}).then(data => {
    expectType<Mangopay.dispute.DisputeData>(data);
});

api.Disputes.resubmitDispute("dispute-id").then(data => {
    expectType<Mangopay.dispute.DisputeData>(data);
});

api.Disputes.closeDispute("dispute-id").then(data => {
    expectType<Mangopay.dispute.DisputeData>(data);
});

api.Disputes.getTransactions("dispute-id").then(data => {
    expectType<Mangopay.transaction.TransactionData[]>(data);
});

api.Disputes.getDisputesForWallet("wallet-id").then(data => {
    expectType<Mangopay.dispute.DisputeData[]>(data);
});

api.Disputes.getDisputesForUser("user-id").then(data => {
    expectType<Mangopay.dispute.DisputeData[]>(data);
});

api.Disputes.getRepudiation("repudiation-id").then(data => {
    expectType<Mangopay.repudiation.RepudiationData>(data);
});

api.Disputes.createSettlementTransfer(
    {
        AuthorId: "user-id",
        DebitedFunds: {Amount: 1000, Currency: "GBP"},
        Fees: {Amount: 200, Currency: "GBP"}
    },
    "repudiation-id"
).then(data => {
    expectType<Mangopay.settlementTransfer.SettlementTransferData>(data);
});

api.Disputes.getSettlementTransfer("settlement-id").then(data => {
    expectType<Mangopay.settlementTransfer.SettlementTransferData>(data);
});

api.Disputes.getDocumentsForDispute("dispute-id").then(data => {
    expectType<Mangopay.disputeDocument.DisputeDocumentData[]>(data);
});

api.Disputes.updateDisputeDocument("dispute-id", {Tag: "update"}).then(
    data => {
        expectType<Mangopay.disputeDocument.DisputeDocumentData>(data);
    }
);

api.Disputes.createDisputeDocument("dispute-id", {
    Type: "DELIVERY_PROOF"
}).then(data => {
    expectType<Mangopay.disputeDocument.DisputeDocumentData>(data);
});

api.Disputes.createDisputeDocumentPage("dispute-id", "dispute-doc-id", {
    File: "...base64string..."
}).then(data => {
    expectType<Mangopay.disputeDocument.DisputeDocumentData>(data);
});

api.Disputes.createDisputeDocumentPageFromFile(
    "dispute-id",
    "dispute-doc-id",
    "path/to/file"
).then(data => {
    expectType<Mangopay.disputeDocument.DisputeDocumentData>(data);
});

api.Disputes.getPendingSettlement().then(data => {
    expectType<Mangopay.dispute.DisputeData[]>(data);
});

/* Events */
api.Events.getAll().then(data => {
    expectType<Mangopay.event.EventData[]>(data);
});

/* Responses */
api.Responses.get().then(data => {
    expectType<any[]>(data);
});

/* Mandates */
api.Mandates.create({
    BankAccountId: "bank-account-id",
    ReturnURL: "https://return-url.com",
    Culture: "EN"
}).then(data => {
    expectType<Mangopay.mandate.MandateData>(data);
});

api.Mandates.getAll().then(data => {
    expectType<Mangopay.mandate.MandateData[]>(data);
});

api.Mandates.get("mandate-id").then(data => {
    expectType<Mangopay.mandate.MandateData>(data);
});

api.Mandates.cancel("mandate-id").then(data => {
    expectType<Mangopay.mandate.MandateData>(data);
});

api.Mandates.getMandatesForUser("user-id").then(data => {
    expectType<Mangopay.mandate.MandateData[]>(data);
});

api.Mandates.getMandatesForBankAccount("user-id", "bank-account-id").then(
    data => {
        expectType<Mangopay.mandate.MandateData[]>(data);
    }
);
api.Mandates.getTransactions("mandate-id").then(data => {
    expectType<Mangopay.transaction.TransactionData[]>(data);
});

/* Hooks */
api.Hooks.create({
    Url: "https://hook-url.com",
    EventType: "DISPUTE_ACTION_REQUIRED"
}).then(data => {
    expectType<Mangopay.hook.HookData>(data);
});

api.Hooks.get("hook-id").then(data => {
    expectType<Mangopay.hook.HookData>(data);
});

api.Hooks.update({Id: "hook-id", Url: "https://new-hook.com/hooks"}).then(
    data => {
        expectType<Mangopay.hook.HookData>(data);
    }
);

api.Hooks.getAll().then(data => {
    expectType<Mangopay.hook.HookData[]>(data);
});

/* Reports */
api.Reports.create({Columns: ["Alias", "AuthorId"], ReportType: "WALLETS"}).then(data => {
    expectType<Mangopay.report.ReportData>(data);
});

api.Reports.get("report-id").then(data => {
    expectType<Mangopay.report.ReportData>(data);
});

api.Reports.getAll().then(data => {
    expectType<Mangopay.report.ReportData[]>(data);
});

api.Idempotency.get("idempotency-key").then(data => {
    expectType<Mangopay.idempotency.IdempotencyData>(data);
});

api.Regulatory.getCountryAuthorizations("FR").then(data => {
    expectType<Mangopay.countryAuthorization.CountryAuthorizationData>(data);
});

api.Regulatory.getAllCountriesAuthorizations().then(data => {
    expectType<Mangopay.countryAuthorization.CountryAuthorizationData[]>(data);
});

api.Deposits.create(new api.models.Deposit({
    AuthorId: "placeholder",
    DebitedFunds: {
        Amount: 1000,
        Currency: "EUR"
    },
    CardId: "placeholder",
    SecureModeReturnURL: "https://lorem",
    IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
    BrowserInfo: {
        AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
        ColorDepth: 4,
        JavaEnabled: true,
        JavascriptEnabled: true,
        Language: 'FR-FR',
        ScreenHeight: 1800,
        ScreenWidth: 400,
        TimeZoneOffset: "+60",
        UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
    }
}), data => {
    expectType<Mangopay.deposit.DepositData>(data);
});

api.Deposits.get("placeholder", data => {
    expectType<Mangopay.deposit.DepositData>(data);
});

api.Deposits.cancel("placeholder", data => {
    expectType<Mangopay.deposit.DepositData>(data);
});

api.PayIns.createCardPreAuthorizedDepositPayIn({
    CreditedWalletId: "placeholder",
    DebitedFunds: {
        Amount: 1000,
        Currency: "EUR"
    },
    Fees: {
        Amount: 1000,
        Currency: "EUR"
    },
    DepositId: "placeholder"
}, data => {
    expectType<Mangopay.payIn.CardPreAuthorizedDepositPayInData>(data);
});

api.Conversions.getConversionRate("EUR", "GBP")
    .then(data => {
        expectType<Mangopay.conversionRate.ConversionRateData>(data);
    });

api.Conversions.createInstantConversion(
    {
        AuthorId: "author-id",
        CreditedWalletId: "credited-wallet-id",
        DebitedWalletId: "debited-wallet-id",
        CreditedFunds: {
            Amount: 0,
            Currency: "GBP"
        },
        DebitedFunds: {
            Amount: 79,
            Currency: "EUR"
        }
    }
).then(data => {
    expectType<Mangopay.conversion.ConversionData>(data);
});

api.Conversions.createQuotedConversion(
    {
        QuoteId: "quote-id",
        AuthorId: "author-id",
        CreditedWalletId: "credited-wallet-id",
        DebitedWalletId: "debited-wallet-id"
    }
).then(data => {
    expectType<Mangopay.conversion.ConversionData>(data);
});

api.Conversions.getConversion("conversion-id")
    .then(data => {
        expectType<Mangopay.conversion.ConversionData>(data);
    });

api.Conversions.createQuote(
    {
        CreditedFunds: {
            Amount: 0,
            Currency: "GBP"
        },
        DebitedFunds: {
            Amount: 79,
            Currency: "EUR"
        },
        Duration: 60
    }
).then(data => {
    expectType<Mangopay.conversion.QuoteData>(data);
});

api.Conversions.getQuote("quote-id")
    .then(data => {
        expectType<Mangopay.conversion.QuoteData>(data);
    });

api.OptionsHelper.withIdempotency({}, "1234")
    .then(data => {
        expectType<base.MethodOptions>(data);
    })

/* Namespace Access */
const bankAccountType: Mangopay.bankAccount.BankAccountType = "CA";

const bankingAliasType: Mangopay.bankingAlias.BankingAliasType = "IBAN";

const billingData: Mangopay.billing.BillingData = {
    Address: address
};

const birthplace: Mangopay.birthplace.Birthplace = {
    City: "palceholder",
    Country: "FR"
};

const cardType: Mangopay.card.CardType = "CB_VISA_MASTERCARD";

const paymentStatus: Mangopay.cardPreAuthorization.PaymentStatus = "CANCELED";

const createCardRegistration: Mangopay.cardRegistration.CreateCardRegistration = {
    UserId: "placeholder",
    Currency: "AFN"
};

const businessType: Mangopay.client.BusinessType = "CROWDFUNDING";

const disputeReasonType: Mangopay.dispute.DisputeReasonType = "AUTHORISATION_DISPUTED";

const disputeDocumentType: Mangopay.disputeDocument.DisputeDocumentType = "DELIVERY_PROOF";

const eventType: Mangopay.event.EventType = "DISPUTE_ACTION_REQUIRED";

const hookStatus: Mangopay.hook.HookStatus = "ENABLED";

const idempotency: Mangopay.idempotency.IdempotencyData = {
    Id: "placeholder",
    Tag: "placeholder",
    ContentLength: "123",
    ContentType: "placeholder",
    CreationDate: 1234,
    Date: 1234,
    RequestURL: "placeholder",
    Resource: undefined,
    StatusCode: "1234"
};

const kycDocumentType: Mangopay.kycDocument.KycDocumentType = "ADDRESS_PROOF";

const mandateStatus: Mangopay.mandate.MandateStatus = "CREATED";

const moneyData: Mangopay.money.MoneyData = {
    Currency: "AFN",
    Amount: 1234
};

const directDebitType: Mangopay.payIn.DirectDebitType = "GIROPAY";

const payoutModeRequestedType: Mangopay.payOut.PayoutModeRequestedType = "INSTANT_PAYMENT";

const refundReasonType: Mangopay.refund.RefundReasonType = "BANKACCOUNT_HAS_BEEN_CLOSED";

const reportColumn: Mangopay.report.Column = "Tag";

const avsResult: Mangopay.securityInfo.AVSResult = "ADDRESS_MATCH_ONLY";

const createSettlementTransfer: Mangopay.settlementTransfer.CreateSettlementTransfer = {
    AuthorId: "placeholder",
    DebitedFunds: {
        Amount: 1234,
        Currency: "AFN"
    },
    Fees: {
        Amount: 1234,
        Currency: "AFN"
    }
};

const shippingData: Mangopay.shipping.ShippingData = {
    Address: address,
    FirstName: "placeholder",
    LastName: "placeholder"
};

const shippingAddressData: Mangopay.shippingAddress.ShippingAddressData = {
    Address: address,
    RecipientName: "placeholder"
};

const transactionType: Mangopay.transaction.TransactionType = "TRANSFER";

const createTransfer: Mangopay.transfer.CreateTransfer = {
    AuthorId: "placeholder",
    Fees: {
        Amount: 1234,
        Currency: "AFN"
    },
    DebitedFunds: {
        Amount: 1234,
        Currency: "AFN"
    },
    CreditedWalletId: "placeholder",
    DebitedWalletId: "placeholder"
};

const createUboDeclaration: Mangopay.uboDeclaration.CreateUboDeclaration = {
    Ubos: []
};

const personType: Mangopay.user.PersonType = Mangopay.models.PersonType.Legal;

const clientFundsType: Mangopay.wallet.ClientFundsType = "CREDIT";

const timestamp: Mangopay.Timestamp = 1234;

const secureMode: Mangopay.SecureMode = "DEFAULT";

const countryISO: Mangopay.CountryISO = "FR";

const currencyISO: Mangopay.CurrencyISO = "EUR";
