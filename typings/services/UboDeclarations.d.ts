import { uboDeclaration } from "../models/uboDeclaration";
import { Base } from "../base";
import TwoArgsMethodOverload = Base.TwoArgsMethodOverload;
import MethodOverload = Base.MethodOverload;
import ThreeArgsMethodOverload = Base.ThreeArgsMethodOverload;

/**
 * An UBO Declaration is an electronic version of the previous KYC document "Shareholder Declaration", in order to declare all the Ultimate Beneficial Owners of a BUSINESS-typed legal User
 * (ie the shareholders with >25% of capital or voting rights).
 *
 * 1. Create each Ultimate Beneficial Owner as a Natural User, who must have a "DECLARATIVE" Capacity.
 * 2. Create a new UBO Declaration for your legal user, and link every Ultimate Beneficial Owners created previously thanks to DeclaredUBOs.
 *  - This list can be empty if your legal user has no Ultimate Beneficial Owner, or no eligible one (ie. no Ultimate Beneficial Owner that owns more than 25% of this company).
 * 3. Edit the UBODeclaration object and set the Status field to "VALIDATION_ASKED" (instead of "CREATED")
 * 4. The demand is received by our team and once processed, it will either get a "VALIDATED" status, or "REFUSED" with more information provided in the RefusedReasonTypes parameter
 *
 * Note that UBO declarations are not yet a requirement for your user to be KYC verified and are optional at this stage
 */
export class UboDeclarations {
    /**
     * Retrieves a UBO declaration object from the API.
     * @param {String} userId User Unique identifier
     * @param {String} id Unique identifier
     * @param {Object} options
     */
    get: TwoArgsMethodOverload<string, string, uboDeclaration.UboDeclarationData>;

    /**
     * Retrieves a UBO declaration object from the API.
     * @param {String} id Unique identifier
     * @param {Object} options
     */
    getById: MethodOverload<string, uboDeclaration.UboDeclarationData>;

    /**
     * Updates a UBO declaration entity.
     * @param {String} userId User Unique Identifier
     * @param {Object} uboDeclaration Updated UBO declaration entity - must have ID!
     * @param {Object} options
     */
    update: TwoArgsMethodOverload<
        string,
        uboDeclaration.UpdateUboDeclaration,
        uboDeclaration.UboDeclarationData
        >;

    /**
     * Create a UBO declaration object from the API
     * @param {String} userId user Unique identifier
     * @param {Object} options
     */
    create: MethodOverload<string, uboDeclaration.UboDeclarationData>;

    /**
     * @param {String} userId user Uniquer identifier
     */
    getAll: MethodOverload<string, uboDeclaration.UboDeclarationData[]>;

    /**
     * @param {String} userId User Uniquer identifier
     * @param {String} uboDeclarationId UboDeclaration Uniquer identifier
     * @param {Object} Ubo object
     */
    createUbo: ThreeArgsMethodOverload<string, string, uboDeclaration.CreateUbo, uboDeclaration.UboData>;

    /**
     * @param {String} userId User Uniquer identifier
     * @param {String} uboDeclarationId UboDeclaration Uniquer identifier
     * @param {String} uboId Ubo Uniquer identifier
     */
    getUbo: ThreeArgsMethodOverload<string, string, string, uboDeclaration.UboData>;

    /**
     * @param {String} userId User Uniquer identifier
     * @param {String} uboDeclarationId UboDeclaration Uniquer identifier
     * @param {Object} Ubo object
     */
    updateUbo: ThreeArgsMethodOverload<string, string, uboDeclaration.CreateUbo, uboDeclaration.UboData>;
}
