import { event } from "../models/event";
import { Base } from "../base";
import NoArgMethodOverload = Base.NoArgMethodOverload;

export class Events {
    /**
     * Get events
     * @param options
     */
    getAll: NoArgMethodOverload<event.EventData[]>;
}
