import { Omit } from "../types";
import { transfer } from "./transfer";
import { Enums } from "../enums";
import { money } from "./money";

export namespace payOut {
    import MoneyData = money.MoneyData;

    interface PayOutData extends Omit<transfer.TransferData, "Type"> {
        /**
         * The type of the transaction
         */
        Type: "PAYOUT";

        PaymentType: Enums.IPayOutPaymentType["BankWire"];

        /**
         * An ID of a Bank Account
         */
        BankAccountId: string;

        /**
         * A custom reference you wish to appear on the user’s bank statement (your Client Name is already shown). This reference can contain max 12 characters
         */
        BankWireRef: string;
    }

    interface CreatePayOut {
        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet)
         */
        Fees: MoneyData;

        /**
         * An ID of a Bank Account
         */
        BankAccountId: string;

        /**
         * The ID of the wallet that was debited
         */
        DebitedWalletId: string;

        /**
         * A custom reference you wish to appear on the user’s bank statement (your Client Name is already shown). This reference can contain max 12 characters
         */
        BankWireRef?: string;

        Tag?: string;

        PaymentType: Enums.IPayOutPaymentType["BankWire"];
    }
}
