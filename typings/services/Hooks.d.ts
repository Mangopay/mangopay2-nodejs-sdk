import { hook } from "../models/hook";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;
import NoArgMethodOverload = Base.NoArgMethodOverload;

export class Hooks {
    /**
     * Create new hook
     * @param hook
     * @param options
     */
    create: MethodOverload<hook.CreateHook, hook.HookData>;

    /**
     * Get hook
     * @param hookId
     * @param options
     */
    get: MethodOverload<string, hook.HookData>;

    /**
     * Save hook
     * @param hook
     * @param options
     */
    update: MethodOverload<hook.UpdateHook, hook.HookData>;

    /**
     * Get all hooks
     * @param options
     */
    getAll: NoArgMethodOverload<hook.HookData[]>;
}
