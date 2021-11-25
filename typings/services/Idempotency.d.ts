import { Base } from "../base";
import { idempotency } from "../models/idempotency";
import MethodOverload = Base.MethodOverload;

export class Idempotency {
    get: MethodOverload<string, idempotency.IdempotencyData>;
}
