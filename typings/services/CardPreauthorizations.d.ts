import { cardPreAuthorization } from "../models/cardPreauthorization";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;

/**
 * The PreAuthorization Object ensures the solvency of a registered card for 7 days. The overall process is as follows:
 *
 * 1. Register a card (CardRegistration)
 * 2. Create a PreAuthorization with the CardId. This allows you to charge an amount on a card
 * 3. Charge the card through the PreAuthorized PayIn object (Payins/preauthorized/direct)
 *
 * How does PreAuthorization work?
 * - Once the PreAuthorization object is created the Status is "CREATED" until 3D secure validation.
 * - If the authorization is successful the status is "SUCCEEDED" if it failed the status is "FAILED".
 * - Once Status = "SUCCEEDED" and PaymentStatus = "WAITING" you can charge the card.
 * - The Pay-In amount has to be less than or equal to the amount authorized.
 */
export class CardPreAuthorizations {
    /**
     * Create new pre-authorization
     * @param cardPreAuthorization
     * @param options
     */
    create: MethodOverload<
        cardPreAuthorization.CreateCardPreAuthorization,
        cardPreAuthorization.CardPreAuthorizationData
        >;

    /**
     * Get data for Card pre-authorization
     * @param cardPreAuthorizationId
     * @param options
     */
    get: MethodOverload<string, cardPreAuthorization.CardPreAuthorizationData>;

    /**
     * Update pre-authorization object (currently only supports cancellation)
     * @param  cardPreAuthorization
     */
    update: MethodOverload<
        cardPreAuthorization.UpdateCardPreAuthorization,
        cardPreAuthorization.CardPreAuthorizationData
        >;
}
