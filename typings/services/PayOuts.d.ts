import { payOut } from "../models/payOut";
import { refund } from "../models/refund";
import { base } from "../base";
import MethodOverload = base.MethodOverload;

export class PayOuts {
    /**
     * Create new pay-out
     * @param payOut
     * @param options
     */
    create: MethodOverload<payOut.CreatePayOut, payOut.PayOutData>;

    /**
     * Get payout
     * @param payOutId
     * @param options
     */
    get: MethodOverload<string, payOut.PayOutData>;

    /**
     * Gets list of Refunds of a PayOut
     * @param payOutId
     * @param options
     */
    getRefunds: MethodOverload<string, refund.RefundData[]>;
}
