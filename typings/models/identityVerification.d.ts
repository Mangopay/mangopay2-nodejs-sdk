import {entityBase} from "./entityBase";

export namespace identityVerification {

    interface IdentityVerificationData extends entityBase.EntityBaseData {
        /**
         * The URL to redirect the user to for the hosted identity verification session.
         */
        HostedUrl: string;

        /**
         * The status of the identity verification session:
         * <p>PENDING – The session is available on the HostedUrl, to which the user must be redirected to complete it.</p>
         * <p>VALIDATED – The session was successful.</p>
         * <p>REFUSED – The session was refused.</p>
         * <p>REVIEW – The session is under manual review by Mangopay.</p>
         * <p>OUT_OF_DATE – The session is no longer valid (likely due to expired documents used during the session).</p>
         * <p>TIMEOUT – The session timed out due to inactivity.</p>
         * <p>ERROR – The session was not completed because an error occurred.</p>
         */
        Status: string;

        /**
         * The URL to which the user is returned after the hosted identity verification session, regardless of the outcome.
         */
        ReturnUrl: string;

        LastUpdate: number;

        UserId: string;

        /**
         * The details of the individual verification checks performed during the session.
         */
        Checks: Check[];
    }

    interface CreateIdentityVerification {
        /**
         * The URL to which the user is returned after the hosted identity verification session, regardless of the outcome.
         */
        ReturnUrl: string;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }

    interface CheckData {
        /**
         * The type of the data point.
         */
        Type: string;

        /**
         * The value of the data point.
         */
        Value: string;
    }

    interface Check {
        /**
         * The unique identifier of the verification check.
         */
        CheckId: string;

        /**
         * Type of verification check performed:
         * <p>BUSINESS_VERIFICATION - Verification of the business entity of a Legal User.</p>
         * <p>IDENTITY_DOCUMENT_VERIFICATION - Verification of the identity document of a Natural User or the legal representative of a Legal User.</p>
         * <p>PERSONS_SIGNIFICANT_CONTROL - Verification of a person of significant control of a Legal User.</p>
         */
        Type: string;

        /**
         * Returned values: VALIDATED, REFUSED, REVIEW
         */
        CheckStatus: string;

        /**
         * The date and time at which the check was created.
         */
        CreationDate: number;

        /**
         * The date and time at which the check was last updated.
         */
        LastUpdate: number;

        /**
         * The data points collected and verified during the check.
         */
        Data: CheckData[];

        Reasons: CheckData[];
    }
}
