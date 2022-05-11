import { DeepPartial, Timestamp } from "./types";
import { Models } from "./models";

export namespace base {
    type WithToJson<T extends object> = T & { toJSON(): any };

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
         * The column to sort against and direction - only CreationDate (or Date for the events) is available and ASC or DESC for the direction. E.g. "CreationDate:ASC"
         */
        Sort?: string;

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

    interface FallbackReasonData {
        Code: string;

        Message: string;
    }

    interface WithResponse<T> {
        statusCode: number;

        body: T;

        headers: Headers;
    }

    interface NoArgMethodOverload<R> {
        (options: MethodOptionWithResponse): Promise<WithResponse<R>>;

        (options?: MethodOptionWithoutResponse): Promise<R>;

        (
            callback: (data: WithResponse<R>) => void,
            options?: MethodOptionWithResponse
        ): void;

        (callback: (data: R) => void, options?: MethodOptionWithoutResponse): void;
    }

    interface MethodOverload<T, R> {
        (data: T, options: MethodOptionWithResponse): Promise<WithResponse<R>>;

        (data: T, options?: MethodOptionWithoutResponse): Promise<R>;

        (
            data: T,
            callback: (data: WithResponse<R>) => void,
            options: MethodOptionWithResponse
        ): void;

        (
            data: T,
            callback: (data: R) => void,
            options?: MethodOptionWithoutResponse
        ): void;
    }

    interface TwoArgsMethodOverload<T, U, R> {
        (data: T, extra: U, options: MethodOptionWithResponse): Promise<WithResponse<R>>;

        (data: T, extra: U, options?: MethodOptionWithoutResponse): Promise<R>;

        (
            data: T,
            extra: U,
            callback: (data: WithResponse<R>) => void,
            options?: MethodOptionWithResponse
        ): void;

        (
            data: T,
            extra: U,
            callback: (data: R) => void,
            options?: MethodOptionWithoutResponse
        ): void;
    }

    interface ThreeArgsMethodOverload<T, U, V, R> {
        (data: T, extra: U, lastArg: V, options: MethodOptionWithResponse): Promise<WithResponse<R>>;

        (
            data: T,
            extra: U,
            lastArg: V,
            options?: MethodOptionWithoutResponse
        ): Promise<R>;

        (
            data: T,
            extra: U,
            lastArg: V,
            callback: (data: WithResponse<R>) => void,
            options?: MethodOptionWithResponse
        ): void;

        (
            data: T,
            extra: U,
            lastArg: V,
            callback: (data: R) => void,
            options?: MethodOptionWithoutResponse
        ): void;
    }

    // Determines the shape of the response
    interface resolveWithFullResponse {
        resolveWithFullResponse: true;
    }

    interface MethodOptions extends DeepPartial<RequestOptions> {
        data?: WithToJson<object> | string;
        parameters?: FilterOptions & PaginationOptions;
    }

    interface MethodOptionWithResponse extends MethodOptions {
        resolveWithFullResponse: true;
    }

    interface MethodOptionWithoutResponse extends MethodOptions {
        resolveWithFullResponse?: false;
    }
}
