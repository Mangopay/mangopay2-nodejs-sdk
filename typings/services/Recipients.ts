import { base } from "../base";
import { recipient } from "../models/recipient";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;
import ThreeArgsMethodOverload = base.ThreeArgsMethodOverload;

export class Recipients {
    /**
     * Create a Recipient
     * @param recipient
     * @param userId
     */
    create: TwoArgsMethodOverload<recipient.CreateRecipientData, string, recipient.RecipientData>;

    /**
     * Get a Recipient
     * @param recipientId
     */
    get: MethodOverload<string, recipient.RecipientData>;

    /**
     * Get all Recipients for a user
     * @param userId
     */
    getUserRecipients: MethodOverload<string, recipient.RecipientData[]>;

    /**
     * Get a Recipient schema
     * @param payoutMethodType
     * @param recipientType
     * @param currency
     */
    getSchema: ThreeArgsMethodOverload<string, string, string, recipient.RecipientSchemaData>;

    /**
     * Get a Payment Methods
     * @param country
     * @param currency
     */
    getPayoutMethods: TwoArgsMethodOverload<string, string, recipient.PayoutMethodData>;

    /**
     * Validates a Recipient
     * @param recipient
     * @param userId
     */
    validate: TwoArgsMethodOverload<recipient.CreateRecipientData, string, void>;

    /**
     * Deactivates a Recipient
     * @param recipientId
     */
    deactivate: MethodOverload<string, recipient.RecipientData>;
}
