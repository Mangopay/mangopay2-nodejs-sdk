import {card} from "../models/card";
import {transaction} from "../models/transaction";
import {cardPreAuthorization} from "../models/cardPreauthorization";
import {base} from "../base";
import {cardValidation} from "../models/cardValidation";
import {user} from "mangopay2-nodejs-sdk";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

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
     * @param cardValidation
     * @param callback
     * @param options
     * @returns {*|Promise}
     */
    validate: TwoArgsMethodOverload<
        string,
        cardValidation.CreateCardValidation,
        cardValidation.CardValidationData
    >;

    /**
     * This call returns all the transactions made with cards with the same Fingerprint value.
     *
     * @param fingerprint The fingerprint hash
     */
    listCardFingerprintTransactions: MethodOverload<string, transaction.TransactionData[]>;

    /**
     * This call returns all the users who have
     * registered the same card (based on the card’s Fingerprint).
     * This can be useful to detect abnormal or fraudulent behavior.
     *
     * @param fingerprint The fingerprint hash
     */
    listCardFingerprintUsers: MethodOverload<string, user.UserData[]>;
}
