import { Omit } from "../types";
import { transfer } from "./transfer";
import { enums } from "../enums";
import { money } from "./money";
import { base } from "../base";

export namespace payOut {
    import MoneyData = money.MoneyData;
    import FallbackReasonData = base.FallbackReasonData;
    import PayoutPaymentRefData = base.PayoutPaymentRefData;

    type PayoutModeRequestedType = "STANDARD" | "INSTANT_PAYMENT" | "INSTANT_PAYMENT_ONLY";

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

        /**
         * Payment reference provided for the payout.
         */
        PaymentRef: PayoutPaymentRefData;
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
         * INSTANT_PAYMENT_ONLY: an instant payment bank wire is requested and the processing time is within 25 seconds,
         * but if any prerequisite is not met or another problem occurs, there is no fallback: the wallet is automatically refunded and the payout is not completed.
         */
        PayoutModeRequested?: PayoutModeRequestedType;
    }

    interface CheckPayOutEligibility {
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
        Fees?: MoneyData;

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

        /**
         * Payout mode requested. May take one of the following values:
         * STANDARD (value by default if no parameter is sent): a standard bank wire is requested and the processing time of the funds is about 48 hours;
         * INSTANT_PAYMENT: an instant payment bank wire is requested and the processing time is within 25 seconds (subject to prerequisites)
         * INSTANT_PAYMENT_ONLY: an instant payment bank wire is requested and the processing time is within 25 seconds,
         * but if any prerequisite is not met or another problem occurs, there is no fallback: the wallet is automatically refunded and the payout is not completed.
         */
        PayoutModeRequested: PayoutModeRequestedType;

        PaymentType: enums.IPayOutPaymentType["BankWire"];
    }

    interface CheckPayOutEligibilityData {
        InstantPayout: InstantPayOutEligibilityData;
    }

    interface InstantPayOutEligibilityData {
        IsReachable: boolean;

        UnreachableReason?: FallbackReasonData;
    }
}
