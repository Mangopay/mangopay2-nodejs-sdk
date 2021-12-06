import { transfer } from "../models/transfer";
import { refund } from "../models/refund";
import { base } from "../base";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class Transfers {
    /**
     * Create new transfer
     * @param transfer
     * @param options
     */
    create: MethodOverload<transfer.CreateTransfer, transfer.TransferData>;

    /**
     * Get transfer
     * @param transferId
     * @param options
     */
    get: MethodOverload<string, transfer.TransferData>;

    /**
     * Create refund for transfer object
     * @param transferId
     * @param refund
     * @param options
     */
    createRefund: TwoArgsMethodOverload<string,
        refund.CreateTransferRefund,
        refund.RefundData>;

    /**
     * Gets list of Refunds of a Transfer
     * @param transferId
     * @param options
     */
    getRefunds: MethodOverload<string, refund.RefundData[]>;
}
