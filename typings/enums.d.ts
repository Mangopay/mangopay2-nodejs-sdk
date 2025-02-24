export namespace enums {
    interface IPayInExecutionType {
        Direct: "DIRECT";
        Web: "WEB";
    }

    interface IPayInPaymentType {
        BankWire: "BANK_WIRE";
        Card: "CARD";
        DirectDebit: "DIRECT_DEBIT";
        Preauthorized: "PREAUTHORIZED";
        PayPal: "PAYPAL";
        Payconiq: "PAYCONIQ";
        Mbway: "MBWAY";
        Multibanco: "MULTIBANCO";
        Satispay: "SATISPAY";
        Blik: "BLIK";
        ApplePay: "APPLEPAY";
        GooglePay: "GOOGLE_PAY";
        Klarna: "KLARNA";
        Ideal: "IDEAL";
        Giropay: "GIROPAY";
        Bancontact: "BCMC";
        Swish: "SWISH";
        PayByBank: "PAY_BY_BANK"
    }

    interface IMandateStatus {
        Created: "CREATED";
        Submitted: "SUBMITTED";
        Active: "ACTIVE";
        Failed: "FAILED";
        Expired: "EXPIRED";
    }

    interface ILegalPersonType {
        NotSpecified: "NotSpecified";
        Business: "BUSINESS";
        Organization: "ORGANIZATION";
        Soletrader: "SOLETRADER";
        Partnership: "PARTNERSHIP";
    }

    interface IPersonType {
        NotSpecified: "NotSpecified";
        Natural: "NATURAL";
        Legal: "LEGAL";
    }

    interface IUserCategory {
        Payer: "PAYER";
        Owner: "OWNER";
    }

    interface IBankAccountType {
        NotSpecified: "NotSpecified";
        IBAN: "IBAN";
        GB: "GB";
        US: "US";
        CA: "CA";
        OTHER: "OTHER";
    }

    interface IDeclaredUboStatus {
        Created: "CREATED";
        Validated: "VALIDATED";
        Refused: "REFUSED";
    }

    interface IKycDocumentStatus {
        Created: "CREATED";
        ValidationAsked: "VALIDATION_ASKED";
        Validated: "VALIDATED";
        Refused: "REFUSED";
    }

    interface IKycDocumentType {
        IdentityProof: "IDENTITY_PROOF";
        RegistrationProof: "REGISTRATION_PROOF";
        ArticlesOfAssociation: "ARTICLES_OF_ASSOCIATION";
        ShareholderDeclaration: "SHAREHOLDER_DECLARATION";
        AddressProof: "ADDRESS_PROOF";
    }

    interface IPayOutPaymentType {
        BankWire: "BANK_WIRE";
    }

    interface IPlatformType {
        NotSpecified: "NotSpecified";
        MARKETPLACE: "MARKETPLACE";
        P2P_PAYMENT: "P2P_PAYMENT";
        CROWDFUNDING_DONATION: "CROWDFUNDING_DONATION";
        CROWDFUNDING_REWARD: "CROWDFUNDING_REWARD";
        CROWDFUNDING_EQUITY: "CROWDFUNDING_EQUITY";
        CROWDFUNDING_LOAN: "CROWDFUNDING_LOAN";
        OTHER: "OTHER";
    }

    interface IUboDeclarationRefusedReasonType {
        /**
         * When at least one natural user is missing on the declaration
         */
        MissingUbo: 'MISSING_UBO';

        DeclarationDontMatchUboInfo: 'DECLARATION_DO_NOT_MATCH_UBO_INFORMATION';

        WrongUboInformation: 'WRONG_UBO_INFORMATION';

        UboIdentityNeeded: 'UBO_IDENTITY_NEEDED';

        ShareholdersDeclarationNeeded: 'SHAREHOLDERS_DECLARATION_NEEDED';

        OrganizationChartNeeded: 'ORGANIZATION_CHART_NEEDED';

        DocumentsNeeded: 'DOCUMENTS_NEEDED';

        SpecificCase: 'SPECIFIC_CASE';
    }

    interface IUboDeclarationStatus {
        /**
         * When the UBO declaration was created
         */
        Created: "CREATED";

        /**
         * When validation has been requested for the UBO declaration
         */
        ValidationAsked: "VALIDATION_ASKED";

        /**
         * When the UBO declaration was validated
         */
        Validated: "VALIDATED";

        /**
         * When the UBO declaration was refused
         */
        Refused: "REFUSED";

        /**
         * When the UBO declaration was incomplete
         */
        Incomplete: 'INCOMPLETE';
    }

    interface IUboRefusedReasonType {
        /**
         * When user should not be declared as UBO
         */
        InvalidDeclaredUbo: "INVALID_DECLARED_UBO";

        /**
         * When user declared as UBO was created with wrong
         * details (i.e. date of birth, country of residence)
         */
        InvalidUboDetails: "INVALID_UBO_DETAILS";
    }

    interface IUserNaturalCapacity {
        /**
         * Real customer
         */
        Normal: "NORMAL";

        /**
         * User used only for declaration purpose
         */
        Declarative: "DECLARATIVE";
    }

    interface IDepositStatus {
        Created: "CREATED";
        Succeeded: "SUCCEEDED";
        Failed: "FAILED";
    }

    interface IPaymentStatus {
        Waiting: "WAITING";
        Canceled: "CANCELED";
        CancelRequested: "CANCEL_REQUESTED";
        Expired: "EXPIRED";
        ToBeCompleted: "TO_BE_COMPLETED";
        NoShowRequested: "NO_SHOW_REQUESTED";
        NoShow: "NO_SHOW";
        Validated: "VALIDATED";
        Failed: "FAILED";
    }

    interface IShippingPreference {
        SetProvidedAddress: "SET_PROVIDED_ADDRESS";
        GetFromFile: "GET_FROM_FILE";
        NoShipping: "NO_SHIPPING";
    }
}
