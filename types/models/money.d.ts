import { CurrencyISO } from "../types";
import { entityBase } from "./entityBase";

export namespace money {
    interface MoneyData {
        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;

        /**
         * An amount of money in the smallest sub-division of the currency, e.g. 12.60 EUR would be represented as 1260 whereas 12 JPY would be represented as just 12)
         */
        Amount: number;
    }

    interface MoneyDataOptionalAmount {
        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;

        /**
         * An amount of money in the smallest sub-division of the currency, e.g. 12.60 EUR would be represented as 1260 whereas 12 JPY would be represented as just 12)
         */
        Amount?: number;
    }

    interface EMoneyData extends entityBase.EntityBaseData {
        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The amount of money that has been credited to this user
         */
        CreditedEMoney: MoneyData;

        /**
         * The amount of money that has been debited from this user
         */
        DebitedEMoney: MoneyData;
    }
}
