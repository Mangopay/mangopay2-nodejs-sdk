import { refund } from "../models/refund";
import { base } from "../base";
import MethodOverload = base.MethodOverload;

export class Refunds {
    /**
     * Get events
     * @param refundId
     * @param options
     */
    get: MethodOverload<string, refund.RefundData>;
}
