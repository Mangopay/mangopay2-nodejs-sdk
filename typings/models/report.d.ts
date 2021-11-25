import { CurrencyISO, PickPartial, Timestamp } from "../types";
import { transaction } from "./transaction";
import { entityBase } from "./entityBase";

export namespace report {
    type Column =
        | "Alias"
        | "AuthorId"
        | "BankAccountId"
        | "BankWireRef"
        | "CardId"
        | "CardType"
        | "Country"
        | "CreationDate"
        | "CreditedFundsAmount"
        | "CreditedFundsCurrency"
        | "CreditedUserId"
        | "CreditedWalletId"
        | "Culture"
        | "DebitedFundsAmount"
        | "DebitedFundsCurrency"
        | "DebitedWalletId"
        | "DeclaredDebitedFundsAmount"
        | "DeclaredDebitedFundsCurrency"
        | "DeclaredFeesAmount"
        | "DeclaredFeesCurrency"
        | "ExecutionDate"
        | "ExecutionType"
        | "ExpirationDate"
        | "FeesAmount"
        | "FeesCurrency"
        | "Id"
        | "Nature"
        | "PaymentType"
        | "PreauthorizationId"
        | "ResultCode"
        | "ResultMessage"
        | "Status"
        | "Tag"
        | "Type"
        | "WireReference";

    interface Filters {
        /**
         * To return only resources that have CreationDate BEFORE this date
         */
        BeforeDate: Timestamp;

        /**
         * To return only resources that have CreationDate AFTER this date
         */
        AfterDate: Timestamp;

        /**
         * The type of the transaction
         */
        Type: transaction.TransactionType[];

        /**
         * The status of the transaction
         */
        Status: transaction.TransactionStatus[];

        /**
         * The nature of the transaction
         */
        Nature: transaction.TransactionNature[];

        /**
         * The minimum amount of DebitedFunds
         */
        MinDebitedFundsAmount: number;

        /**
         * The currency for the minimum amount of DebitedFunds
         */
        MinDebitedFundsCurrency: CurrencyISO;

        /**
         * The maximum amount of DebitedFunds
         */
        MaxDebitedFundsAmount: number;

        /**
         * The currency for the maximum amount of DebitedFunds
         */
        MaxDebitedFundsCurrency: CurrencyISO;

        /**
         * The minimum amount of Fees
         */
        MinFeesAmount: number;

        /**
         * The currency for the minimum amount of Fees
         */
        MinFeesCurrency: CurrencyISO;

        /**
         * The maximum amount of Fees
         */
        MaxFeesAmount: number;

        /**
         * The currency for the maximum amount of Fees
         */
        MaxFeesCurrency: CurrencyISO;

        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * The ID of a wallet
         */
        WalletId: string;
    }

    interface ReportData extends entityBase.EntityBaseData {
        /**
         * The date when the report was executed
         */
        ReportDate: Timestamp;

        /**
         * The URL to download the report
         */
        DownloadURL: string;

        /**
         * A URL that we will ping when the report is ready to download(works in a similar way to the hooks)
         */
        CallbackURL: string;

        /**
         * The format of the report download
         */
        DownloadFormat: "CSV";

        /**
         * The type of report
         */
        ReportType: "TRANSACTION" | "WALLET";

        /**
         * The column to sort against and direction separated by a `:`
         */
        Sort: string;

        /**
         * Whether the report should be limited to the first 10 lines(and therefore quicker to execute)
         */
        Preview: boolean;

        /**
         * An object of various filters for the report
         */
        Filters: Filters;

        /**
         * A list of columns / infos to show in the report
         */
        Columns: Column[];

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;
    }

    interface CreateReport extends PickPartial<ReportData,
        | "Tag"
        | "CallbackURL"
        | "DownloadFormat"
        | "Sort"
        | "Preview"
        | "Filters"
        | "Columns"
        | "ReportType"> {
    }
}
