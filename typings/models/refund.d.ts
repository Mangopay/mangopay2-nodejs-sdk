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
        | "OTHER"
        | "INITIALIZED_BY_MANGOPAY"
        | "AG01_FORBIDDEN_TRANSACTION"
        | "AC06_BLOCKED_BANKACCOUNT"
        | "AG02_INVALID_BANK_OPERATION"
        | "AM05_DUPLICATE_PAYMENT"
        | "BE04_BENEFICIARY_ADDRESS_MISSING"
        | "CNOR_INVALID_BIC"
        | "ERIN_REMITTANCE_INFO_NOT_SUPPORTED"
        | "MD07_BENEFICIARY_IS_DECEASED"
        | "MS02_BENEFICIARY_ORDER"
        | "MS03_NOT_SPECIFIED"
        | "RC01_INVALIDE_BIC"
        | "RR01_REGULATORY_REASON"
        | "RR02_REGULATORY_REASON"
        | "RR03_BENEFICIARY_NAME_OR_ADDRESS_MISSING"
        | "RR04_REGULATORY_REASON"
        | "ED05_SETTLEMENT_FAILED"
        | "FF01_INVALID_FILE_FORMAT"
        | "TM01_CUT_OFF_TIME"
        | "DNOR_DEBTOR_BANK_NOT_REGISTERED"
        | "FOCR_RECALLED"
        | "CB";

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

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor: string;
    }

    interface CreatePayInRefund {
        AuthorId: string;

        Tag?: string;

        DebitedFunds?: MoneyData;

        Fees?: MoneyData;

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor?: string; 
    }

    interface CreateTransferRefund {
        AuthorId: string;

        Tag?: string;

        DebitedFunds?: MoneyData;

        Fees?: MoneyData;
    }
}
