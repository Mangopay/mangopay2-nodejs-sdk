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

}
