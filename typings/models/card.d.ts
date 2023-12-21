import {CountryISO, CurrencyISO} from "../types";
import {entityBase} from "./entityBase";

export namespace card {
    type CardType = "CB_VISA_MASTERCARD" | "DINERS" | "MASTERPASS" | "MAESTRO" | "P24" | "IDEAL" | "BCMC" | "PAYLIB";

    type CardStatus = "CREATED" | "VALIDATED" | "ERROR";

    type CardValidity = "UNKNOWN" | "VALID" | "INVALID";

    type CardInfoType = "DEBIT" | "CREDIT" | "CHARGE CARD";

    interface CardData extends entityBase.EntityBaseData {
        /**
         * The expiry date of the card - must be in format MMYY
         */
        ExpirationDate: string;

        /**
         * A partially obfuscated version of the credit card number
         */
        Alias: string;

        /**
         * The provider of the card
         */
        CardProvider: string;

        /**
         * The type of card
         */
        CardType: CardType;

        /**
         * The Country of the Address
         */
        Country: string;

        /**
         * The card product type - more info
         */
        Product: string;

        /**
         * The bank code
         */
        BankCode: string;

        /**
         * Whether the card is active or not
         */
        Active: boolean;

        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;

        /**
         * Whether the card is valid or not. Once they process (or attempt to process) a payment with the card we are able to indicate if it is "valid" or "invalid".
         * If they didn’t process a payment yet the "Validity" stay at "unknown".
         */
        Validity: CardValidity;

        /**
         * A unique representation of a 16-digits card number
         */
        Fingerprint: string;
    }

    interface UpdateCard {
        Id: string;
        Active?: false;
    }

    interface CardInfoData {
        BIN: string;
        IssuingBank: string;
        IssuerCountryCode: CountryISO;
        Type: CardInfoType;
        Brand: string;
        SubType: string;
    }
}
