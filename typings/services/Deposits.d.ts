import { base } from "../base";
import { deposit } from "../models/deposit";
import MethodOverload = base.MethodOverload;

export class Deposits {
    create: MethodOverload<deposit.CreateDeposit, deposit.DepositData>;

    get: MethodOverload<string, deposit.DepositData>;

    cancel: MethodOverload<string, deposit.DepositData>;
}
