// TypeScript Version: 3.0

/// <reference types="node" />

import { ApiMethod } from "./types";
import { Base } from "./base";
import { Models } from "./models";
import { Users } from "./services/Users";
import { BankAccounts } from "./services/BankAccounts";
import { BankingAliases } from "./services/BankingAliases";
import { DisputeDocuments } from "./services/DisputeDocuments";
import { Wallets } from "./services/Wallets";
import { KycDocuments } from "./services/KycDocuments";
import { UboDeclarations } from "./services/UboDeclarations";
import { Cards } from "./services/Cards";
import { CardRegistrations } from "./services/CardRegistrations";
import { CardPreAuthorizations } from "./services/CardPreauthorizations";
import { PayIns } from "./services/PayIns";
import { Transfers } from "./services/Transfers";
import { PayOuts } from "./services/PayOuts";
import { Refunds } from "./services/Refunds";
import { Clients } from "./services/Clients";
import { Disputes } from "./services/Disputes";
import { Repudiations } from "./services/Repudiations";
import { Events } from "./services/Events";
import { Responses } from "./services/Responses";
import { Mandates } from "./services/Mandates";
import { Hooks } from "./services/Hooks";
import { Reports } from "./services/Reports";
import { Idempotency } from "./services/Idempotency";

export = MangoPay;

declare class MangoPay {
    constructor(config: Base.Config);

    config: Base.Config;
    requestOptions: Base.RequestOptions;
    Users: Users;
    BankAccounts: BankAccounts;
    BankingAliases: BankingAliases;
    DisputeDocuments: DisputeDocuments;
    Wallets: Wallets;
    KycDocuments: KycDocuments;
    UboDeclarations: UboDeclarations;
    Cards: Cards;
    CardRegistrations: CardRegistrations;
    CardPreAuthorizations: CardPreAuthorizations;
    PayIns: PayIns;
    Transfers: Transfers;
    PayOuts: PayOuts;
    Refunds: Refunds;
    Clients: Clients;
    Disputes: Disputes;
    Repudiations: Repudiations;
    Events: Events;
    Responses: Responses;
    Mandates: Mandates;
    Hooks: Hooks;
    Reports: Reports;
    Idempotency: Idempotency;

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
