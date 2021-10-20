import { cardRegistration } from "../models/cardRegistration";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;

/**
 * You need to register a card in order to process a Direct PayIn. Card registration enables you to tokenize a Card. These are the steps to follow:
 *
 * 1. Create a CardRegistration Object
 * 2. Get a PreRegistrationData
 * 3. The user posts PreRegistrationData, AccessKey and card details through a form (PHP & JS samples) to the CardRegistrationURL (5. in the diagram)
 * 4. Get a RegistrationData back
 * 5. Edit the CardRegistration Object (POST method) with the RegistrationData just received
 * 6. Get the CardId ready to use into the Direct PayIn Object
 *
 * - If you don’t want to save the card you must change the field ACTIVE in the card object to false
 */
export class CardRegistrations {
    /**
     * Create new card registration
     * @param cardRegistration
     * @param options
     */
    create: MethodOverload<
        cardRegistration.CreateCardRegistration,
        cardRegistration.CardRegistrationData
        >;

    /**
     * Create new card registration
     * @param cardRegistrationId
     * @param options
     */
    get: MethodOverload<string, cardRegistration.CardRegistrationData>;

    /**
     * Update card registration
     * @param  cardRegistration
     */
    update: MethodOverload<
        cardRegistration.UpdateCardRegistration,
        cardRegistration.CardRegistrationData
        >;
}
