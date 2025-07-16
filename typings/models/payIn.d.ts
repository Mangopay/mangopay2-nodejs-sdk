import { CountryISO, CultureISO, CurrencyISO, PickPartialRequired, SecureMode, Timestamp, ValueOf } from "../types";
import { enums } from "../enums";
import { transaction } from "./transaction";
import { card } from "./card";
import { entityBase } from "./entityBase";
import { billing } from "./billing";
import { base } from "../base";
import { money } from "./money";
import { securityInfo } from "./securityInfo";
import { shipping } from "./shipping";
import { address } from "./address";

export namespace payIn {
    import BillingData = billing.BillingData;
    import BillingOrShippingRecurringPayInData = billing.BillingOrShippingRecurringPayInData;
    import BrowserInfoData = base.BrowserInfoData;
    import MoneyData = money.MoneyData;
    import SecurityInfoData = securityInfo.SecurityInfoData;
    import ShippingData = shipping.ShippingData;
    import CreateShipping = shipping.CreateShipping;
    import CreateBilling = billing.CreateBilling;
    import CardInfoData = card.CardInfoData;

    type _3DSVersion = "V1" | "V2_1";

    type PayInData =
        | CardDirectPayInData
        | CardPreAuthorizedPayInData
        | CardWebPayInData
        | BankWireDirectPayInData
        | BankWireExternalInstructionPayInData
        | PayconiqWebPayInData
        | DirectDebitDirectPayInData
        | MbwayWebPayInData
        | BancontactWebPayInData
        | MultibancoWebPayInData
        | SatispayWebPayInData
        | BlikWebPayInData
        | ApplePayPayInData
        | GooglePayDirectPayInData
        | KlarnaWebPayInData
        | IdealWebPayInData
        | GiropayWebPayInData
        | SwishWebPayInData
        | PayByBankWebPayInData;

    type PayInPaymentType = ValueOf<enums.IPayInPaymentType>;

    type RecurringPayInRegistrationPaymentType = ValueOf<enums.IRecurringPayInRegistrationPaymentType>;

    type PayInExecutionType = ValueOf<enums.IPayInExecutionType> | "EXTERNAL_INSTRUCTION";

    type RecurringType = "CLASSIC_SUBSCRIPTION" | "FRACTIONED_PAYMENT" | "CUSTOM";

    type DirectDebitType = "SOFORT" | "GIROPAY";

    type FrequencyType = "Daily" | "Weekly" | "TwiceAMonth" | "Monthly" | "Bimonthly" | "Quarterly" | "Semiannual" | "Annual" | "Biannual";

    type RecurringPaymentStatus = "CREATED" | "AUTHENTICATION_NEEDED" | "IN_PROGRESS" | "ENDED";

    type UpdateRecurringPaymentStatus = "ENDED";

    type ShippingPreference = ValueOf<enums.IShippingPreference>;

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

        /**
         * Name of the end-user’s bank
         */
        BankName: string;
    }

    interface CardWebExtendedPayInData {
        /**
         * The unique identifier of the object.
         */
        Id: string;

        /**
         * The type of payin
         */
        PaymentType: PayInPaymentType;

        /**
         * The type of execution for the payin
         */
        ExecutionType: PayInExecutionType;

        /**
         * Time in millis when the page consult will expire.
         */
        ExpirationDate: Timestamp;

        /**
         * A partially obfuscated version of the credit card number
         */
        Alias: string;

        /**
         * The type of card
         */
        CardType: card.CardType;

        /**
         * The Country of the Card
         */
        Country: CountryISO;

        /**
         * A unique representation of a 16-digits card number
         */
        Fingerprint: string;
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

        /**
         * The BIC identifier of the end-user’s bank
         */
        Bic?: string;
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

        /**
         * Information about the card
         */
        CardInfo: CardInfoData;

        /**
         * The channel through which the user provided their card details, used to indicate mail-order and telephone-order (MOTO) payments:
         *
         * ECommerce – Payment received online.
         *
         * TelephoneOrder – Payment received via mail order or telephone order (MOTO).
         */
        PaymentCategory: string;
    }

    interface MbwayWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

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
        Phone: string;
    }

    interface BancontactWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "BCMC";

        /**
         * The URL to which the user is redirected to complete the payment
         */
        RedirectURL: string;

        /**
         * The URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The URL where you should redirect your client in a mobile app experience
         */
        DeepLinkURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture: CountryISO;

        /**
         * Whether the Bancontact pay-ins are being made to be re-used in a recurring payment flow
         */
        Recurring: boolean;
    }

    interface PayPalWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "PAYPAL";

        /**
         * The URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The URL to which the user is redirected to complete the payment
         */
        RedirectURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * Information about the shipping address
         */
        Shipping: ShippingData;

        /**
         * List of items and quantity bought by the buyer
         */
        LineItems: LineItemData[];

        /**
         * The language in which the PayPal payment page is to be displayed.
         */
        Culture: CountryISO;

        ShippingPreference: ShippingPreference;

        Reference: string;

        PaypalPayerID: string;

        BuyerCountry: string;

        BuyerFirstname: string;

        BuyerLastname: string;

        BuyerPhone: string;

        PaypalOrderID: string;

        CancelURL: string;

        /**
         * The email address registered on the PayPal account used to make the payment.
         */
        PaypalBuyerAccountEmail: string;

        /**
         * Shipping information of the LineItems added to the pay-in object.
         */
        Trackings: PayPalWebTrackingData;
    }

    interface PayPalWebTrackingData {
        /**
         * The shipment’s tracking number provided by the carrier.
         */
        TrackingNumber: string;

        /**
         * The carrier for the shipment. Use the country-specific version of the carrier if it exists,
         * otherwise use its global version.
         *
         * Returned values: One of the carriers supported by PayPal.
         */
        Carrier: string;

        /**
         * If true, sends an email notification to the PaypalBuyerAccountEmail containing the TrackingNumber and Carrier,
         * which allows the end user to track their shipment with the carrier.
         *
         * Default value: false
         */
        NotifyBuyer: boolean;
    }

    interface MultibancoWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "MULTIBANCO";

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;
    }

    interface SatispayWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "SATISPAY";

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * The end-user country of residence
         */
        Country: CountryISO;
    }

    interface BlikWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "BLIK";

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * The 6-digit code from the user’s banking application.
         * Required when creating a Blik PayIn with code.
         */
        Code: string;

        /**
         * The IP address of the end user initiating the transaction, in IPV4 or IPV6 format.
         * Required when creating a Blik PayIn with code.
         */
        IpAddress: string;

        /**
         * Information about the browser used by the end user (author) to perform the payment.
         * Required when creating a Blik PayIn with code.
         */
        BrowserInfo: BrowserInfoData;
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

        /**
         * The channel through which the user provided their card details, used to indicate mail-order and telephone-order (MOTO) payments:
         *
         * ECommerce – Payment received online.
         *
         * TelephoneOrder – Payment received via mail order or telephone order (MOTO).
         */
        PaymentCategory?: string;
    }

    interface CreateMbwayWebPayIn {
        ExecutionType: "WEB";

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
        Phone: string;

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

    interface CreateBancontactWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "BCMC";

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
         * The URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture?: CountryISO;

        /**
         * Whether the Bancontact pay-ins are being made to be re-used in a recurring payment flow
         */
        Recurring?: boolean;

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

    interface CreatePayPalWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "PAYPAL";

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
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the items bought by the customer
         */
        LineItems: CreateLineItem[];

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: CreateShipping;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * The language in which the PayPal payment page is to be displayed.
         */
        Culture?: CountryISO;

        ShippingPreference?: ShippingPreference;

        Reference?: string;

        CancelURL?: string;
    }

    interface CreateMultibancoWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "MULTIBANCO";

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
         * The URL to redirect to after the payment, whether the transaction
         */
        ReturnURL: string;

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

    interface CreateSatispayWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "SATISPAY";

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
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * The URL to redirect to after the payment, whether the transaction
         */
        ReturnURL: string;

        /**
         * The end-user country of residence
         */
        Country: CountryISO;

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

    interface CreateBlikWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "BLIK";

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
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * The URL to redirect to after the payment, whether the transaction
         */
        ReturnURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * The 6-digit code from the user’s banking application.
         * Required when creating a Blik PayIn with code.
         */
        Code?: string;

        /**
         * The IP address of the end user initiating the transaction, in IPV4 or IPV6 format.
         * Required when creating a Blik PayIn with code.
         */
        IpAddress?: string;

        /**
         * Information about the browser used by the end user (author) to perform the payment.
         * Required when creating a Blik PayIn with code.
         */
        BrowserInfo?: BrowserInfoData;
    }

    interface LineItemData {
        /**
         * Item name
         */
        Name: string;

        /**
         * Quantity of item bought
         */
        Quantity: number;

        /**
         * The item cost
         */
        UnitAmount: number;

        /**
         * The item tax
         */
        TaxAmount: number;

        /**
         * A consistent and unique reference for the seller. It can be:
         * - The user ID created on MANGOPAY for the seller
         * - Or the firstname and lastname of the seller
         */
        Description: string;

        Category: string;
    }

    interface CreateLineItem {
        /**
         * Item name
         */
        Name: string;

        /**
         * Quantity of item bought
         */
        Quantity: number;

        /**
         * The item cost
         */
        UnitAmount: number;

        /**
         * The item tax
         */
        TaxAmount?: number;

        /**
         * A consistent and unique reference for the seller. It can be:
         * - The user ID created on MANGOPAY for the seller
         * - Or the firstname and lastname of the seller
         */
        Description: string;

        Category?: string;
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

        DepositId: string;
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

    interface BankWireExternalInstructionPayInData extends BasePayInData {
        ExecutionType: "EXTERNAL_INSTRUCTION";

        PaymentType: "BANK_WIRE";

        /**
         * The reference of the wire made to a banking alias
         */
        WireReference: string;

        /**
         * The unique identifier of the banking alias
         */
        BankingAliasId: string;

        /**
         * Debited bank account details
         */
        DebitedBankAccount: BankAccountData;
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

        PaymentType: RecurringPayInRegistrationPaymentType;
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

        PaymentType?: RecurringPayInRegistrationPaymentType
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

        /**
         * Information about the card
         */
        CardInfo: CardInfoData;
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

    interface CreateRecurringPayPalPayInCIT {
        /**
         * The unique identifier of the recurring pay-in registration.
         */
        RecurringPayinRegistrationId: string;

        /**
         * The URL to which the user is returned after the payment, whether the transaction is successful or not.
         */
        ReturnURL: string;

        /**
         * The URL to which the user is returned after canceling the payment.
         * If not provided, the Cancel button returns the user to the RedirectURL.
         */
        CancelURL?: string;

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * Information about the end user’s shipping address, managed by ShippingPreference.
         * Required if ShippingPreference is SET_PROVIDED_ADDRESS and the shipping information is not present in the
         * recurring registration object.
         */
        Shipping?: CreateShipping;

        /**
         * Information about the items purchased in the transaction
         */
        LineItems: CreateLineItem[];

        /**
         * The language in which the PayPal payment page is to be displayed.
         */
        Culture?: CultureISO;

        /**
         * Information about the shipping address behavior on the PayPal payment page:
         * <p>
         * SET_PROVIDED_ADDRESS - The Shipping parameter becomes required and its values are displayed to the end user, who is not able to modify them.
         * <p>
         * GET_FROM_FILE – The Shipping parameter is ignored and the end user can choose from registered addresses.
         * <p>
         * NO_SHIPPING – No shipping address section is displayed.
         */
        ShippingPreference?: ShippingPreference;

        /**
         * The platform’s order reference for the transaction.
         */
        Reference?: string;
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

    interface CreateRecurringPayPalPayInMIT {
        /**
         * The unique identifier of the recurring pay-in registration.
         */
        RecurringPayinRegistrationId: string;

        /**
         * The amount of the subsequent recurring pay-in. If this field is empty, the amount entered in
         * the NextTransactionDebitedFunds of the Recurring PayIn Registration is taken into account.
         * <p></p>
         * Required if the registration’s NextTransactionDebitedFunds is empty.
         */
        DebitedFunds?: MoneyData;

        /**
         * The amount of the subsequent fees. If this field is empty, the amount entered in
         * the NextTransactionFees of the Recurring PayIn Registration is taken into account.
         * <p></p>
         * Required if the registration’s NextTransactionFees is empty.
         */
        Fees?: MoneyData;

        /**
         * The URL to which the user is returned after the payment, whether the transaction is successful or not.
         */
        ReturnURL: string;

        /**
         * The URL to which the user is returned after canceling the payment.
         * If not provided, the Cancel button returns the user to the RedirectURL.
         */
        CancelURL?: string;

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * Information about the end user’s shipping address, managed by ShippingPreference.
         * Required if ShippingPreference is SET_PROVIDED_ADDRESS and the shipping information is not present in the
         * recurring registration object.
         */
        Shipping?: CreateShipping;

        /**
         * Information about the items purchased in the transaction
         */
        LineItems: CreateLineItem[];

        /**
         * The language in which the PayPal payment page is to be displayed.
         */
        Culture?: CultureISO;

        /**
         * Information about the shipping address behavior on the PayPal payment page:
         * <p>
         * SET_PROVIDED_ADDRESS - The Shipping parameter becomes required and its values are displayed to the end user, who is not able to modify them.
         * <p>
         * GET_FROM_FILE – The Shipping parameter is ignored and the end user can choose from registered addresses.
         * <p>
         * NO_SHIPPING – No shipping address section is displayed.
         */
        ShippingPreference?: ShippingPreference;

        /**
         * The platform’s order reference for the transaction.
         */
        Reference?: string;
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

        Country: CountryISO;

        QRCodeURL: string;

        StatementDescriptor: string;
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

        StatementDescriptor?: string;
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

    interface CreateApplePayPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "APPLE";
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

        PaymentData: ApplePayPaymentData;

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
    interface ApplePayPayInData extends BasePayInData {
        ExecutionType: "DIRECT";

        PaymentType: "APPLEPAY";
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

        PaymentData: ApplePayPaymentData;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * Custom data that you can add to this item
         */
        Tag: string;
    }

    interface ApplePayPaymentData {
        TransactionId: string, 

        Network: string,

        TokenData: string
    }


    interface CreateGooglePayDirectPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "GOOGLE_PAY";

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
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * The URL to which the user is redirected to complete the payment.
         */
        SecureModeReturnURL: string;

        /**
         * The mode applied for the 3DS2 protocol for CB, Visa, and Mastercard. The options are:
         * DEFAULT – Requests an exemption to strong customer authentication (SCA), and thus a frictionless payment
         * experience, if allowed by your Mangopay contract and accepted by the issuer.
         * FORCE – Requests SCA.
         * NO_CHOICE – Leaves the choice to the issuer whether to allow for a frictionless payment experience
         * or to enforce SCA.
         */
        SecureMode?: SecureMode;

        /**
         * IP Address of the end user (format IPV4 or IPV6)
         */
        IpAddress: string;

        /**
         * This object describes the Browser being user by an end user
         */
        BrowserInfo: BrowserInfoData;

        /**
         * Data received from the Google Pay API
         */
        PaymentData: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL?: string;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: CreateShipping;

        /**
         * Information about the end user billing address.
         */
        Billing?: CreateBilling;

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

    interface GooglePayDirectPayInData extends BasePayInData {
        ExecutionType: "DIRECT";

        PaymentType: "GOOGLE_PAY";

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping: CreateShipping;

        /**
         * Information about the end user billing address.
         */
        Billing: CreateBilling;

        /**
         * This object describes the Browser being user by an end user
         */
        BrowserInfo: BrowserInfoData;

        /**
         * IP Address of the end user (format IPV4 or IPV6)
         */
        IpAddress: string;

        /**
         * The ID of the card
         */
        CardId: string;

        /**
         * The URL to which the user is redirected to complete the payment.
         */
        SecureModeReturnURL: string;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectURL: string;

        /**
         * The mode applied for the 3DS2 protocol for CB, Visa, and Mastercard. The options are:
         * DEFAULT – Requests an exemption to strong customer authentication (SCA), and thus a frictionless payment
         * experience, if allowed by your Mangopay contract and accepted by the issuer.
         * FORCE – Requests SCA.
         * NO_CHOICE – Leaves the choice to the issuer whether to allow for a frictionless payment experience
         * or to enforce SCA.
         */
        SecureMode: SecureMode;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;
    }

    interface KlarnaWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "KLARNA";

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * List of items and quantity bought by the buyer
         */
        LineItems: LineItemData[];

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping: ShippingData;

        /**
         * Contains every useful information's related to the user billing
         */
        Billing: BillingData;

        /**
         * The Klarna option that the end-user has chosen at checkout
         */
        PaymentMethod: string;

        /**
         * The end-user residency country
         */
        Country: CountryISO;

        /**
         * The language in which the Klarna payment page is to be displayed - Alpha-2  format (default US)
         */
        Culture: CountryISO;

        /**
         * Klarna custom data that you can add to this item
         */
        AdditionalData: string;

        /**
         * The mobile phone number of the user initiating the pay-in
         * Country code followed by hash symbol (#) followed by the rest of the number. Only digits and hash allowed
         */
        Phone: string;

        /**
         * The end-user email address
         */
        Email: string;

        /**
         * The merchant order reference
         */
        Reference: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;
    }

    interface CreateKlarnaWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "KLARNA";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the debited funds
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet)
         */
        Fees: MoneyData;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * List of items and quantity bought by the buyer
         */
        LineItems: CreateLineItem[];

        /**
         * The end-user residency country
         */
        Country: CountryISO;

        /**
         * The mobile phone number of the user initiating the pay-in
         * Country code followed by hash symbol (#) followed by the rest of the number. Only digits and hash allowed
         */
        Phone: string;

        /**
         * The end-user email address
         */
        Email: string;

        /**
         * Klarna custom data that you can add to this item
         */
        AdditionalData: string;

        /**
         * Contains every useful information's related to the user billing
         */
        Billing: CreateBilling;

        /**
         * The merchant order reference
         */
        Reference: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * The language in which the Klarna payment page is to be displayed - Alpha-2  format (default US)
         */
        Culture?: CountryISO;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: CreateShipping;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;
    }

    interface IdealWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "IDEAL";

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * Name of the end-user’s bank
         */
        BankName: string;

        /**
         * The BIC identifier of the end-user’s bank
         */
        Bic: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;
    }

    interface CreateIdealWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "IDEAL";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the debited funds
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet)
         */
        Fees: MoneyData;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The BIC identifier of the end-user’s bank
         */
        Bic: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this object
         */
        Tag?: string;
    }

    interface GiropayWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "GIROPAY";

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;
    }

    interface SwishWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "SWISH";

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The mobile URL to which to redirect the user to complete the payment in an app-to-app flow.
         */
        DeepLinkURL: string;

        /**
         * The PNG file of the Swish QR code as a Base64-encoded string.
         */
        QRCodeURL: string;

        /**
         *  <p>Allowed values: WEB, APP</p>
         *  <p>Default value: WEB</p>
         *  <p>The platform environment of the post-payment flow. The PaymentFlow value combines with the ReturnURL to manage the redirection behavior after payment:</p>
         *  <p>Set the value to APP to send the user to your platform’s mobile app</p>
         *  <p>Set the value to WEB to send the user to a web browser</p>
         *  <p>In both cases you need to provide the relevant ReturnURL, whether to your app or website.</p>
         */
        PaymentFlow: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;
    }

    interface TwintWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "TWINT";

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor: string;
    }


    interface CreateGiropayWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "GIROPAY";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the debited funds
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet)
         */
        Fees: MoneyData;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this object
         */
        Tag?: string;
    }

    interface CreateSwishWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "SWISH";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the debited funds
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet)
         */
        Fees: MoneyData;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this object
         */
        Tag?: string;

        /**
         *  <p>Allowed values: WEB, APP</p>
         *  <p>Default value: WEB</p>
         *  <p>The platform environment of the post-payment flow. The PaymentFlow value combines with the ReturnURL to manage the redirection behavior after payment:</p>
         *  <p>Set the value to APP to send the user to your platform’s mobile app</p>
         *  <p>Set the value to WEB to send the user to a web browser</p>
         *  <p>In both cases you need to provide the relevant ReturnURL, whether to your app or website.</p>
         */
        PaymentFlow?: string;
    }

    interface CreateTwintWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "TWINT";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the debited funds
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet)
         */
        Fees: MoneyData;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this object
         */
        Tag?: string;
    }

    interface BinData {
        /**
         * The subtype of the card product. Examples include: CLASSIC, GOLD, PLATINUM, PREPAID, etc.
         */
        Subtype: string;
        /**
         * The card brand. Examples include: AMERICAN EXPRESS, DISCOVER, JCB, MASTERCARD, VISA, etc.
         */
        Brand: string;

        /**
         * Whether the card is held in a personal or commercial capacity.
         */
        CommercialIndicator: string;

        /**
         * The type of the card. Allowed / Returned / Default values: CREDIT, DEBIT, CHARGE CARD
         */
        CardType: string;
    }

    interface PaymentMethodMetadata {
        /**
         * The type of metadata. Allowed values: BIN, GOOGLE_PAY
         */
        Type: string;

        /**
         * The bank identification number (BIN). (Format: 6 or 8 digits)
         */
        Bin: string;

        /**
         * The tokenized payment data provided by the third-party payment method.
         */
        Token: string;

        /**
         * In the case of Google Pay, the format of the Token.
         * PAN_ONLY – The card is registered in the Google account and requires 3DS authentication.
         * CRYPTOGRAM_3DS – The card is enrolled in the customer’s Google Wallet and authentication is handled by the Android device.
         */
        TokenFormat: string;

        /**
         * The country where the card was issued. Format: ISO-3166 alpha-2 two-letter country code
         */
        IssuerCountryCode: string;

        /**
         * The name of the card issuer.
         */
        IssuingBank: string;

        /**
         * Additional data about the card based on the BIN. In the case of co-branded card products, two objects are returned.
         */
        BinData: BinData[];
    }

    interface PaymentMethodMetadataRequest {
        /**
         * The type of metadata. Allowed values: BIN, GOOGLE_PAY
         */
        Type: string;

        /**
         * The bank identification number (BIN). (Format: 6 or 8 digits)
         */
        Bin?: string;

        /**
         * The tokenized payment data provided by the third-party payment method.
         */
        Token?: string;
    }

    interface PayByBankWebPayInData extends BasePayInData {
        ExecutionType: "WEB";

        PaymentType: "PAY_BY_BANK";

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor: string;

        /**
         * The end-user residency country
         */
        Country: CountryISO;

        /**
         * The BIC identifier of the end-user’s bank
         */
        BIC: string;

        /**
         * The IBAN identifier of the end-user’s bank
         */
        IBAN: string;

        /**
         * This is the platform environment in which the application is running.Accepted values are:
         *
         * - WEB: For web browser usage(default setting)
         *
         * - APP: For mobile application usage
         *
         * If PaymentFlow is set to APP,the user is redirected to the platform's app after payment
         */
        PaymentFlow: string;

        /**
         * Name of the end-user’s bank
         */
        BankName: string;

        /**
         * The language in which the Pay by Bank payment page isto be displayed - Alpha-2 format (default US)
         */
        Culture: string;

        /**
         * This is the payment scheme the end user selects for processing the transaction,which varies by market
         * (see details below). Default values are always instant schemes.
         *
         * Please note that some banks may charge additional fees for instant payment schemes
         *
         * Please note that the scheme is mandatory for the Danish market (”Country” : “DK”)
         */
        Scheme: string;

        /**
         * This is a temporary status indicating that the payment initiation was successful,
         * but the funds have not yet been received in Mangopay's bank account
         *
         * This parameter is only relevant once the transaction has been processed by the end user.
         * It is not returned when the payment is initiated or successfully completed
         *
         * Possible value: PENDING_SUCCEEDED
         */
        ProcessingStatus: string;
    }

    interface CreatePayByBankWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "PAY_BY_BANK";

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of the wallet where money will be credited
         */
        CreditedWalletId: string;

        /**
         * Information about the debited funds
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet)
         */
        Fees: MoneyData;

        /**
         * The end-user residency country
         */
        Country: CountryISO;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The BIC identifier of the end-user’s bank
         */
        BIC?: string;

        /**
         * The IBAN identifier of the end-user’s bank
         */
        IBAN?: string;

        /**
         * This is the platform environment in which the application is running.Accepted values are:
         *
         * - WEB: For web browser usage(default setting)
         *
         * - APP: For mobile application usage
         *
         * If PaymentFlow is set to APP,the user is redirected to the platform's app after payment
         */
        PaymentFlow?: string;

        /**
         * Name of the end-user’s bank
         */
        BankName?: string;

        /**
         * The language in which the Pay by Bank payment page isto be displayed - Alpha-2 format (default US)
         */
        Culture?: string;

        /**
         * This is the payment scheme the end user selects for processing the transaction,which varies by market
         * (see details below). Default values are always instant schemes.
         *
         * Please note that some banks may charge additional fees for instant payment schemes
         *
         * Please note that the scheme is mandatory for the Danish market (”Country” : “DK”)
         */
        Scheme?: string;

        /**
         * This is a temporary status indicating that the payment initiation was successful,
         * but the funds have not yet been received in Mangopay's bank account
         *
         * This parameter is only relevant once the transaction has been processed by the end user.
         * It is not returned when the payment is initiated or successfully completed
         *
         * Possible value: PENDING_SUCCEEDED
         */
        ProcessingStatus?: string;

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;
    }

    interface PayInIntentData extends entityBase.EntityBaseData {
        /**
         * An amount of money in the smallest subdivision of the currency
         */
        Amount: number;

        /**
         * The remaining amount on the intent available for transfers
         */
        AvailableAmountToSplit: number;

        /**
         * The currency of the funds
         */
        Currency: CurrencyISO;

        /**
         * Information about the fees
         */
        PlatformFeesAmount: number;

        /**
         * The status of the intent
         */
        Status: string;

        /**
         * The possible next statuses for the intent
         */
        NextActions: string;

        /**
         * Information about the external processed transaction
         */
        ExternalData: PayInIntentExternalData;

        /**
         * Information about the buyer
         */
        Buyer: PayInIntentBuyer;

        /**
         * Information about the items purchased in the transaction.
         * <p></p>
         * The total of all LineItems UnitAmount, TaxAmount, DiscountAmount, TotalLineItemAmount must equal the Amount
         * <p></p>
         * The total of all LineItems FeesAmount mus equal the PlatformFees amount
         */
        LineItems: PayInIntentLineItem[];

        /**
         * Information about the amounts captured against the intent
         */
        Captures: PayInIntentCapture[];

        /**
         * Information about the amounts refunded against the intent
         */
        Refunds: PayInIntentRefund[];

        /**
         * Information about the amounts refunded against the intent
         */
        Disputes: PayInIntentDispute[];

        /**
         * Information about the amounts split against the intent
         */
        Splits: PayInIntentSplit[];

        /**
         * The unique identifier of the settlement linked to this intent in Mangopay ecosystem
         */
        SettlementId: string;
    }

    interface PayInIntentExternalData {
        /**
         * The date at which the transaction was created
         */
        ExternalProcessingDate: Timestamp;

        /**
         * The unique identifier of the transaction at the provider level
         */
        ExternalProviderReference: string;

        /**
         * The unique identifier of the transaction at the merchant level
         */
        ExternalMerchantReference: string;

        /**
         * The name of the external provider processing the transaction
         */
        ExternalProviderName: string;

        /**
         * The name of the payment method used to process the transaction
         */
        ExternalProviderPaymentMethod: string;
    }

    interface CreatePayInIntentAuthorizationExternalData {
        /**
         * The date at which the transaction was created
         */
        ExternalProcessingDate: Timestamp;

        /**
         * The unique identifier of the transaction at the provider level
         */
        ExternalProviderReference: string;

        /**
         * The unique identifier of the transaction at the merchant level
         */
        ExternalMerchantReference?: string;

        /**
         * The name of the external provider processing the transaction
         */
        ExternalProviderName: string;

        /**
         * The name of the payment method used to process the transaction
         */
        ExternalProviderPaymentMethod?: string;
    }

    interface CreatePayInIntentFullCaptureExternalData {
        /**
         * The date at which the transaction was created
         */
        ExternalProcessingDate?: Timestamp;

        /**
         * The unique identifier of the transaction at the provider level
         */
        ExternalProviderReference?: string;

        /**
         * The unique identifier of the transaction at the merchant level
         */
        ExternalMerchantReference?: string;

        /**
         * The name of the external provider processing the transaction
         */
        ExternalProviderName?: string;

        /**
         * The name of the payment method used to process the transaction
         */
        ExternalProviderPaymentMethod?: string;
    }

    interface CreatePayInIntentPartialCaptureExternalData {
        /**
         * The date at which the transaction was created
         */
        ExternalProcessingDate: Timestamp;

        /**
         * The unique identifier of the transaction at the provider level
         */
        ExternalProviderReference: string;

        /**
         * The unique identifier of the transaction at the merchant level
         */
        ExternalMerchantReference?: string;

        /**
         * The name of the external provider processing the transaction
         */
        ExternalProviderName?: string;

        /**
         * The name of the payment method used to process the transaction
         */
        ExternalProviderPaymentMethod?: string;
    }

    interface PayInIntentBuyer {
        /**
         * The unique identifier of the user at the source of the transaction
         */
        Id?: string;
    }

    interface PayInIntentSeller {
        /**
         * The unique identifier of the seller providing the item
         * <p></p>
         * One valid value must be sent between AuthorId & WalletId
         */
        AuthorId?: string;

        /**
         * The unique identifier of the wallet to credit the seller funds
         * <p>
         * One valid value must be sent between AuthorId & WalletId
         */
        WalletId?: string;

        /**
         * Information about the fees
         */
        FeesAmount?: number;

        /**
         * Information about the date when the funds are to be transferred to the seller’s wallet
         * <p></p>
         * Must be a date in the future
         */
        TransferDate?: Timestamp;
    }

    interface PayInIntentLineItem {
        /**
         * The unique identifier of the user at the source of the transaction
         */
        Id?: string;

        /**
         * Information about the seller involved in the transaction
         */
        Seller: PayInIntentSeller;

        /**
         * The unique identifier of the item
         */
        Sku: string;

        /**
         * The name of the item
         */
        Name?: string;

        /**
         * The description of the item
         */
        Description?: string;

        /**
         * The quantity of the item
         */
        Quantity: number;

        /**
         * The cost of the item, excluding tax and discount
         */
        UnitAmount: number;

        /**
         * The item total amount to be captured
         */
        Amount?: number;

        /**
         * The tax amount applied to the item
         */
        TaxAmount?: number;

        /**
         * The discount amount applied to the item
         */
        DiscountAmount?: number;

        /**
         * The item category
         */
        Category?: string;

        /**
         * Information about the end user’s shipping address
         */
        ShippingAddress?: address.AddressData;

        /**
         * The item total amount including tax and discount
         */
        TotalLineItemAmount?: number;

        /**
         * The item total canceled amount
         */
        CanceledAmount?: number;

        /**
         * The item total captured amount
         */
        CapturedAmount?: number;

        /**
         * The item total refunded amount
         */
        RefundedAmount?: number;

        /**
         * The item total disputed amount
         */
        DisputedAmount?: number;

        /**
         * The item total split amount
         */
        SplitAmount?: number;
    }

    interface CreatePayInIntentPartialCaptureLineItem {
        /**
         * The unique identifier of the user at the source of the transaction
         */
        Id: string;

        /**
         * The item total amount to be captured
         */
        Amount: number;
    }

    interface PayInIntentCapture {
        /**
         * The unique identifier of the user at the source of the transaction
         */
        Id: string;

        /**
         * The date at which the object was created
         */
        CreationDate: Timestamp;

        /**
         * The date at which the object was successfully moved to CAPTURED
         */
        ExecutionDate: Timestamp;

        /**
         * The captured amount
         */
        Amount: number;

        /**
         * The status of the capture
         */
        Status: string;

        /**
         * Information about the items captured in the transaction.
         */
        LineItems: PayInIntentLineItem[];
    }

    interface PayInIntentRefund {
        /**
         * The unique identifier of the user at the source of the transaction
         */
        Id: string;

        /**
         * The date at which the object was created
         */
        CreationDate: Timestamp;

        /**
         * The date at which the object was successfully moved to REFUNDED
         */
        ExecutionDate: Timestamp;

        /**
         * The refunded amount
         */
        Amount: number;

        /**
         * The status of the refund
         */
        Status: string;

        /**
         * Information about the items captured in the transaction.
         */
        LineItems: PayInIntentLineItem[];
    }

    interface PayInIntentDispute {
        /**
         * The unique identifier of the user at the source of the transaction
         */
        Id: string;

        /**
         * The date at which the object was created
         */
        CreationDate: Timestamp;

        /**
         * The date at which the object was successfully moved to DISPUTED
         */
        ExecutionDate: Timestamp;

        /**
         * The disputed amount
         */
        Amount: number;

        /**
         * The status of the dispute
         */
        Status: string;

        /**
         * Information about the items captured in the transaction.
         */
        LineItems: PayInIntentLineItem[];
    }

    interface PayInIntentSplit {
        /**
         * The unique identifier of the user at the source of the transaction
         */
        Id: string;

        /**
         * The date at which the object was created
         */
        CreationDate: Timestamp;

        /**
         * The date at which the object was successfully moved to CREATED
         */
        ExecutionDate: Timestamp;

        /**
         * The split amount
         */
        Amount: number;

        /**
         * The status of the split
         */
        Status: string;

        /**
         * Information about the items captured in the transaction.
         */
        LineItems: PayInIntentLineItem[];
    }

    interface CreatePayInIntentAuthorization {
        /**
         * An amount of money in the smallest subdivision of the currency
         */
        Amount: number;

        /**
         * The currency of the funds
         */
        Currency: CurrencyISO;

        /**
         * Information about the fees
         */
        PlatformFeesAmount?: number;

        /**
         * Information about the external processed transaction
         */
        ExternalData: CreatePayInIntentAuthorizationExternalData;

        /**
         * Information about the buyer
         */
        Buyer?: PayInIntentBuyer;

        /**
         * Information about the items purchased in the transaction.
         * <p></p>
         * The total of all LineItems UnitAmount, TaxAmount, DiscountAmount, TotalLineItemAmount must equal the Amount
         * <p></p>
         * The total of all LineItems FeesAmount mus equal the PlatformFees amount
         */
        LineItems: PayInIntentLineItem[];
    }

    interface CreatePayInIntentFullCapture {
        /**
         * Information about the external processed transaction
         */
        ExternalData?: CreatePayInIntentFullCaptureExternalData;
    }

    interface CreatePayInIntentPartialCapture {
        /**
         * An amount of money in the smallest subdivision of the currency
         */
        Amount: number;

        /**
         * The currency of the funds
         */
        Currency?: CurrencyISO;

        /**
         * Information about the fees
         */
        PlatformFeesAmount?: number;

        /**
         * Information about the external processed transaction
         */
        ExternalData: CreatePayInIntentPartialCaptureExternalData;

        /**
         * Information about the items purchased in the transaction.
         * <p></p>
         * The total of all LineItems UnitAmount, TaxAmount, DiscountAmount, TotalLineItemAmount must equal the Amount
         * <p></p>
         * The total of all LineItems FeesAmount mus equal the PlatformFees amount
         */
        LineItems: CreatePayInIntentPartialCaptureLineItem[];
    }

    interface FullCancelPayInIntent {
        ExternalData: CancelPayInIntentExternalData;
    }

    interface PartialCancelPayInIntent {
        Amount: number;
        Currency?: CurrencyISO;
        PlatformFees?: number;
        ExternalData: CancelPayInIntentExternalData;
        LineItems: CancelPayInIntentLineItem[];
    }

    interface CancelPayInIntentExternalData {
        /**
         * The date at which the transaction was created
         */
        ExternalProcessingDate: Timestamp;

        /**
         * The unique identifier of the transaction at the provider level
         */
        ExternalProviderReference: string;

        /**
         * The unique identifier of the transaction at the merchant level
         */
        ExternalMerchantReference?: string;

        /**
         * The name of the external provider processing the transaction
         */
        ExternalProviderName?: string;

        /**
         * The name of the payment method used to process the transaction
         */
        ExternalProviderPaymentMethod?: string;
    }

    interface CancelPayInIntentLineItem {
        Id: string;
        Amount: number;
    }
}
