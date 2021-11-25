import { CountryISO, PickPartialRequired } from "../types";
import { entityBase } from "./entityBase";

export namespace bankingAlias {
    type BankingAliasType = "IBAN";

    interface BankingAliasData extends entityBase.EntityBaseData {
        /**
         * The user ID who is credited (defaults to the owner of the wallet)
         */
        CreditedUserId: string;

        /**
         * The ID of a wallet
         */
        WalletId: string;

        /**
         * The Country of the Address
         */
        Country: CountryISO;

        /**
         * The type of banking alias (note that only IBAN is available at present)
         */
        Type: BankingAliasType;

        /**
         * The owner of the wallet/banking alias
         */
        OwnerName: string;

        /**
         * Whether the banking alias is active or not
         */
        Active: boolean;
    }

    interface IBANBankingAliasData extends BankingAliasData {
        /**
         * The type of banking alias (note that only IBAN is available at present)
         */
        Type: "IBAN";

        /**
         * The IBAN of the banking alias
         */
        IBAN: string;

        /**
         * The BIC of the banking alias
         */
        BIC: string;
    }

    interface CreateIBANBankingAlias extends PickPartialRequired<IBANBankingAliasData,
        "Tag" | "CreditedUserId", "OwnerName" | "Country"> {
    }
}
