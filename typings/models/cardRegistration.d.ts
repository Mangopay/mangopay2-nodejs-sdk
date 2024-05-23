import { CurrencyISO, PickPartial, PickPartialRequired } from "../types";
import { card } from "./card";
import { entityBase } from "./entityBase";

export namespace cardRegistration {
    type UpdateCardRegistration = {
        /**
         * The unique identifier of the Card Registration object.
         */
        Id: string;

        /**
         * The string returned by the tokenization server after the Tokenize the card call is made.
         */
        RegistrationData: string;

        /**
         * The cardholder’s name shown on the payment card
         */
        CardHolderName?: string;
    }

    interface CardRegistrationData extends entityBase.EntityBaseData {
        /**
         * The object owner's UserId
         */
        UserId: string;
        /**
         * The currency - should be ISO_4217 format
         */
        Currency: CurrencyISO;

        /**
         * A special key to use when registering a card
         */
        AccessKey: string;

        /**
         * A specific value to pass to the CardRegistrationURL
         */
        PreregistrationData: string;

        /**
         * The URL to submit the card details form to
         */
        CardRegistrationURL: string;

        /**
         * Having registered a card, this confirmation hash needs to be updated to the card item
         */
        RegistrationData: string;

        /**
         * The type of card
         */
        CardType: card.CardType;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * Status of the card registration
         */
        Status: card.CardStatus;
    }

    interface CreateCardRegistration extends PickPartialRequired<CardRegistrationData,
        "CardType" | "Tag",
        "UserId" | "Currency"> {
    }
}
