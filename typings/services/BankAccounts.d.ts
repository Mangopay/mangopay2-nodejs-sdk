import { transaction } from "../models/transaction";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;

export class BankAccounts {
    /**
     * Retrieve list of transactions for a bank account
     * @param bankAccountId
     * @param options
     */
    getTransactions: MethodOverload<string, transaction.TransactionData[]>;
}
