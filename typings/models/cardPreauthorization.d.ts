import { PickPartialRequired, SecureMode, Timestamp } from "../types";
import { entityBase } from "./entityBase";
import { billing } from "./billing";
import { Base } from "../base";
import { money } from "./money";
import { securityInfo } from "./securityInfo";

export namespace cardPreAuthorization {
    import BillingData = billing.BillingData;
    import BrowserInfoData = Base.BrowserInfoData;
    import MoneyData = money.MoneyData;
    import SecurityInfoData = securityInfo.SecurityInfoData;

    type PreAuthorizationExecutionType = "DIRECT";

    type PaymentStatus = "WAITING" | "CANCELED" | "EXPIRED" | "VALIDATED";

    type PreAuthorizationStatus = "CREATED" | "SUCCEEDED" | "FAILED";

    type CreateCardPreAuthorization = PickPartialRequired<CardPreAuthorizationData,
        "Tag" | "Billing" | "SecureMode", "AuthorId" | "DebitedFunds" | "CardId" | "SecureModeReturnURL" | "IpAddress" | "BrowserInfo">;

    type UpdateCardPreAuthorization = PickPartialRequired<CardPreAuthorizationData,
        "Tag",
        "PaymentStatus" | "Id">;

    interface CardPreAuthorizationData extends entityBase.EntityBaseData {
        /**
         * A user's ID
         */
        AuthorId: string;

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Status of the PreAuthorization
         */
        Status: PreAuthorizationStatus;

        /**
         * The status of the payment after the PreAuthorization. You can pass the PaymentStatus from "WAITING" to "CANCELED" should you need/want to
         */
        PaymentStatus: PaymentStatus;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * How the PreAuthorization has been executed
         */
        ExecutionType: PreAuthorizationExecutionType;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually.
         * The field lets you activate it automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ),
         * "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The date when the payment is to be processed by
         */
        ExpirationDate: Timestamp;

        /**
         * The Id of the associated PayIn
         */
        PayInId: string;

        /**
         * Contains useful information related to the user billing
         */
        Billing: BillingData;

        /**
         * Contains useful information related to security and fraud
         */
        SecurityInfo: SecurityInfoData;

        IpAddress: string;

        BrowserInfo: BrowserInfoData;
    }
}
