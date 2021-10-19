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
