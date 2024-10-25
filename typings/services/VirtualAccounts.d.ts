import { base } from "../base";
import { virtualAccount } from "../models/virtualAccount";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;
import NoArgMethodOverload = base.NoArgMethodOverload;

export class VirtualAccounts {
    /**
     * Create new virtual account
     * @param walletId
     * @param virtualAccount
     * @param options
     */
    create: TwoArgsMethodOverload<string, virtualAccount.CreateVirtualAccount, virtualAccount.VirtualAccountData>;

    /**
     * Get a specific virtual account
     * @param walletId
     * @param virtualAccountId
     */
    get: TwoArgsMethodOverload<string, string, virtualAccount.VirtualAccountData>;

    /**
     * Get all virtual accounts
     * @param walletId
     */
    getAll: MethodOverload<string, virtualAccount.VirtualAccountData[]>;

    /**
     * Deactivate virtual account
     * @param walletId
     * @param virtualAccountId
     * @param options
     */
    deactivate: TwoArgsMethodOverload<string, string, virtualAccount.VirtualAccountData>;

    /**
     * Get virtual account availabilities
     * @param options
     */
    getAvailabilities: NoArgMethodOverload<virtualAccount.VirtualAccountAvailabilitiesData[]>;
}
