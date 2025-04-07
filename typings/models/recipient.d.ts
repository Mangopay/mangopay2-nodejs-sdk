import { CurrencyISO } from "../types";
import { entityBase } from "./entityBase";
import { address } from "./address";
import { user } from "./user";

export namespace recipient {
    interface RecipientData extends entityBase.EntityBaseData {
        /**
         * The status
         */
        Status: string;

        /**
         * A unique external identifier for the recipient's bank account.
         */
        DisplayName: string;

        /**
         * Defines the payout method (e.g., LocalBankTransfer, InternationalBankTransfer).
         */
        PayoutMethodType: string;

        /**
         * Specifies whether the recipient is an Individual or a Business.
         */
        RecipientType: string;

        /**
         * 3-letter ISO 4217 destination currency code (e.g. EUR, USD, GBP, AUD, CAD,HKD, SGD, MXN).
         */
        Currency: CurrencyISO;

        /**
         * Individual recipient
         */
        IndividualRecipient: IndividualRecipientData;

        /**
         * Business recipient
         */
        BusinessRecipient: BusinessRecipientData;

        /**
         * The account details if PayoutMethodType is LocalBankTransfer, depending on the Currency.
         */
        LocalBankTransfer: any;

        /**
         * The account details if PayoutMethodType is InternationalBankTransfer.
         */
        InternationalBankTransfer: any;

        /**
         * Information about the action required from the user
         */
        PendingUserAction: user.PendingUserActionData;
    }

    interface CreateRecipientData {
        /**
         * A unique external identifier for the recipient's bank account.
         */
        DisplayName: string;

        /**
         * Defines the payout method (e.g., LocalBankTransfer, InternationalBankTransfer).
         */
        PayoutMethodType: string;

        /**
         * Specifies whether the recipient is an Individual or a Business.
         */
        RecipientType: string;

        /**
         * 3-letter ISO 4217 destination currency code (e.g. EUR, USD, GBP, AUD, CAD,HKD, SGD, MXN).
         */
        Currency: CurrencyISO;

        /**
         * Individual recipient. Needed if BusinessRecipient is undefined
         */
        IndividualRecipient?: CreateIndividualRecipientData;

        /**
         * Business recipient. Needed if IndividualRecipient is undefined
         */
        BusinessRecipient?: CreateBusinessRecipientData;

        /**
         * The account details if PayoutMethodType is LocalBankTransfer, depending on the Currency.
         * Needed if InternationalBankTransfer is undefined
         */
        LocalBankTransfer?: Record<string, any>;

        /**
         * The account details if PayoutMethodType is InternationalBankTransfer.
         * Needed if LocalBankTransfer is undefined
         */
        InternationalBankTransfer?: Record<string, any>;
    }

    interface IndividualRecipientData {
        FirstName: string;
        LastName: string;
        Address: address.AddressData;
    }

    interface CreateIndividualRecipientData {
        FirstName: string;
        LastName: string;
        Address: address.CreateAddress;
    }

    interface BusinessRecipientData {
        BusinessName: string;
        Address: address.AddressData;
    }

    interface CreateBusinessRecipientData {
        BusinessName: string;
        Address: address.CreateAddress;
    }

    interface RecipientSchemaData {
        DisplayName: RecipientPropertySchema;
        Currency: RecipientPropertySchema;
        RecipientType: RecipientPropertySchema;
        PayoutMethodType: RecipientPropertySchema;
        RecipientScope: RecipientPropertySchema;
        Tag: RecipientPropertySchema;
        LocalBankTransfer: Record<string, Record<string, RecipientPropertySchema>>;
        InternationalBankTransfer: Record<string, RecipientPropertySchema>;
        IndividualRecipient: IndividualRecipientPropertySchema;
        BusinessRecipient: BusinessRecipientPropertySchema;
    }

    interface RecipientPropertySchema {
        Required: boolean;
        MaxLength: number;
        MinLength: number;
        Pattern: string;
        AllowedValues: string[];
    }

    interface RecipientAddressPropertySchema {
        AddressLine1: RecipientPropertySchema;
        AddressLine2: RecipientPropertySchema;
        City: RecipientPropertySchema;
        Region: RecipientPropertySchema;
        PostalCode: RecipientPropertySchema;
        Country: RecipientPropertySchema;
    }

    interface IndividualRecipientPropertySchema {
        FirstName: RecipientPropertySchema;
        LastName: RecipientPropertySchema;
        Address: RecipientAddressPropertySchema;
    }

    interface BusinessRecipientPropertySchema {
        BusinessName: RecipientPropertySchema;
        Address: RecipientAddressPropertySchema;
    }

    interface PayoutMethodData extends entityBase.EntityBaseData {
        AvailablePayoutMethods: string[]
    }
}
