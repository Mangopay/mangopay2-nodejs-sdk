import { event } from "../models/event";
import { base } from "../base";
import NoArgMethodOverload = base.NoArgMethodOverload;

export class Events {
    /**
     * Get events
     * @param options
     */
    getAll: NoArgMethodOverload<event.EventData[]>;
}
