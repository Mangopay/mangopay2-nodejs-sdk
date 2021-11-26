import { PickPartialRequired, ValueOf } from "../types";
import { enums } from "../enums";
import { entityBase } from "./entityBase";

export namespace mandate {
    /**
     * - "CREATED" - the mandate has been created
     * - "SUBMITTED" - the mandate has been submitted to the banks and you can now do payments with this mandate
     * - "ACTIVE" - the mandate is active and has been accepted by the banks and/or successfully used in a payment
     * - "FAILED" - the mandate has failed for a variety of reasons and is no longer available for payments
     */
    type MandateStatus = ValueOf<enums.IMandateStatus>;

    type MandateScheme = "SEPA" | "BACS";

    type MandateCultureCode = "EN" | "FR" | "NL" | "DE" | "ES" | "IT" | "PL";

    type MandateExecutionType = "WEB";

    type MandateType = "DIRECT_DEBIT";

    interface MandateData extends entityBase.EntityBaseData {
        /**
         * An ID of a Bank Account
         */
        BankAccountId: string;

        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: string;

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * The URL to download the mandate
         */
        DocumentURL: string;

        /**
         * The language to use for the mandate confirmation page - needs to be the ISO code of the language
         */
        Culture: MandateCultureCode;

        /**
         * The type of mandate, but will only be completed once the mandate has been submitted
         */
        Scheme: MandateScheme;

        /**
         * The status of the mandate:
         */
        Status: MandateStatus;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * The execution type for creating the mandate
         */
        ExecutionType: MandateExecutionType;

        /**
         * The type of Mandate
         */
        MandateType: MandateType;

        /**
         * The banking reference for this mandate
         */
        BankReference: string;
    }

    interface CreateMandate extends PickPartialRequired<MandateData,
        "Tag",
        "BankAccountId" | "Culture" | "ReturnURL"> {
    }
}
