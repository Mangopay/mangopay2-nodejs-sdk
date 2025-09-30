import { bankingAlias } from "../models/bankingAlias";
import { Omit } from "../types";
import { base } from "../base";
import MethodOverload = base.MethodOverload;
import NoArgMethodOverload = base.NoArgMethodOverload;

export class BankingAliases {
    /**
     * Create a banking alias
     * @param bankingAlias
     * @param options
     */
    create: MethodOverload<bankingAlias.CreateIBANBankingAlias,
        bankingAlias.IBANBankingAliasData>;

    /**
     * Get a banking alias
     * @param bankingAliasId
     * @param options
     */
    get: MethodOverload<string, bankingAlias.IBANBankingAliasData>;

    /**
     * Get all banking aliases
     * @param walletId
     * @param options
     */
    getAll: MethodOverload<string, bankingAlias.IBANBankingAliasData[]>;

    /**
     * Update banking alias
     * @param bankingAliasId
     * @param options
     */
    update: MethodOverload<bankingAlias.UpdateIBANBankingAlias,
        bankingAlias.IBANBankingAliasData>;

    /**
     * Deactivate banking alias
     * @param bankingAliasId
     * @param options
     */
    deactivate: MethodOverload<string, bankingAlias.IBANBankingAliasData>;

    /**
     * Activate banking alias
     * @param bankingAliasId
     * @param options
     */
    activate: MethodOverload<string, bankingAlias.IBANBankingAliasData>;
}
