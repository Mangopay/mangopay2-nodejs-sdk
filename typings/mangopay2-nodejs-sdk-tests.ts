import Mangopay = require("mangopay2-nodejs-sdk");

// $ExpectError
const invalidConfig: Mangopay.base.Config = {};

/* General Types */

const validConfig: Mangopay.base.Config = {
    clientId: "your_client_id",
    clientApiKey: "your_client_api_key",
    baseUrl: "https://api.mangopay.com"
};

const api = new Mangopay(validConfig); // $ExpectType MangoPay
const payIn: Mangopay.models.PayIn = new api.models.PayIn({}); // $ExpectType PayIn
const address: Mangopay.models.Address = new api.models.Address({}); // $ExpectType Address

const addressData: Mangopay.address.AddressData = {
    AddressLine1: "20 T Street",
    AddressLine2: "",
    City: "London",
    Country: "AD",
    PostalCode: "FR43 2WE",
    Region: "London"
};

/* Users */

const legalUser = new api.models.UserLegal({
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
    LegalRepresentativeBirthday: 1300186358,
    LegalRepresentativeNationality: "FR",
    LegalRepresentativeCountryOfResidence: "FR",
    Tag: "custom tag"
});

api.Users.create(legalUser).then(data => {
    const d = data; // $ExpectType UserLegalData
    const value = data.PersonType; // $ExpectType "LEGAL"

    const rateLimits = api.rateLimits; // $ExpectType RateLimit[]

    console.log(`${legalUser.Name} user created at ${legalUser.CreationDate}`);
});

api.Users.create(legalUser, {resolveWithFullResponse: true}).then(data => {
    const d = data; // $ExpectType WithResponse<UserLegalData>
    const value = data.body; // $ExpectType UserLegalData
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
    const d = data; // $ExpectType UserLegalData
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
    const d = data; // $ExpectType UserNaturalData
    const value = data.PersonType; // $ExpectType "NATURAL"
    return;
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
        const d = data; // $ExpectType UserNaturalData
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
        const d = data; // $ExpectType UserNaturalData
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
        const d = data; // $ExpectType UserNaturalData
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
        const d = data; // $ExpectType UserLegalData
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
        const d = data; // $ExpectType UserLegalData
    }
);

api.Users.get("1234").then(data => {
    const d = data; // $ExpectType UserLegalData | UserNaturalData
    if (data.PersonType === "LEGAL") {
        const legalData = data; // $ExpectType UserLegalData
    } else {
        const naturalData = data; // $ExpectType UserNaturalData
    }
});

api.Users.getAll().then(users => {
    users.forEach(user => {
        const d = user; // $ExpectType UserLegalData | UserNaturalData
        if (user.PersonType === "LEGAL") {
            const legalData = user; // $ExpectType UserLegalData
        } else {
            const naturalData = user; // $ExpectType UserNaturalData
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
    const d = data; // $ExpectType UserNaturalData
});

api.Users.update({
    Id: "1234",
    PersonType: "LEGAL",
    Tag: "custom meta",
    TermsAndConditionsAccepted: true
}).then(data => {
    const d = data; // $ExpectType UserLegalData
});

api.Users.createBankAccount("user-id", {
    Type: "GB",
    AccountNumber: "12345678",
    SortCode: "123456",
    OwnerAddress: "",
    OwnerName: ""
}).then(data => {
    const d = data; // $ExpectType GBData
});

api.Users.getBankAccount("user-id", "bankAccount-id").then(data => {
    const d = data; // $ExpectType Data
});

api.Users.getBankAccounts("user-id", {parameters: {Sort: "CreationDate:ASC"}}).then(data => {
    const d = data; // $ExpectType Data[]
});

api.Users.deactivateBankAccount("user-id", "bankAccount-id").then(data => {
    const d = data; // $ExpectType Data
});

api.Users.getTransactions("user-id").then(data => {
    const d = data; // $ExpectType TransactionData[]
});

api.Users.getWallets("user-id").then(data => {
    const d = data; // $ExpectType WalletData[]
});

api.Users.getCards("user-id").then(data => {
    const d = data; // $ExpectType CardData[]
});

api.Users.createKycDocument("user-id", {Type: "ADDRESS_PROOF", Tag: "custom meta"}).then(data => {
    const d = data; // $ExpectType KycDocumentData
});

api.Users.getKycDocuments("user-id").then(data => {
    const d = data; // $ExpectType KycDocumentData[]
});

api.Users.getKycDocument("user-id", "kycDocument-id").then(data => {
    const d = data; // $ExpectType KycDocumentData
});

api.Users.updateKycDocument("user-id", {Status: "VALIDATION_ASKED", Id: "kycDocument-id"}).then(
    data => {
        const d = data; // $ExpectType KycDocumentData
    }
);

api.Users.createKycPage("user-id", "kycDocument-id", {
    File: "...base64data..."
}).then(data => {
    const d = data; // $ExpectType KycDocumentData
});

api.Users.createKycPageFromFile(
    "user-id",
    "kyc-document-id",
    "path/to/file"
).then(data => {
    const d = data; // $ExpectType KycDocumentData
});

// MangoPay.

api.Users.getEMoney("user-id").then(data => {
    const d = data; // $ExpectType EMoneyData
});

// api.Users.createUboDeclaration("user-id", { DeclaredUBOs: ["user1"] }).then(
//   data => {
//     const d = data; // $ExpectType UboDeclarationData
//   }
// );

api.Users.getPreAuthorizations("user-id").then(data => {
    const d = data; // $ExpectType CardPreAuthorizationData[]
});

/* KycDocuments */

api.KycDocuments.getAll().then(data => {
    const d = data; // $ExpectType KycDocumentData[]
});

api.KycDocuments.get("kyc-id").then(data => {
    const d = data; // $ExpectType KycDocumentData
});

api.KycDocuments.createKycDocumentConsult("kyc-id").then(data => {
    const d = data; // TODO unsure of expected type
});

/* UboDeclarations */

api.UboDeclarations.get("userId", "id").then(data => {
    const d = data; // $ExpectType UboDeclarationData
});

api.UboDeclarations.update("userId", {
    Id: "uboId",
    Ubos: ["user1", "user2"]
}).then(data => {
    const d = data; // $ExpectType UboDeclarationData
});

api.UboDeclarations.create("userId").then(data => {
    const d = data; // $ExpectType UboDeclarationData
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
    const d = data; // $ExpectType UboData
});

api.UboDeclarations.getAll("userId").then((data => {
    const d = data; // $ExpectType UboDeclarationData[]
}));

api.UboDeclarations.getUbo("userId", "uboDeclarationId", "uboId").then(data => {
    const d = data; // $ExpectType UboData
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
    const d = data; // $ExpectType UboData
});

/* BankAccounts */

api.BankAccounts.getTransactions("account-id").then(data => {
    const d = data; // $ExpectType TransactionData[]
});

/* Wallets */

api.Wallets.create({
    Currency: "GBP",
    Description: "A description",
    Owners: ["user-id"]
}).then(data => {
    const d = data; // $ExpectType WalletData
});

const wallet = new api.models.Wallet({
    Currency: "EUR",
    Description: "A description",
    Owners: ["user-id"]
});

api.Wallets.create(wallet).then(data => {
    const d = data; // $ExpectType WalletData
});

api.Wallets.update({
    Description: "A description"
}).then(data => {
    const d = data; // $ExpectType WalletData
});

api.Wallets.get("wallet-id").then(data => {
    const d = data; // $ExpectType WalletData
});

api.Wallets.getTransactions("wallet-id").then(data => {
    const d = data; // $ExpectType TransactionData[]
});

/* Cards */

api.Cards.get("card-id").then(data => {
    const d = data; // $ExpectType CardData
});

api.Cards.getByFingerprint("fingerprinthash").then(data => {
    const d = data; // $ExpectType CardData[]
});

api.Cards.update({Active: false, Id: "card-id"}).then(data => {
    const d = data; // $ExpectType CardData
});

api.Cards.getTransactions("card-id").then(data => {
    const d = data; // $ExpectType TransactionData[]
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
    const d = data; // $ExpectType CardValidationData
});

api.Cards.getCardValidation(
    "cardId",
    "cardValidationId"
).then(data => {
    const d = data; // $ExpectType CardValidationData
});

/* CardRegistrations */

api.CardRegistrations.create({
    CardType: "BCMC",
    Currency: "GBP",
    UserId: "user-id"
}).then(data => {
    const d = data; // $ExpectType CardRegistrationData
});

api.CardRegistrations.get("reg-id").then(data => {
    const d = data; // $ExpectType CardRegistrationData
});

api.CardRegistrations.update({RegistrationData: "hmmm", Id: "Id"}).then(data => {
    const d = data; // $ExpectType CardRegistrationData
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
    const d = data; // $ExpectType CardPreAuthorizationData
});

api.CardPreAuthorizations.get("auth-id").then(data => {
    const d = data; // $ExpectType CardPreAuthorizationData
});

api.CardPreAuthorizations.update({
    Id: "auth-id",
    PaymentStatus: "CANCELED"
}).then(data => {
    const d = data; // $ExpectType CardPreAuthorizationData
});

/* Refunds */

api.Refunds.get("refund-id").then(data => {
    const d = data; // $ExpectType RefundData
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
    const d = data; // $ExpectType CardDirectPayInData
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
    const d = data; // $ExpectType MbwayWebPayInData
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
    const d = data; // $ExpectType KlarnaWebPayInData
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
    const d = data; // $ExpectType MultibancoWebPayInData
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
    const d = data; // $ExpectType SatispayWebPayInData
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
    const d = data; // $ExpectType BlikWebPayInData
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
    const d = data; // $ExpectType IdealWebPayInData
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
    const d = data; // $ExpectType GiropayWebPayInData
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
    const d = data; // $ExpectType SwishWebPayInData
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
    const d = data; // $ExpectType CardWebPayInData
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
    const d = data; // $ExpectType CardWebPayInData
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
    const d = data; // $ExpectType PayPalWebPayInData
});

api.PayIns.addPayPalTrackingInformation(
    "payInId",
    {
        TrackingNumber: "123456789",
        Carrier: "DHL",
        NotifyBuyer: true
    }).then(data => {
    const d = data; // $ExpectType PayPalWebPayInData
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
    const d = data; // $ExpectType GooglePayDirectPayInData
});

api.PayIns.create({
    PaymentType: "BANK_WIRE",
    ExecutionType: "DIRECT",
    AuthorId: "user-id",
    CreditedWalletId: "wallet-id",
    DeclaredDebitedFunds: {Amount: 10000, Currency: "GBP"},
    DeclaredFees: {Amount: 500, Currency: "GBP"}
}).then(data => {
    const d = data; // $ExpectType BankWireDirectPayInData
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
    const d = data; // $ExpectType PayconiqWebPayInData
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
    const d = data; // $ExpectType DirectDebitDirectPayInData
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
    const d = data; // $ExpectType DirectDebitWebPayInData
});

api.PayIns.get("payin-id").then(data => {
    const d = data; // $ExpectType PayInData
});

api.PayIns.createRefund("payin-id", {AuthorId: "user-id"}).then(data => {
    const d = data; // $ExpectType RefundData
});

api.PayIns.createRefund("payin-id", {
    AuthorId: "user-id",
    DebitedFunds: {Amount: 100, Currency: "EUR"},
    Fees: {Amount: 15, Currency: "EUR"}
}).then(data => {
    const d = data; // $ExpectType RefundData
});

api.PayIns.getRefunds("payin-id").then(data => {
    const d = data; // $ExpectType RefundData[]
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
    const d = data; // $ExpectType PayInRecurringRegistrationData
});

api.PayIns.getRecurringPayin("payin-id").then(data => {
    const d = data; // $ExpectType PayInRecurringRegistrationData
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
    const d = data; // $ExpectType PayInRecurringRegistrationData
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
    const d = data; // $ExpectType RecurringPayInData
});

api.PayIns.createRecurringPayInRegistrationMIT({
    RecurringPayinRegistrationId: "recurring-payin-reg-id",
    DebitedFunds: {Amount: 100, Currency: "EUR"},
    Fees: {Amount: 100, Currency: "EUR"},
    StatementDescriptor: "lorem",
    Tag: "custom meta"
}).then(data => {
    const d = data; // $ExpectType RecurringPayInData
});

api.PayIns.getPaymentMethodMetadata({
    Type: "BIN",
    Bin: "1234"
}).then(data => {
    const d = data; // $ExpectType PaymentMethodMetadata
});

/* Clients */
api.Clients.get().then(data => {
    const d = data; // $ExpectType ClientData
});

api.Clients.update({PlatformType: "CROWDFUNDING_DONATION"}).then(data => {
    const d = data; // $ExpectType ClientData
});

api.Clients.uploadLogo("...logobase64...").then(data => {
    const d = data; // $ExpectType ClientData
});

api.Clients.uploadLogoFromFile("path/to/file").then(data => {
    const d = data; // $ExpectType ClientData
});

api.Clients.getClientWallets().then(data => {
    const d = data; // $ExpectType ClientWalletData[]
});

api.Clients.getClientWallet("CREDIT", "GBP").then(data => {
    const d = data; // $ExpectType ClientWalletData
});

api.Clients.getClientWalletsByFundsType("FEES").then(data => {
    const d = data; // $ExpectType ClientWalletData[]
});

api.Clients.getClientWalletTransactions("CREDIT", "GBP").then(data => {
    const d = data; // $ExpectType TransactionData[]
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
    const d = data; // $ExpectType PayOutData
});

api.PayOuts.get("payout-id").then(data => {
    const d = data; // $ExpectType PayOutData
});

api.PayOuts.getRefunds("payout-id").then(data => {
    const d = data; // $ExpectType RefundData[]
});

api.PayOuts.checkEligibility({
    AuthorId: "user-id",
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    BankAccountId: "bank-id",
    PayoutModeRequested: "INSTANT_PAYMENT",
    DebitedWalletId: "wallet_id",
    PaymentType: api.models.PayOutPaymentType.BankWire
}).then(data => {
    const d = data; // $ExpectType CheckPayOutEligibilityData
});

/* Transfers */

api.Transfers.create({
    Fees: {Amount: 0, Currency: "GBP"},
    AuthorId: "user-id",
    DebitedFunds: {Amount: 2000, Currency: "GBP"},
    DebitedWalletId: "debit-wallet-id",
    CreditedWalletId: "credit-wallet-id"
}).then(data => {
    const d = data; // $ExpectType TransferData
});

api.Transfers.get("transfer-id").then(data => {
    const d = data; // $ExpectType TransferData
});

api.Transfers.createRefund("transfer-id", {AuthorId: "user-id"}).then(
    data => {
        const d = data; // $ExpectType RefundData
    }
);

api.Transfers.getRefunds("transfer-id").then(data => {
    const d = data; // $ExpectType RefundData[]
});

/* BankingAliases */

api.BankingAliases.create({
    Country: "GB",
    OwnerName: "owner-id",
    Type: 'IBAN',
    WalletId: '1234'
}).then(data => {
    const d = data; // $ExpectType IBANBankingAliasData
});
api.BankingAliases.get("alias-id").then(data => {
    const d = data; // $ExpectType IBANBankingAliasData
});
api.BankingAliases.getAll().then(data => {
    const d = data; // $ExpectType IBANBankingAliasData[]
});
api.BankingAliases.update({
    Id: '1234',
    Active: false
}).then(data => {
    const d = data; // $ExpectType IBANBankingAliasData
});
api.BankingAliases.deactivate("alias-id").then(data => {
    const d = data; // $ExpectType IBANBankingAliasData
});
api.BankingAliases.activate("alias-id").then(data => {
    const d = data; // $ExpectType IBANBankingAliasData
});

/* DisputeDocuments */

api.DisputeDocuments.getAll().then(data => {
    const d = data; // $ExpectType DisputeDocumentData[]
});

api.DisputeDocuments.get("dispute-doc-id").then(data => {
    const d = data; // $ExpectType DisputeDocumentData
});

api.DisputeDocuments.createDisputeDocumentConsult("dispute-doc-id").then(
    data => {
        const d = data; // TODO unsure of expected type
    }
);

/* Repudiations */

api.Repudiations.getRefunds("repudiation-id").then(data => {
    const d = data; // $Expect RefundData[]
});

/* Disputes */

api.Disputes.get("dispute-id").then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.getAll().then(data => {
    const d = data; // $Expect DisputeData[]
});

api.Disputes.update({Tag: "any tags"}).then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.contestDispute("dispute-id", {
    Amount: 1000,
    Currency: "GBP"
}).then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.resubmitDispute("dispute-id").then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.closeDispute("dispute-id").then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.getTransactions("dispute-id").then(data => {
    const d = data; // $Expect TransactionData[]
});

api.Disputes.getDisputesForWallet("wallet-id").then(data => {
    const d = data; // $Expect DisputeData[]
});

api.Disputes.getDisputesForUser("user-id").then(data => {
    const d = data; // $Expect DisputeData[]
});

api.Disputes.getRepudiation("repudiation-id").then(data => {
    const d = data; // $Expect RepudationData
});

api.Disputes.createSettlementTransfer(
    {
        AuthorId: "user-id",
        DebitedFunds: {Amount: 1000, Currency: "GBP"},
        Fees: {Amount: 200, Currency: "GBP"}
    },
    "repudiation-id"
).then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.getSettlementTransfer("settlement-id").then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.getDocumentsForDispute("dispute-id").then(data => {
    const d = data; // $Expect DisputeDocumentData[]
});

api.Disputes.updateDisputeDocument("dispute-id", {Tag: "update"}).then(
    data => {
        const d = data; // $Expect DisputeDocumentData
    }
);

api.Disputes.createDisputeDocument("dispute-id", {
    Type: "DELIVERY_PROOF"
}).then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.createDisputeDocumentPage("dispute-id", "dispute-doc-id", {
    File: "...base64string..."
}).then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.createDisputeDocumentPageFromFile(
    "dispute-id",
    "dispute-doc-id",
    "path/to/file"
).then(data => {
    const d = data; // $Expect DisputeData
});

api.Disputes.getPendingSettlement().then(data => {
    const d = data; // $Expect DisputeData
});

/* Events */

api.Events.getAll().then(data => {
    const d = data; // $Expect EventData[]
});

/* Responses */

api.Responses.get().then(data => {
    const d = data; // $ExpectType any[]
});

/* Mandates */

api.Mandates.create({
    BankAccountId: "bank-account-id",
    ReturnURL: "https://return-url.com",
    Culture: "EN"
}).then(data => {
    const d = data; // $ExpectType MandateData
});

api.Mandates.getAll().then(data => {
    const d = data; // $ExpectType MandateData[]
});

api.Mandates.get("mandate-id").then(data => {
    const d = data; // $ExpectType MandateData
});

api.Mandates.cancel("mandate-id").then(data => {
    const d = data; // $ExpectType MandateData
});

api.Mandates.getMandatesForUser("user-id").then(data => {
    const d = data; // $ExpectType MandateData[]
});

api.Mandates.getMandatesForBankAccount("user-id", "bank-account-id").then(
    data => {
        const d = data; // $ExpectType MandateData[]
    }
);
api.Mandates.getTransactions("mandate-id").then(data => {
    const d = data; // $ExpectType TransactionData[]
});

/* Hooks */

api.Hooks.create({
    Url: "https://hook-url.com",
    EventType: "DISPUTE_ACTION_REQUIRED"
}).then(data => {
    const d = data; // $ExpectType HookData
});

api.Hooks.get("hook-id").then(data => {
    const d = data; // $ExpectType HookData
});

api.Hooks.update({Id: "hook-id", Url: "https://new-hook.com/hooks"}).then(
    data => {
        const d = data; // $ExpectType HookData
    }
);

api.Hooks.getAll().then(data => {
    const d = data; // $ExpectType HookData[]
});

/* Reports */

api.Reports.create({Columns: ["Alias", "AuthorId"], ReportType: "WALLETS"}).then(data => {
    const d = data; // $ExpectType ReportData
});

api.Reports.get("report-id").then(data => {
    const d = data; // $ExpectType ReportData
});

api.Reports.getAll().then(data => {
    const d = data; // $ExpectType ReportData[]
});

api.Idempotency.get("idempotency-key").then(data => {
    const d = data; // $ExpectType IdempotencyData
});

api.Regulatory.getCountryAuthorizations("FR").then(data => {
    const d = data; // $ExpectType CountryAuthorizationData
});

api.Regulatory.getAllCountriesAuthorizations().then(data => {
    const d = data; // $ExpectType CountryAuthorizationData[]
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
    const d = data; // $ExpectType DepositData
});

api.Deposits.get("placeholder", data => {
    const d = data; // $ExpectType DepositData
});

api.Deposits.cancel("placeholder", data => {
    const d = data; // $ExpectType DepositData
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
    const d = data; // $ExpectType CardPreAuthorizedDepositPayInData
});

api.Conversions.getConversionRate("EUR", "GBP")
    .then(data => {
        const d = data; // $ExpectType ConversionRateData
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
    const d = data; // $ExpectType ConversionData
});

api.Conversions.createQuotedConversion(
    {
        QuoteId: "quote-id",
        AuthorId: "author-id",
        CreditedWalletId: "credited-wallet-id",
        DebitedWalletId: "debited-wallet-id"
    }
).then(data => {
    const d = data; // $ExpectType ConversionData
});

api.Conversions.getConversion("conversion-id")
    .then(data => {
        const d = data; // $ExpectType ConversionData
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
    const d = data; // $ExpectType QuoteData
});

api.Conversions.getQuote("quote-id")
    .then(data => {
        const d = data; // $ExpectType QuoteData
    });

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
