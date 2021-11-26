import { transaction } from "../models/transaction";
import { base } from "../base";
import MethodOverload = base.MethodOverload;

export class BankAccounts {
    /**
     * Retrieve list of transactions for a bank account
     * @param bankAccountId
     * @param options
     */
    getTransactions: MethodOverload<string, transaction.TransactionData[]>;
}
