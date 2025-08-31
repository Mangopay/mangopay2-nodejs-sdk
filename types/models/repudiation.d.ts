import { transaction } from "./transaction";
import { refund } from "./refund";

export namespace repudiation {
    interface RepudiationData extends transaction.TransactionData {
        /**
         * The nature of the transaction
         */
        Nature: "REPUDIATION";

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
}
