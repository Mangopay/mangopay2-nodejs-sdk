import { transaction } from "./transaction";
import { PickPartial, Timestamp } from "../types";
import { entityBase } from "./entityBase";
import { money } from "./money";

export namespace dispute {
    import MoneyData = money.MoneyData;

    interface DisputeReason {
        DisputeReasonType: DisputeReasonType;

        DisputeReasonMessage: string;
    }

    interface DisputeData extends entityBase.EntityBaseData {
        /**
         * The initial transaction ID
         */
        InitialTransactionId: string;

        /**
         * The initial transaction type
         */
        InitialTransactionType: transaction.TransactionType;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * Info about the reason for the dispute
         */
        DisputeReason: DisputeReason;

        /**
         * The status of the dispute
         */
        Status: DisputeStatus;

        /**
         * Used to communicate information about the dispute status to you
         */
        StatusMessage: string;

        /**
         * The amount of funds that were disputed
         */
        DisputedFunds: MoneyData;

        /**
         * The amount you wish to contest
         */
        ContestedFunds: MoneyData;

        /**
         * The type of dispute
         */
        DisputeType: DisputeType;

        /**
         * The deadline by which you must contest the dispute (if you wish to contest it)
         */
        ContestDeadlineDate: Timestamp;

        /**
         * The ID of the associated repudiation transaction
         */
        RepudiationId: string;
    }

    interface SubmitDispute
        extends PickPartial<DisputeData, "ContestedFunds"> {
    }

    interface UpdateDispute extends PickPartial<DisputeData, "Tag"> {
    }

    type DisputeReasonType =
        "DUPLICATE"
        | "FRAUD"
        | "PRODUCT_UNACCEPTABLE"
        | "UNKNOWN"
        | "OTHER"
        | "REFUND_CONVERSION_RATE"
        | "LATE_FAILURE_INSUFFICIENT_FUNDS"
        | "LATE_FAILURE_CONTACT_USER"
        | "LATE_FAILURE_BANKACCOUNT_CLOSED"
        | "LATE_FAILURE_BANKACCOUNT_INCOMPATIBLE"
        | "LATE_FAILURE_BANKACCOUNT_INCORRECT"
        | "AUTHORISATION_DISPUTED"
        | "TRANSACTION_NOT_RECOGNIZED"
        | "PRODUCT_NOT_PROVIDED"
        | "CANCELED_REOCCURING_TRANSACTION"
        | "REFUND_NOT_PROCESSED";

    type DisputeStatus =
        | "CREATED"
        | "PENDING_CLIENT_ACTION"
        | "SUBMITTED"
        | "PENDING_BANK_ACTION"
        | "REOPENED_PENDING_CLIENT_ACTION"
        | "CLOSED";

    type DisputeType = "CONTESTABLE" | "NOT_CONTESTABLE" | "RETRIEVAL";
}
