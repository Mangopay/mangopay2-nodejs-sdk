import { transaction } from "./transaction";
import { Timestamp } from "../types";
import { entityBase } from "./entityBase";
import { money } from "./money";
import { user } from "./user";

export namespace transfer {
    import MoneyData = money.MoneyData;

    interface TransferData extends entityBase.EntityBaseData {
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
        Type: "TRANSFER";

        ScaContext: string;

        PendingUserAction: user.PendingUserActionData;
    }

    interface CreateTransfer {
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
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

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

        ScaContext?: string;
    }
}
