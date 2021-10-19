import { ColumnAndDirection, Timestamp } from "./types";
import { Models } from "./models";

export namespace Base {
    interface Config {
        /**
         * API Client Id
         */
        clientId: string;

        /**
         * API Client Api Key
         */
        clientApiKey: string;

        /**
         * API Base URL.The fault base value points to sandbox.
         * Production is 'https://api.mangopay.com'
         *
         * @default "https://api.sandbox.mangopay.com"
         */
        baseUrl?: string;

        /**
         * Active debugging
         * @default false
         */
        debugMode?: boolean;

        /**
         * Log function to be used for debug
         * @default `console.log`
         */
        logClass?(...args: any[]): void;

        /**
         * Set the connection timeout limit(in milliseconds)
         * @default 30000
         */
        connectionTimeout?: number;

        /**
         * Set the response timeout limit(in milliseconds)
         * @default 80000
         */
        responseTimeout?: number;

        /**
         * API Version
         * @default 'v2.01'
         */
        apiVersion?: string;

        /**
         * Set a custom error handler
         * @default `console.error`
         */
        errorHandler?(options: any, err: any): void;
    }

    interface RequestOptions {
        requestConfig: {
            timeout: number;
        };
        responseConfig: {
            timeout: number;
        };

        /**
         * Path options are replacing the ${placeholders} from apiMethods
         */
        path: {
            clientId: string;
            apiVersion: string;
            readonly id: string;
        };
        headers: Partial<Headers>;
    }

    interface Headers {
        "Content-Type": string;
        "User-Agent": string;
        "Idempotency-Key": string;
        Authorization: string;

        [header: string]: string | undefined;
    }

    interface AuthorizationData {
        access_token: string;
        token_type: string;
        expires_in: number;
    }

    interface PaginationOptions {
        /**
         * The page number of results you wish to return
         * @default 1
         */
        Page?: number;

        /**
         * The number of results to return per page: Max 100;
         * @default 10
         */
        Per_Page?: number;
    }

    interface FilterOptions extends Record<string, any> {
        /**
         * The column to sort against and direction - only CreationDate (or Date for the events) is available and ASC or DESC for the direction
         */
        Sort?: ColumnAndDirection;

        /**
         * To return only resources that have CreationDate BEFORE this date
         */
        BeforeDate?: Timestamp;

        /**
         * To return only resources that have CreationDate AFTER this date
         */
        AfterDate?: Timestamp;
    }

    interface DependsObject {
        dependsPropertyName: string;

        propertyName: string;

        propertyValueMapping: Record<string, Models.Model>;
    }

    interface BrowserInfoData {
        AcceptHeader: string;

        JavaEnabled: boolean;

        Language: string;

        ColorDepth: number;

        ScreenHeight: number;

        ScreenWidth: number;

        JavascriptEnabled: boolean;

        TimeZoneOffset: string;

        UserAgent: string;
    }
}
