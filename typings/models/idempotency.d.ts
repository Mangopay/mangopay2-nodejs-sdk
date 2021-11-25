import { entityBase } from "./entityBase";
import { Timestamp } from "../types";

export namespace idempotency {
    interface IdempotencyData extends entityBase.EntityBaseData {
        /**
         * The status code of the API response
         */
        StatusCode: string;

        /**
         * The content length of the API response
         */
        ContentLength: string;

        /**
         * The content type of the API response
         */
        ContentType: string;

        /**
         * The long format date when the API request was received
         */
        Date: Timestamp;

        /**
         * An API resource
         */
        Resource: any;

        /**
         * The URL of the API request
         */
        RequestURL: string;
    }
}
