import { transaction } from "./transaction";
import { refund } from "./refund";
import { PickPartialRequired } from "../types";

export namespace settlementTransfer {
    interface SettlementTransferData extends transaction.TransactionData {
        /**
         * The nature of the transaction
         */
        Nature: "SETTLEMENT";

        /**
         * The ID of the associated repudiation transaction
         */
        RepudiationId: string;

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
        RefundReason: refund.RefundReason;
    }

    interface CreateSettlementTransfer extends PickPartialRequired<SettlementTransferData,
        "Tag",
        "AuthorId" | "DebitedFunds" | "Fees"> {
    }
}
