import { CurrencyISO, Omit, PickPartial } from "../types";
import { entityBase } from "./entityBase";
import { money } from "./money";

export namespace wallet {
    import MoneyData = money.MoneyData;

    interface WalletData extends entityBase.EntityBaseData {
        /**
         * An array of userIDs of who own's the wallet. For now, you only can set up a unique owner.
         */
        Owners: [string];

        /**
         * The current balance of the wallet
         */
        Balance: MoneyData;

        /**
         * The type of funds in the wallet
         */
        FundsType: FundsType;

        /**
         * A description of the wallet
         */
        Description: string;

        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;
    }

    interface ClientWalletData extends Omit<WalletData, "Owners" | "Description"> {
        FundsType: ClientFundsType;
    }

    type ClientFundsType = "FEES" | "CREDIT";

    type FundsType = "DEFAULT" | ClientFundsType;

    type CreateWallet = UpdateWallet & Pick<WalletData, "Owners" | "Currency" | "Description">;

    type UpdateWallet = PickPartial<WalletData, "Tag" | "Description">;
}
