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
         * <p>OUTDATED – The session is no longer valid (likely due to expired documents used during the session).</p>
         * <p>TIMEOUT – The session timed out due to inactivity.</p>
         * <p>ERROR – The session was not completed because an error occurred.</p>
         */
        Status: string;

        /**
         * The URL to which the user is returned after the hosted identity verification session, regardless of the outcome.
         */
        ReturnUrl: string;
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
         * For more details, <a href="https://mangopay-idv.mintlify.app/guides/users/verification/hosted?_gl=1*1unwn0t*_up*MQ..*_ga*ODg5MjI4ODQzLjE3Mzg5MjY2NjE.*_ga_VZLQHP6CFB*MTczODkyNjY2MC4xLjAuMTczODkyNjY2MC4wLjAuMA..#verified-data-returned">see the Verified data returned.</a>
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
        Data: CheckData[]
    }

    interface IdentityVerificationCheckData {
        /**
         * Unique identifier for the entire verification session.
         */
        SessionId: string;

        /**
         * The status of the identity verification session:
         * <p>PENDING – The session is available on the HostedUrl, to which the user must be redirected to complete it.</p>
         * <p>VALIDATED – The session was successful.</p>
         * <p>REFUSED – The session was refused.</p>
         * <p>REVIEW – The session is under manual review by Mangopay.</p>
         * <p>OUTDATED – The session is no longer valid (likely due to expired documents used during the session).</p>
         * <p>TIMEOUT – The session timed out due to inactivity.</p>
         * <p>ERROR – The session was not completed because an error occurred.</p>
         */
        Status: string;

        /**
         * The date and time at which the session was created.
         */
        CreationDate: number;

        /**
         * The date and time at which the session was last updated.
         */
        LastUpdate: number;

        /**
         * The details of the individual verification checks performed during the session.
         */
        Checks: Check[];
    }
}
