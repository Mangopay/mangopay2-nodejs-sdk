import { event } from "./event";
import { PickPartialRequired } from "../types";
import { entityBase } from "./entityBase";

export namespace hook {
    type HookValidity = "UNKNOWN" | "VALID" | "INVALID";

    type HookStatus = "DISABLED" | "ENABLED";

    interface HookData extends entityBase.EntityBaseData {
        /**
         * This is the URL where your receive notification for each EventType
         */
        Url: string;

        /**
         * Whether the hook is enabled or not
         */
        Status: HookStatus;

        /**
         * Whether the hook is valid or not
         */
        Validity: HookValidity;

        /**
         * The event type
         */
        EventType: event.EventType;
    }

    interface CreateHook extends PickPartialRequired<HookData, "Tag", "EventType" | "Url"> {
    }

    interface UpdateHook extends PickPartialRequired<HookData,
        "EventType" | "Url" | "Tag",
        "Id"> {
    }
}
