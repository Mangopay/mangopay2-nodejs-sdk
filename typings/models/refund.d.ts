import { transaction } from "./transaction";
import { money } from "./money";

export namespace refund {
    import MoneyData = money.MoneyData;

    type RefundReasonType =
        | "INITIALIZED_BY_CLIENT"
        | "BANKACCOUNT_INCORRECT"
        | "OWNER_DO_NOT_MATCH_BANKACCOUNT"
        | "BANKACCOUNT_HAS_BEEN_CLOSED"
        | "WITHDRAWAL_IMPOSSIBLE_ON_SAVINGS_ACCOUNTS"
        | "OTHER";

    interface RefundReason {
        RefundReasonType: RefundReasonType;
    }

    interface RefundData extends transaction.TransactionData {
        /**
         * The nature of the transaction
         */
        Nature: "REFUND";

        /**
         * The initial transaction ID
         */
        InitialTransactionId: string;

        /**
         * The initial transaction type
         */
        InitialTransactionType: transaction.TransactionType;

        /**
         * Contains info about the reason for refund
         */
        RefundReason: RefundReason;
    }

    interface CreatePayInRefund {
        AuthorId: string;

        Tag?: string;

        DebitedFunds?: MoneyData;

        Fees?: MoneyData;
        
        StatementDescriptor?: string;
    }

    interface CreateTransferRefund {
        AuthorId: string;

        Tag?: string;
    }
}
