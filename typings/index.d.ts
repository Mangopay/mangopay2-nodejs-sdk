// TypeScript Version: 3.0

/// <reference types="node" />

import { ApiMethod, AVSResult, DeepPartial } from "./types";
import { Base } from "./base";
import { Services } from "./services";
import { Models } from "./models";

export = MangoPay;

declare class MangoPay {
    constructor(config: Base.Config);

    config: Base.Config;
    requestOptions: Base.RequestOptions;
    Users: Services.Users;
    BankAccounts: Services.BankAccounts;
    BankingAliases: Services.BankingAliases;
    DisputeDocuments: Services.DisputeDocuments;
    Wallets: Services.Wallets;
    KycDocuments: Services.KycDocuments;
    UboDeclarations: Services.UboDeclarations;
    Cards: Services.Cards;
    CardRegistrations: Services.CardRegistrations;
    CardPreAuthorizations: Services.CardPreAuthorizations;
    PayIns: Services.PayIns;
    Transfers: Services.Transfers;
    PayOuts: Services.PayOuts;
    Refunds: Services.Refunds;
    Clients: Services.Clients;
    Disputes: Services.Disputes;
    Repudiations: Services.Repudiations;
    Events: Services.Events;
    Responses: Services.Responses;
    Mandates: Services.Mandates;
    Hooks: Services.Hooks;
    Reports: Services.Reports;

    models: typeof Models;

    Log(...args: any[]): void;

    authorize(callback: (data: Base.AuthorizationData) => void): void;

    authorize(): Promise<Base.AuthorizationData>;

    buildRequestData(entity: any): any;

    canReadSubRequestData(entity: any, propertyName: any): boolean;

    isExpired(): boolean;

    method(
        method: ApiMethod,
        callback: (...args: any[]) => void,
        options: Base.RequestOptions
    ): any;
}

declare namespace MangoPay {
    import PaginationOptions = Base.PaginationOptions;

    import FilterOptions = Base.FilterOptions;

    interface FallbackReasonData {
        Code: string;
        Message: string;
    }

    interface WithResponse<T> {
        statusCode: number;
        body: T;
        headers: Base.Headers;
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

    type WithToJson<T extends object> = T & { toJSON(): any };

    // Determines the shape of the response
    interface resolveWithFullResponse {
        resolveWithFullResponse: true;
    }

    interface MethodOptions extends DeepPartial<Base.RequestOptions> {
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
