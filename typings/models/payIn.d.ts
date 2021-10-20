import { CountryISO, PickPartialRequired, SecureMode, Timestamp, ValueOf } from "../types";
import { Enums } from "../enums";
import { transaction } from "./transaction";
import { card } from "./card";
import { entityBase } from "./entityBase";
import { billing } from "./billing";
import { Base } from "../base";
import { money } from "./money";
import { securityInfo } from "./securityInfo";

export namespace payIn {
    import BillingData = billing.BillingData;
    import BillingOrShippingRecurringPayInData = billing.BillingOrShippingRecurringPayInData;
    import BrowserInfoData = Base.BrowserInfoData;
    import MoneyData = money.MoneyData;
    import SecurityInfoData = securityInfo.SecurityInfoData;

    type _3DSVersion = "V1" | "V2_1";

    type PayInData =
        | CardDirectPayInData
        | CardPreAuthorizedPayInData
        | CardWebPayInData
        | BankWireDirectPayInData
        | PayconiqWebPayInData
        | DirectDebitDirectPayInData;

    type PayInPaymentType = ValueOf<Enums.IPayInPaymentType>;

    type PayInExecutionType = ValueOf<Enums.IPayInExecutionType> | "EXTERNAL_INSTRUCTION";

    type RecurringType = "CLASSIC_SUBSCRIPTION" | "FRACTIONED_PAYMENT" | "CUSTOM";

    interface TemplateURLOptions {
        Payline: string;

        PAYLINEV2: string;
    }

    interface BasePayInData extends entityBase.EntityBaseData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Details about the funds that are being credited (DebitedFunds – Fees = CreditedFunds)
         */
        CreditedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * The ID of the wallet that was debited
         */
        DebitedWalletId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId: string;

        /**
         * The nature of the transaction
         */
        Nature: transaction.TransactionNature;

        /**
         * The status of the transaction
         */
        Status: transaction.TransactionStatus;

        /**
         * When the transaction happened
         */
        ExecutionDate: Timestamp;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * The type of the transaction
         */
        Type: transaction.TransactionType;

        /**
         * The type of payin
         */
        PaymentType: PayInPaymentType;

        /**
         * The type of execution for the payin
         */
        ExecutionType: PayInExecutionType;
    }

    interface CardWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "CARD";

        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The type of card
         */
        CardType: card.CardType;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it
         * automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * The URL to use for the payment page template
         */
        TemplateURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;
    }

    interface CreateCardWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "CARD";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId?: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * The type of card
         */
        CardType: card.CardType;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually.
         * The field lets you activate it automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects
         * there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode?: SecureMode;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * A URL to an SSL page to allow you to customise the payment page. Must be in the format: array("PAYLINE"=>"https://...") and meet all the
         * specifications listed here. Note that only a template for Payline is currently available
         */
        TemplateURLOptions?: TemplateURLOptions;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and
         * can only include alphanumeric characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;
    }

    interface CardDirectPayInData extends BasePayInData {
        ExecutionType: "DIRECT";

        PaymentType: "CARD";

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it
         * automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * Contains useful information related to the user billing
         */
        Billing: BillingData;

        /**
         * Contains information related to security and fraud
         */
        SecurityInfo: SecurityInfoData;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectURL: string;
    }

    interface CreateCardDirectPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "CARD";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId?: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it automatically
         *  with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode?: SecureMode;

        /**
         * Contains useful information related to the user billing
         */
        Billing?: BillingData;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * The ip address
         */
        IpAddress?: string;

        BrowserInfo?: BrowserInfoData;
    }

    interface DirectDebitDirectPayInData extends BasePayInData {
        ChargeDate: Timestamp;

        MandateId: string;
    }

    interface CreateDirectDebitDirectPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "DIRECT_DEBIT";

        AuthorId: string;

        CreditedUserId?: string;

        CreditedWalletId: string;

        DebitedFunds: MoneyData;

        Fees: MoneyData;

        MandateId: string;

        StatementDescriptor?: string;
    }

    interface CardPreAuthorizedPayInData extends BasePayInData {
        PreauthorizationId: string;

        ExecutionType: "DIRECT";

        PaymentType: "PREAUTHORIZED";
    }

    interface CreateCardPreAuthorizedPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "PREAUTHORIZED";

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId?: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * The ID of the Preauthorization object
         */
        PreauthorizationId: string;
    }

    interface BankAccountData {
        /**
         * The BIC of the bank account
         */
        BIC: string;

        /**
         * The IBAN of the bank account
         */
        IBAN: string;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: string;

        /**
         * The type of bank account
         */
        Type: ValueOf<Enums.IBankAccountType>;
    }

    interface BankWireDirectPayInData extends BasePayInData {
        ExecutionType: "DIRECT";

        PaymentType: "BANK_WIRE";

        /**
         * The declared debited funds
         */
        DeclaredDebitedFunds: MoneyData;

        /**
         * The declared fees
         */
        DeclaredFees: MoneyData;

        /**
         * Wire reference
         */
        WireReference: string;

        /**
         * Bank account details
         */
        BankAccount: BankAccountData;
    }

    interface CreateBankWireDirectPayIn extends PickPartialRequired<BankWireDirectPayInData,
        "Tag",
        "AuthorId" | "CreditedUserId" | "CreditedWalletId" | "DeclaredDebitedFunds" | "DeclaredFees"> {
        ExecutionType: "DIRECT";
        PaymentType: "BANK_WIRE";
    }

    interface PayInRecurringRegistrationState {
        PayinsLinked: number;

        CumulatedDebitedAmount: MoneyData;

        CumulatedFeesAmount: MoneyData;

        LastPayinId: number;
    }

    interface PayInRecurringRegistrationData extends entityBase.EntityBaseData {
        /**
         * The status of the transaction
         */
        Status: transaction.TransactionStatus;

        CurrentState: PayInRecurringRegistrationState;

        RecurringType: RecurringType;

        TotalAmount: number;

        CycleNumber: number;

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        Billing: BillingOrShippingRecurringPayInData;

        Shipping: BillingOrShippingRecurringPayInData;

        EndDate: Timestamp;

        Frequency: string;

        FixedNextAmount: boolean;

        FractionedPayment: boolean;

        FreeCycles: number;

        FirstTransactionDebitedFunds: MoneyData;

        FirstTransactionFees: MoneyData;

        NextTransactionDebitedFunds: MoneyData;

        NextTransactionFees: MoneyData;

        Migration: boolean;
    }

    interface CreatePayInRecurringRegistration {
        AuthorId: string;

        CardId: string;

        CreditedUserId?: string;

        CreditedWalletId: string;

        FirstTransactionDebitedFunds: MoneyData;

        FirstTransactionFees: MoneyData;

        Billing?: BillingOrShippingRecurringPayInData;

        Shipping?: BillingOrShippingRecurringPayInData;

        EndDate?: Timestamp;

        Frequency?: number;

        FixedNextAmount?: boolean;

        FractionedPayment?: boolean;

        Migration?: boolean;

        NextTransactionDebitedFunds?: MoneyData;

        NextTransactionFees?: MoneyData;
    }

    interface UpdatePayInRecurringRegistration {
        CardId?: string;

        Billing?: BillingOrShippingRecurringPayInData;

        Shipping?: BillingOrShippingRecurringPayInData;
    }

    interface RecurringPayInData extends BasePayInData {
        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually.
         * The field lets you activate it automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ),
         * "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * Contains useful information related to security and fraud
         */
        SecurityInfo: SecurityInfoData;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        BrowserInfo: BrowserInfoData;

        IpAddress: string;

        Billing: BillingOrShippingRecurringPayInData;

        Shipping: BillingOrShippingRecurringPayInData;

        Requested3DSVersion: _3DSVersion;

        Applied3DSVersion: _3DSVersion;

        RecurringPayinRegistrationId: string;
    }

    interface CreateRecurringPayInCIT {
        RecurringPayinRegistrationId: string;

        BrowserInfo: BrowserInfoData;

        IpAddress: string;

        SecureModeReturnURL: string;

        StatementDescriptor?: string;

        Tag?: string;

        DebitedFunds?: MoneyData;

        Fees?: MoneyData;
    }

    interface CreateRecurringPayInMIT {
        RecurringPayinRegistrationId: string;

        DebitedFunds?: MoneyData;

        Fees?: MoneyData;

        StatementDescriptor?: string;

        Tag?: string;
    }

    interface PayconiqWebPayInData extends BasePayInData {
        ExecutionType: "WEB";
        PaymentType: "PAYCONIQ";

        /**
         * Time in millis when the page consult will expire.
         */
        ExpirationDate: Timestamp;

        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * The URL to be used in App2App workflow
         */
        DeepLinkURL: string;
    }

    interface CreatePayconiqWebPayInData {
        ExecutionType: "WEB";
        PaymentType: "PAYCONIQ";

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The Country of the Address
         */
        Country: CountryISO;
    }
}
