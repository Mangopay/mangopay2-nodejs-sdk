import {base} from "../base";
import {identityVerification} from "../models/identityVerification";
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;
import MethodOverload = base.MethodOverload;

export class IdentityVerifications {
    /**
     * Start an identity verification session and get a link for the hosted experience
     * @param {string} userId The user identifier
     * @param {Object} identityVerification The IdentityVerification object
     */
    create: TwoArgsMethodOverload<
        string,
        identityVerification.CreateIdentityVerification,
        identityVerification.IdentityVerificationData
    >;

    /**
     * See the status and basic details of an identity verification session
     * @param {string} id The unique identifier of the identity verification session.
     */
    get: MethodOverload<string, identityVerification.IdentityVerificationData>;
}
