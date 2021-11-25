import { refund } from "../models/refund";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;

export class Refunds {
    /**
     * Get events
     * @param refundId
     * @param options
     */
    get: MethodOverload<string, refund.RefundData>;
}
