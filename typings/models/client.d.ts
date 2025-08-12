import { ValueOf } from "../types";
import { enums } from "../enums";
import { address } from "./address";
import { entityBase } from "./entityBase";
import { money } from "./money";

export namespace client {
    import MoneyData = money.MoneyData;

    type BusinessType = "MARKETPLACE" | "CROWDFUNDING" | "FRANCHISE" | "OTHER";

    type Sector =
        | "RENTALS"
        | "STORES_FASHION_ACCESSORIES_OBJECTS"
        | "BEAUTY_COSMETICS_HEALTH"
        | "FOOD_WINE_RESTAURANTS"
        | "HOSPITALITY_TRAVEL_CORIDING"
        | "ART_MUSIC_ENTERTAINMENT"
        | "FURNITURE_GARDEN"
        | "SERVICES_JOBBING_EDUCATION"
        | "SPORT_RECREATION_ACTIVITIES"
        | "TICKETING"
        | "LOAN"
        | "EQUITY"
        | "PROPERTY_EQUITY"
        | "REWARDS_CHARITY"
        | "POOL_GROUP_PAYMENT"
        | "FRANCHISE_"
        | "OTHER_";

    type PlatformType = ValueOf<enums.IPlatformType>;

    interface PlatformCategorization {
        Sector: Sector;

        BusinessType: BusinessType;
    }

    interface ClientData extends entityBase.EntityBaseData {
        /**
         * The pretty name for the client
         */
        Name: string;

        /**
         * The registered name of your company
         */
        RegisteredName: string;

        /**
         * An ID for the client (i.e. url friendly, lowercase etc - sort of namespace identifier)
         */
        ClientId: string;

        /**
         * The primary branding colour to use for your merchant
         */
        PrimaryThemeColour: string;

        /**
         * The primary branding colour to use for buttons for your merchant
         */
        PrimaryButtonColour: string;

        /**
         * The URL of the logo of your client
         */
        Logo: string;

        /**
         * A list of email addresses to use when contacting you for technical issues/communications
         */
        TechEmails: string[];

        /**
         * A list of email addresses to use when contacting you for admin/commercial issues/communications
         */
        AdminEmails: string[];

        /**
         * A list of email addresses to use when contacting you for fraud/compliance issues/communications
         */
        FraudEmails: string[];

        /**
         * A list of email addresses to use when contacting you for billing issues/communications
         */
        BillingEmails: string[];

        /**
         * The Categorization of your platform, in terms of Business Type and Sector
         */
        PlatformCategorization: PlatformCategorization;

        /**
         * A description of what your platform does
         */
        PlatformDescription: string;

        /**
         * The URL for your website
         */
        PlatformURL: string;

        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress: address.AddressType;

        /**
         * The phone number of the company's headquarters
         */
        HeadquartersPhoneNumber: string;

        /**
         * The tax (or VAT) number for your company
         */
        TaxNumber: string;

        /**
         * Your unique MANGOPAY reference which you should use when contacting us
         */
        CompanyReference: string;
    }

    interface UpdateClient {
        /**
         * The primary branding colour to use for buttons for your merchant
         */
        PrimaryButtonColour?: string;

        /**
         * The primary branding colour to use for your merchant
         */
        PrimaryThemeColour?: string;

        /**
         * A list of email addresses to use when contacting you for admin/commercial issues/communications
         */
        AdminEmails?: string[];

        /**
         * A list of email addresses to use when contacting you for technical issues/communications
         */
        TechEmails?: string[];

        /**
         * A list of email addresses to use when contacting you for billing issues/communications
         */
        BillingEmails?: string[];

        /**
         * A list of email addresses to use when contacting you for fraud/compliance issues/communications
         */
        FraudEmails?: string[];

        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress?: address.AddressType;

        /**
         * The tax (or VAT) number for your company
         */
        TaxNumber?: string;

        /**
         * The type of platform
         */
        PlatformType?: PlatformType;

        /**
         * A description of what your platform does
         */
        PlatformDescription?: string;

        /**
         * The URL for your website
         */
        PlatformURL?: string;
    }

    interface UpdateClientLogo {
        /**
         * The base64 encoded file which needs to be uploaded
         */
        File: string;
    }

    interface CreateBankWireDirectPayIn {
        /**
         * The unique identifier of the credited wallet.
         * In the case of the direct bank wire to the Repudiation Wallet,
         * this value has the format CREDIT_CCY where CCY is the currency of the Client Wallet to be credited (e.g., CREDIT_EUR).
         */
        CreditedWalletId: string;

        /**
         * Information about the declared funds to be wired by the platform to the returned bank account.
         */
        DeclaredDebitedFunds: MoneyData;
    }
}
