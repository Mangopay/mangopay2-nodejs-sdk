import { entityBase } from "./entityBase";
import { money } from "./money";
import { transaction } from "./transaction";
import { conversionRate } from "./conversionRate";

export namespace conversion {
    import TransactionStatus = transaction.TransactionStatus;
    import TransactionType = transaction.TransactionType;
    import TransactionNature = transaction.TransactionNature;
    import MoneyData = money.MoneyData;
    import MoneyDataOptionalAmount = money.MoneyDataOptionalAmount;
    import ConversionRateData = conversionRate.ConversionRateData;

    type QuoteStatus = "ACTIVE" | "EXPIRED";

    interface ConversionData extends entityBase.EntityBaseData {
        /**
         * The unique identifier of the active quote which guaranteed the rate for the conversion.
         */
        QuoteId: string;

        /**
         * The unique identifier of the user at the source of the transaction
         */
        AuthorId: string;

        /**
         * The unique identifier of the debited wallet.
         */
        DebitedWalletId: string;

        /**
         * The unique identifier of the credited wallet
         */
        CreditedWalletId: string;

        /**
         * The sell funds
         */
        DebitedFunds: MoneyData;

        /**
         * The buy funds
         */
        CreditedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet).
         * Note: The fees currency must match the debited funds currency.
         */
        Fees: MoneyData;

        /**
         * Real time indicative market rate of a specific currency pair
         */
        ConversionRateResponse: ConversionRateData;

        /**
         * The status of the transaction.
         */
        Status: TransactionStatus;

        /**
         * The type of transaction
         */
        Type: TransactionType;

        /**
         * The nature of the transaction, providing more
         * information about the context in which the transaction occurred
         */
        Nature: TransactionNature;

        /**
         * The code indicates the result of the operation.
         * This information is mostly used to handle errors or for filtering purposes.
         */
        ResultCode: string;

        /**
         * The explanation of the result code.
         */
        ResultMessage: string;

        /**
         * The date and time at which the status changed to SUCCEEDED,
         * indicating that the transaction occurred.
         * The statuses CREATED and FAILED return an ExecutionDate of null
         */
        ExecutionDate: number;
    }

    interface CreateInstantConversion {
        /**
         * The unique identifier of the user at the source of the transaction.
         */
        AuthorId: string;

        /**
         * The unique identifier of the debited wallet.
         */
        DebitedWalletId: string;

        /**
         * The unique identifier of the credited wallet
         */
        CreditedWalletId: string;

        /**
         * The sell funds
         */
        DebitedFunds: MoneyData;

        /**
         * The buy funds
         */
        CreditedFunds: MoneyData;

        /**
         * Information about the fees taken by the platform for this transaction (and hence transferred to the Fees Wallet).
         * Note: The fees currency must match the debited funds currency.
         */
        Fees?: MoneyData;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }

    interface CreateQuotedConversion {
        /**
         * The unique identifier of the active quote which guaranteed the rate for the conversion.
         */
        QuoteId: string;

        /**
         * The unique identifier of the user at the source of the transaction.
         */
        AuthorId: string;

        /**
         * The unique identifier of the debited wallet.
         */
        DebitedWalletId: string;

        /**
         * The unique identifier of the credited wallet
         */
        CreditedWalletId: string;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }

    interface CreateClientWalletsQuotedConversion {
        /**
         * The unique identifier of the active quote which guaranteed the rate for the conversion.
         */
        QuoteId: string;

        /**
         * The type of the client wallet to be debited.
         * Allowed values: FEES, CREDIT
         */
        DebitedWalletType: string;

        /**
         * The type of the client wallet to be credited.
         * Allowed values: FEES, CREDIT
         */
        CreditedWalletType: string;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }

    interface CreateClientWalletsInstantConversion {
        /**
         * The sell funds
         */
        DebitedFunds: MoneyData;

        /**
         * The buy funds
         */
        CreditedFunds: MoneyDataOptionalAmount;

        /**
         * The type of the client wallet to be debited.
         * Allowed values: FEES, CREDIT
         */
        DebitedWalletType: string;

        /**
         * The type of the client wallet to be credited.
         * Allowed values: FEES, CREDIT
         */
        CreditedWalletType: string;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }

    interface QuoteData extends entityBase.EntityBaseData {
        ExpirationDate: number;
        Status: QuoteStatus;
        DebitedFunds: MoneyData;
        CreditedFunds: MoneyData;
        ConversionRateResponse: ConversionRateData;
    }

    interface CreateQuote {
        DebitedFunds: MoneyData;
        CreditedFunds: MoneyData;
        Duration: number;
        Tag?: string;
    }
}
