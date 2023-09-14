import { Timestamp } from "../types";
import { entityBase } from "./entityBase";
import { money } from "./money";

export namespace transaction {
    import MoneyData = money.MoneyData;

    type TransactionNature = "REGULAR" | "REPUDIATION" | "REFUND" | "SETTLEMENT";

    type TransactionType = "PAYIN" | "TRANSFER" | "PAYOUT" | "CARD_VALIDATION";

    type TransactionStatus = "CREATED" | "SUCCEEDED" | "FAILED";

    interface TransactionData extends entityBase.EntityBaseData {
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
        Nature: TransactionNature;

        /**
         * The status of the transaction
         */
        Status: TransactionStatus;

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
        Type: TransactionType;
    }
}
