import { card } from "../models/card";
import { transaction } from "../models/transaction";
import { cardPreAuthorization } from "../models/cardPreauthorization";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;

export class Cards {
    /**
     * Get card
     * @param cardId
     * @param ptions
     */
    get: MethodOverload<string, card.CardData>;

    /**
     * Gets a list of cards having the same fingerprint.
     * The fingerprint is a hash uniquely generated per 16-digit card number.
     *
     * @param fingerprint The fingerprint hash
     */
    getByFingerprint: MethodOverload<string, card.CardData[]>;

    /**
     * Update card (currently only supports deactivation)
     * @param card
     * @param options
     */
    update: MethodOverload<card.UpdateCard, card.CardData>;

    /**
     * Get list of Transactions of a Card
     * @param cardId
     * @param options
     */
    getTransactions: MethodOverload<string, transaction.TransactionData[]>;

    /**
     * Gets list of PreAuthorizations of a Card.
     * @param cardId
     * @param options
     */
    getPreAuthorizations: MethodOverload<string,
        cardPreAuthorization.CardPreAuthorizationData[]>;

    /**
     * Validate a card
     * @param cardId
     * @param callback
     * @param options
     * @returns {*|Promise}
     */
    validate: MethodOverload<string,
        card.CardData>;
}
