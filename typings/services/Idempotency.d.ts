import { base } from "../base";
import { idempotency } from "../models/idempotency";
import MethodOverload = base.MethodOverload;

export class Idempotency {
    get: MethodOverload<string, idempotency.IdempotencyData>;
}
