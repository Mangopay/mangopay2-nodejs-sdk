import { wallet } from "../models/wallet";
import { Models } from "../models";
import { transaction } from "../models/transaction";
import { base } from "../base";
import MethodOverload = base.MethodOverload;

export class Wallets {
    /**
     * Create new wallet
     * @param wallet
     * @param options
     */
    create: MethodOverload<wallet.CreateWallet | Models.Wallet,
        wallet.WalletData>;

    /**
     * Update wallet
     * @param wallet
     * @param options
     */
    update: MethodOverload<wallet.UpdateWallet | Models.Wallet,
        wallet.WalletData>;

    /**
     * Get a specific wallet
     * @param walletId
     */
    get: MethodOverload<string, wallet.WalletData>;

    /**
     * Get transactions for the wallet
     * @param walletId
     * @param options
     */
    getTransactions: MethodOverload<string, transaction.TransactionData[]>;
}
