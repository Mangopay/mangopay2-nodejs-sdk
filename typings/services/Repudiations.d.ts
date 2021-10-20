import { refund } from "../models/refund";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;

export class Repudiations {
    /**
     * Gets list of Refunds of a Repudiation
     * @param repudiationId
     * @param options
     */
    getRefunds: MethodOverload<string, refund.RefundData[]>;
}
