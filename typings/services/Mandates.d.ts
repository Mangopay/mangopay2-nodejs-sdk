import { mandate } from "../models/mandate";
import { transaction } from "../models/transaction";
import { base } from "../base";
import MethodOverload = base.MethodOverload;
import NoArgMethodOverload = base.NoArgMethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class Mandates {
    /**
     * Create a new Mandate
     * @param mandate
     * @param options
     */
    create: MethodOverload<mandate.CreateMandate, mandate.MandateData>;

    /**
     * Get all mandates
     * @param options
     */
    getAll: NoArgMethodOverload<mandate.MandateData[]>;

    /**
     * Get mandate by ID
     * @param mandateId
     * @param options
     */
    get: MethodOverload<string, mandate.MandateData>;

    /**
     * Cancel a mandate
     * @param mandateId
     * @param options
     */
    cancel: MethodOverload<string, mandate.MandateData>;

    /**
     * Gets user's mandates
     * @param userId
     * @param options
     */
    getMandatesForUser: MethodOverload<string, mandate.MandateData[]>;

    /**
     * Gets bank account mandates
     * @param userId
     * @param bankAccountId
     * @param options
     */
    getMandatesForBankAccount: TwoArgsMethodOverload<string,
        string,
        mandate.MandateData[]>;

    /**
     * Gets Transactions for a Mandate
     * @param mandateId
     * @param options
     */
    getTransactions: MethodOverload<string, transaction.TransactionData[]>;
}
