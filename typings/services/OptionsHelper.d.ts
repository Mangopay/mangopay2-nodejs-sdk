import { base } from "../base";
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class OptionsHelper {
    /**
     * Adds Idempotency-Key headers to the provided 'options' parameter
     * @param options
     * @param idempotencyKey
     */
    withIdempotency: TwoArgsMethodOverload<base.MethodOptions, string, base.MethodOptions>
}