import { client } from "../models/client";
import { wallet } from "../models/wallet";
import { CurrencyISO } from "../types";
import { transaction } from "../models/transaction";
import { base } from "../base";
import NoArgMethodOverload = base.NoArgMethodOverload;
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class Clients {
    /**
     * Get the client
     */
    get: NoArgMethodOverload<client.ClientData>;

    /**
     * Update the client
     * @param client
     * @param options
     */
    update: MethodOverload<client.UpdateClient, client.ClientData>;

    /**
     * Upload client logo from base64 image string
     * @param base64Logo
     * @param options
     */
    uploadLogo: MethodOverload<string, client.ClientData>;

    /**
     * Upload client logo from file path
     * @param filePath
     * @param options
     */
    uploadLogoFromFile: MethodOverload<string, client.ClientData>;

    /**
     * Get all client wallets
     * @param options
     */
    getClientWallets: NoArgMethodOverload<wallet.ClientWalletData[]>;

    /**
     * Get a client wallet
     * @param fundsType
     * @param currency
     * @param options
     */
    getClientWallet: TwoArgsMethodOverload<wallet.ClientFundsType,
        CurrencyISO,
        wallet.ClientWalletData>;

    /**
     * Get client wallets by the type of funds
     * @param fundsType
     * @param options
     */
    getClientWalletsByFundsType: MethodOverload<wallet.ClientFundsType,
        wallet.ClientWalletData[]>;

    /**
     * Get a client wallet's transactions
     * @param fundsType
     * @param currency
     * @param options
     */
    getClientWalletTransactions: TwoArgsMethodOverload<wallet.ClientFundsType,
        CurrencyISO,
        transaction.TransactionData[]>;
}
