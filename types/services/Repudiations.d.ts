import { refund } from "../models/refund";
import { base } from "../base";
import MethodOverload = base.MethodOverload;

export class Repudiations {
    /**
     * Gets list of Refunds of a Repudiation
     * @param repudiationId
     * @param options
     */
    getRefunds: MethodOverload<string, refund.RefundData[]>;
}
