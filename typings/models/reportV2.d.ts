import {CurrencyISO} from "../types";
import {entityBase} from "./entityBase";

export namespace reportV2 {
    interface ReportFilterV2 {
        /**
         * The currency of the DebitedFunds, CreditedFunds, or Fees of the transactions (and therefore the wallets).
         */
        Currency?: CurrencyISO;

        /**
         * The unique identifier of the user referenced as the AuthorId or CreditedUserId of the transaction.
         */
        UserId?: string;

        /**
         * The unique identifier of the wallet referenced as the DebitedWalletId or CreditedWalletId of the transaction.
         */
        WalletId?: string;
    }

    interface ReportDataV2 extends entityBase.EntityBaseData {
        /**
         * The date and time at which the report was generated.
         */
        ReportDate: number;

        /**
         * The status of the report. Returned values: PENDING, READY_FOR_DOWNLOAD, FAILED, EXPIRED
         */
        Status: string;

        /**
         * The code indicating the result of the operation.
         * This information is mostly used to handle errors or for filtering purposes.
         */
        ResultCode: string;

        /**
         * The explanation of the result code.
         */
        ResultMessage: string;

        /**
         * The format in which the report is going to be downloaded.
         */
        DownloadFormat: string;

        /**
         * The URL at which the report file can be downloaded when the Status is GENERATED.
         */
        DownloadURL: string;

        /**
         * The type of the report: USER_WALLET_TRANSACTIONS, COLLECTED_FEES
         */
        ReportType: string;

        /**
         * The sorting direction of the CreationDate column. By default, the generated report is sorted by ascending creation date.
         */
        Sort: string;

        /**
         * The date and time after which the report’s transaction was created, based on the transaction’s CreationDate.
         */
        AfterDate: number;

        /**
         * The date and time before which the report’s transaction was created, based on the transaction’s CreationDate.
         */
        BeforeDate: number;

        /**
         * The filers to apply.
         * The Currency and WalletId cannot be used together.
         */
        Filters: ReportFilterV2;

        /**
         * The data columns to be included in the report.
         */
        Columns: ReportColumn[];
    }

    interface CreateReportV2 {
        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;

        /**
         * The format in which the report is going to be downloaded.
         */
        DownloadFormat: string;

        /**
         * The type of the report: USER_WALLET_TRANSACTIONS, COLLECTED_FEES
         */
        ReportType: string;

        /**
         * The sorting direction of the CreationDate column. By default, the generated report is sorted by ascending creation date.
         */
        Sort?: string;

        /**
         * The date and time after which the report’s transaction was created, based on the transaction’s CreationDate.
         */
        AfterDate: number;

        /**
         * The date and time before which the report’s transaction was created, based on the transaction’s CreationDate.
         */
        BeforeDate: number;

        /**
         * The filers to apply.
         * The Currency and WalletId cannot be used together.
         */
        Filters?: ReportFilterV2;

        /**
         * The data columns to be included in the report.
         */
        Columns?: string[];
    }

    interface ReportColumn {
        Name: string;
        IsDefault: boolean;
    }
}
