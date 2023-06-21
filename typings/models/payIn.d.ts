import { CountryISO, PickPartialRequired, SecureMode, Timestamp, ValueOf } from "../types";
import { enums } from "../enums";
import { transaction } from "./transaction";
import { card } from "./card";
import { entityBase } from "./entityBase";
import { billing } from "./billing";
import { base } from "../base";
import { money } from "./money";
import { securityInfo } from "./securityInfo";
import { shipping } from "./shipping";

export namespace payIn {
    import BillingData = billing.BillingData;
    import BillingOrShippingRecurringPayInData = billing.BillingOrShippingRecurringPayInData;
    import BrowserInfoData = base.BrowserInfoData;
    import MoneyData = money.MoneyData;
    import SecurityInfoData = securityInfo.SecurityInfoData;
    import ShippingData = shipping.ShippingData;

    type _3DSVersion = "V1" | "V2_1";

    type PayInData =
        | CardDirectPayInData
        | CardPreAuthorizedPayInData
        | CardWebPayInData
        | BankWireDirectPayInData
        | PayconiqWebPayInData
        | DirectDebitDirectPayInData
        | MbwayDirectPayInData;

    type PayInPaymentType = ValueOf<enums.IPayInPaymentType>;

    type PayInExecutionType = ValueOf<enums.IPayInExecutionType> | "EXTERNAL_INSTRUCTION";

    type RecurringType = "CLASSIC_SUBSCRIPTION" | "FRACTIONED_PAYMENT" | "CUSTOM";

    type DirectDebitType = "SOFORT" | "GIROPAY";

    type FrequencyType = "Daily" | "Weekly" | "TwiceAMonth" | "Monthly" | "Bimonthly" | "Quarterly" | "Semiannual" | "Annual" | "Biannual";

    type RecurringPaymentStatus = "CREATED" | "AUTHENTICATION_NEEDED" | "IN_PROGRESS" | "ENDED";

    type UpdateRecurringPaymentStatus = "ENDED";

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

        /**
         * Contains useful information related to the user billing
         */
        Billing?: BillingData;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: ShippingData;
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

    interface MbwayDirectPayInData extends BasePayInData {
        ExecutionType: "DIRECT";

        PaymentType: "MBWAY";

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * The mobile phone number of the user initiating the pay-in
         * Country code followed by hash symbol (#) followed by the rest of the number. Only digits and hash allowed
         */
        PhoneNumber: string;
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
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture?: CountryISO;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * IP Address of the end user (format IPV4 or IPV6)
         */
        IpAddress?: string;

        /**
         * This object describes the Browser being user by an end user
         */
        BrowserInfo?: BrowserInfoData;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: ShippingData;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;
    }

    interface CreateMbwayDirectPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "MBWAY";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * The mobile phone number of the user initiating the pay-in
         * Country code followed by hash symbol (#) followed by the rest of the number. Only digits and hash allowed
         */
        PhoneNumber: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;
    }

    interface DirectDebitDirectPayInData extends BasePayInData {
        /**
         * The date the user will be charged. Note that for direct debit payments, it will take one more day more the payment becomes successful
         */
        ChargeDate: Timestamp;

        /**
         * The ID of a Mandate
         */
        MandateId: string;

        /**
         * A custom description to appear on the user's bank statement.
         * It can be up to 100 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info and note that this functionality is only available for SEPA payments.
         */
        StatementDescriptor: string;
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

    interface DirectDebitWebPayInData extends BasePayInData {
        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * The type of web direct debit
         */
        DirectDebitType: DirectDebitType;

        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnUrl: string;

        /**
         * The SecureMode is used to select a 3DS1 and 3DS2 protocol for CB Visa and MasterCard.
         * The field lets you ask for an Frictionless payment with the value "DEFAULT".
         * The value "NO_CHOICE" will allow you to make the transaction eligible for Frictionless, but the exemption will be applied by the other payment actors.
         * The value force "FORCE" will force customer authentification.
         */
        SecureMode: SecureMode;

        /**
         * The URL to use for the payment page template
         */
        TemplateURL: string;

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        ReturnURL: string;
    }

    interface CreateDirectDebitWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "DIRECT_DEBIT";

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
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * The type of web direct debit
         */
        DirectDebitType: DirectDebitType;
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
        AuthorId?: string;

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
        Type: ValueOf<enums.IBankAccountType>;
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
        "Tag" | "CreditedUserId",
        "AuthorId" | "CreditedWalletId" | "DeclaredDebitedFunds" | "DeclaredFees"> {
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
        Status: RecurringPaymentStatus;

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

        /**
         * Contains every useful informations related to the user billing
         */
        Billing: BillingOrShippingRecurringPayInData;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping: BillingOrShippingRecurringPayInData;

        /**
         * Date on which the recurring payments will end
         */
        EndDate: Timestamp;

        /**
         * Frequency at which the recurring payments will be made
         */
        Frequency: FrequencyType;

        /**
         * Indicates whether the payment amount is likely to change during the payment period
         */
        FixedNextAmount: boolean;

        /**
         * Indicates whether this recurring payment is a payment in installments in N times
         */
        FractionedPayment: boolean;

        FreeCycles?: number;

        /**
         * Amount of the first payment. This amount may be different from the NextTransactionDebitedFunds.
         */
        FirstTransactionDebitedFunds: MoneyData;

        /**
         * Amount of the first payment fees. This amount may be different from the NextTransactionFees.
         */
        FirstTransactionFees: MoneyData;

        /**
         * Amount of subsequent payments. If this field is empty and either FixedNextAmount or FractionedPayment are TRUE,
         * we will take the amount of the FirstTransactionDebitedFunds as the subsequent payment amount.
         */
        NextTransactionDebitedFunds: MoneyData;

        /**
         * Amount of subsequent fees. If this field is empty and either FixedNextAmount or FractionedPayment are TRUE,
         * we will take the amount of the FirstTransactionFees as the subsequent fees.
         */
        NextTransactionFees: MoneyData;

        /**
         * Indicates whether the object is being used to attempt registration of an existing recurring payment
         */
        Migration: boolean;
    }

    interface CreatePayInRecurringRegistration {
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
        CreditedUserId?: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Amount of the first payment. This amount may be different from the NextTransactionDebitedFunds.
         */
        FirstTransactionDebitedFunds: MoneyData;

        /**
         * Amount of the first payment fees. This amount may be different from the NextTransactionFees.
         */
        FirstTransactionFees: MoneyData;

        /**
         * Contains every useful informations related to the user billing
         */
        Billing?: BillingOrShippingRecurringPayInData;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: BillingOrShippingRecurringPayInData;

        /**
         * Date on which the recurring payments will end
         */
        EndDate?: Timestamp;

        /**
         * Frequency at which the recurring payments will be made
         */
        Frequency?: FrequencyType;

        /**
         * Indicates whether the payment amount is likely to change during the payment period
         */
        FixedNextAmount?: boolean;

        /**
         * Indicates whether this recurring payment is a payment in installments in N times
         */
        FractionedPayment?: boolean;

        /**
         * Indicates whether the object is being used to attempt registration of an existing recurring payment
         */
        Migration?: boolean;

        /**
         * Amount of subsequent payments. If this field is empty and either FixedNextAmount or FractionedPayment are TRUE,
         * we will take the amount of the FirstTransactionDebitedFunds as the subsequent payment amount.
         */
        NextTransactionDebitedFunds?: MoneyData;

        /**
         * Amount of subsequent fees. If this field is empty and either FixedNextAmount or FractionedPayment are TRUE,
         * we will take the amount of the FirstTransactionFees as the subsequent fees.
         */
        NextTransactionFees?: MoneyData;

        FreeCycles?: number;
    }

    interface UpdatePayInRecurringRegistration {
        CardId?: string;

        Billing?: BillingOrShippingRecurringPayInData;

        Shipping?: BillingOrShippingRecurringPayInData;

        Status?: UpdateRecurringPaymentStatus;
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
        /**
         * The recurring's ID
         */
        RecurringPayinRegistrationId: string;

        /**
         * This object describes the Browser being user by an end user
         */
        BrowserInfo: BrowserInfoData;

        /**
         * IP Address of the end user (format IPV4 or IPV6)
         */
        IpAddress: string;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long,
         * and can only include alphanumeric characters or spaces. See here for important info.
         * Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * Amount of the subsequent payment. If this field is empty we will take the amount entered in the NextTransactionDebitedFunds of the Recurring PayIn Registration.
         * An amount must be transmitted during either registration or pay-in (if it’s different from the registration one).
         */
        DebitedFunds?: MoneyData;

        /**
         * Amount of the subsequent fees. If this field is empty we will take the amount entered in the NextTransactionFees
         * of the Recurring PayIn Registration. An amount must be transmitted during either registration or pay-in.
         */
        Fees?: MoneyData;
    }

    interface CreateRecurringPayInMIT {
        /**
         * The recurring's ID
         */
        RecurringPayinRegistrationId: string;

        /**
         * Amount of the subsequent payment. If this field is empty we will take the amount entered in the NextTransactionDebitedFunds
         * of the Recurring PayIn Registration. An amount must be transmitted during either registration or pay-in (if it’s different from the registration one).
         */
        DebitedFunds?: MoneyData;

        /**
         * Amount of the subsequent fees. If this field is empty we will take the amount entered in the NextTransactionFees
         * of the Recurring PayIn Registration. An amount must be transmitted during either registration or pay-in.
         */
        Fees?: MoneyData;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
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

    interface CreateCardPreAuthorizedDepositPayIn {
        AuthorId?: string;

        CreditedWalletId: string;

        DebitedFunds: MoneyData;

        Fees: MoneyData;

        DepositId: string;

        Tag?: string;
    }

    interface CardPreAuthorizedDepositPayInData extends entityBase.EntityBaseData {
        AuthorId: string;

        CreditedUserId: string;

        DepositId: string;

        ResultCode: string;

        ResultMessage: string;

        Status: transaction.TransactionStatus;

        ExecutionDate: Timestamp;

        Type: transaction.TransactionType;

        Nature: transaction.TransactionNature;

        PaymentType: PayInPaymentType;

        ExecutionType: PayInExecutionType;

        DebitedFunds: MoneyData;

        CreditedFunds: MoneyData;

        Fees: MoneyData;
    }
}
