import { Omit } from "../types";
import { transfer } from "./transfer";
import { enums } from "../enums";
import { money } from "./money";

export namespace payOut {
    import MoneyData = money.MoneyData;

    type PayoutModeRequestedType = "STANDARD" | "INSTANT_PAYMENT";

    interface PayOutData extends Omit<transfer.TransferData, "Type"> {
        /**
         * The type of the transaction
         */
        Type: "PAYOUT";

        PaymentType: enums.IPayOutPaymentType["BankWire"];

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

        PaymentType: enums.IPayOutPaymentType["BankWire"];

        /**
         * Payout mode requested. May take one of the following values:
         * STANDARD (value by default if no parameter is sent): a standard bank wire is requested and the processing time of the funds is about 48 hours;
         * INSTANT_PAYMENT: an instant payment bank wire is requested and the processing time is within 25 seconds (subject to prerequisites)
         */
        PayoutModeRequested?: PayoutModeRequestedType;
    }
}
