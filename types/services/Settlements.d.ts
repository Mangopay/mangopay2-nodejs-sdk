import {base} from "../base";
import {settlement} from "../models/settlement";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class Settlements {
    /**
     * Upload a settlement file
     * @param {Buffer} file    The settlement file to be uploaded
     * @param {Object} options Request options
     */
    upload: MethodOverload<string, settlement.SettlementData>;

    /**
     * Get a settlement
     * @param {string} settlementId
     * @param {Object} options
     */
    get: MethodOverload<string, settlement.SettlementData>;

    /**
     * Update a settlement file
     * @param {string} settlementId The settlement identifier
     * @param {Buffer} file         The settlement file to be uploaded
     * @param {Object} options      Request options
     */
    update: TwoArgsMethodOverload<string, string, settlement.SettlementData>;
}
