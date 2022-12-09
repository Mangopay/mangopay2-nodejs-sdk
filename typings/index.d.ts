// TypeScript Version: 3.0

/// <reference types="node" />

import { ApiMethod, MakeKeysRequired, Timestamp, SecureMode, CountryISO, CurrencyISO } from "./types";
import { base } from "./base";
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
import { address } from "./models/address";
import { enums } from "./enums";
import { bankingAlias } from "./models/bankingAlias";
import { bankAccount } from "./models/bankAccount";
import { transaction } from "./models/transaction";
import { wallet } from "./models/wallet";
import { disputeDocument } from "./models/disputeDocument";
import { uboDeclaration } from "./models/uboDeclaration";
import { kycDocument } from "./models/kycDocument";
import { money } from "./models/money";
import { cardRegistration } from "./models/cardRegistration";
import { card } from "./models/card";
import { cardPreAuthorization } from "./models/cardPreauthorization";
import { entityBase } from "./models/entityBase";
import { user } from "./models/user";
import { payIn } from "./models/payIn";
import { refund } from "./models/refund";
import { repudiation } from "./models/repudiation";
import { client } from "./models/client";
import { dispute } from "./models/dispute";
import { settlementTransfer } from "./models/settlementTransfer";
import { transfer } from "./models/transfer";
import { shippingAddress } from "./models/shippingAddress";
import { payOut } from "./models/payOut";
import { mandate } from "./models/mandate";
import { hook } from "./models/hook";
import { report } from "./models/report";
import { billing } from "./models/billing";
import { deposit } from "./models/deposit";
import { birthplace } from "./models/birthplace";
import { event } from "./models/event";
import { idempotency } from "./models/idempotency";
import { securityInfo } from "./models/securityInfo";
import { shipping } from "./models/shipping";
import { countryAuthorization } from "./models/countryAuthorization";
import { Regulatory } from "./services/Regulatory";
import { Deposits } from "./services/Deposits";

export = MangoPay;

declare class MangoPay {
    constructor(config: base.Config);

    config: base.Config;
    requestOptions: base.RequestOptions;
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
    Regulatory: Regulatory;
    Deposits: Deposits;

    models: typeof MangoPay.models;

    rateLimits: MangoPay.models.RateLimit[];

    Log(...args: any[]): void;

    authorize(callback: (data: base.AuthorizationData) => void): void;

    authorize(): Promise<base.AuthorizationData>;

    buildRequestData(entity: any): any;

    canReadSubRequestData(entity: any, propertyName: any): boolean;

    isExpired(): boolean;

    method(
        method: ApiMethod,
        callback: (...args: any[]) => void,
        options: base.RequestOptions
    ): any;
}

declare namespace MangoPay {
    namespace models {
        import DependsObject = base.DependsObject;
        import MoneyData = money.MoneyData;
        import BillingData = billing.BillingData;
        const PayInExecutionType: enums.IPayInExecutionType;
        const PayInPaymentType: enums.IPayInPaymentType;
        const MandateStatus: enums.IMandateStatus;
        const LegalPersonType: enums.ILegalPersonType;
        const PersonType: enums.IPersonType;
        const UserCategory: enums.IUserCategory;
        const BankAccountType: enums.IBankAccountType;
        const DeclaredUboStatus: enums.IDeclaredUboStatus;
        const KycDocumentStatus: enums.IKycDocumentStatus;
        const KycDocumentType: enums.IKycDocumentType;
        const PayOutPaymentType: enums.IPayOutPaymentType;
        const PlatformType: enums.IPlatformType;
        const UboDeclarationRefusedReasonType: enums.IUboDeclarationRefusedReasonType;
        const UboDeclarationStatus: enums.IUboDeclarationStatus;
        const UboRefusedReasonType: enums.IUboRefusedReasonType;
        const UserNaturalCapacity: enums.IUserNaturalCapacity;
        const DepositStatus: enums.IDepositStatus;
        const PaymentStatus: enums.IPaymentStatus;

        interface ModelMethods<T extends {}> {
            initialize(): void;

            /**
             * Returns object property value
             * @param attribute
             */
            getData<K extends keyof T>(attribute: K): T[K];

            /**
             * @param attribute   - attribute's value to be set or hash of properties with values
             * @param value       - value to be set
             */
            setData<K extends keyof T>(attribute: K, value: T[K]): this;

            setData(attribute: Partial<T>): this;

            getReadOnlyProperties(): Array<keyof T>;

            getDependsObjects(): DependsObject[];

            parse(): void;
        }

        class Model<T extends {} = any> implements ModelMethods<T> {
            initialize(): void;

            getData<K extends keyof T>(attribute: K): T[K];

            setData<K extends keyof T>(attribute: K, value: T[K]): this;

            setData(attribute: Partial<T>): this;

            setData(attribute: any, value?: any): this;

            getReadOnlyProperties(): Array<keyof T>;

            getDependsObjects(): DependsObject[];

            parse(): void;

            constructor(data: T);
        }

        class EntityBase<T extends {} = any> extends Model<T> {
            initialize(): void;

            /**
             * Returns object property value
             */
            getData<K extends keyof T>(attribute: K): T[K];

            /**
             * @param attribute   - attribute's value to be set or hash of properties with values
             * @param value       - value to be set
             */
            setData<K extends keyof T>(attribute: K, value: T[K]): this;

            setData(attribute: Partial<T>): this;

            getReadOnlyProperties(): Array<keyof T>;

            getDependsObjects(): DependsObject[];

            parse(): void;

            toJSON(): any;
        }

        interface RateLimit {
            minutesInterval: number;
            callsMade: number;
            callsRemaining: number;
            resetTimeMillis: number;
        }

        interface ApiError {
            Message: string;
            Type: string;
            Id: string;
            Date: number;
            errors: [string, string];
        }

        class Money extends EntityBase<MoneyData> {
            constructor(data: MoneyData);
        }

        class Billing extends EntityBase<BillingData> {
            constructor(data: BillingData);
        }

        class Address extends EntityBase<address.AddressData> {
            constructor(data: Partial<address.AddressData>);
        }

        interface Address extends address.AddressData {
        }

        class BankingAlias extends EntityBase<bankingAlias.IBANBankingAliasData> {
            constructor(data: Partial<bankingAlias.BankingAliasData>);
        }

        class BankingAliasIBAN extends BankingAlias {
        }

        interface BankingAlias extends bankingAlias.IBANBankingAliasData {
        }

        class BankAccount extends EntityBase<bankAccount.BaseData> {
            constructor(data: bankAccount.CreationDetails);
        }

        interface BankAccount extends bankAccount.BaseData {
        }

        class BankAccountDetails {
            constructor(data: any);
        }

        class BankAccountDetailsCA extends BankAccountDetails {
            constructor(data: any);
        }

        interface BankAccountDetailsCA extends bankAccount.CADetails {
        }

        class BankAccountDetailsOther extends BankAccountDetails {
            constructor(data: any);
        }

        interface BankAccountDetailsOther extends bankAccount.OtherDetails {
        }

        class BankAccountDetailsGB extends BankAccountDetails {
            constructor(data: any);
        }

        interface BankAccountDetailsGB extends bankAccount.GBDetails {
        }

        class BankAccountDetailsIBAN extends BankAccountDetails {
            constructor(data: any);
        }

        interface BankAccountDetailsIBAN extends bankAccount.IBANDetails {
        }

        class BankAccountDetailsUS extends BankAccountDetails {
            constructor(data: any);
        }

        interface BankAccountDetailsUS extends bankAccount.USDetails {
        }

        class Transaction extends EntityBase<transaction.TransactionData> {
            constructor(data: transaction.TransactionData);
        }

        interface Transaction extends transaction.TransactionData {
        }

        class ClientWallet extends EntityBase<wallet.WalletData> {
        }

        class Wallet extends EntityBase<wallet.WalletData> {
            constructor(data: wallet.CreateWallet | wallet.UpdateWallet);
        }

        class DocumentPageConsult extends Model {
            constructor(data: Partial<disputeDocument.DocumentPageConsult>);
        }

        interface DocumentPageConsult extends disputeDocument.DocumentPageConsult {
        }

        class Document extends EntityBase {
            constructor(data: any);
        }

        class DisputeDocument extends Document {
        }

        interface DisputeDocument extends disputeDocument.DisputeDocumentData {
        }

        class DisputeDocumentPage extends EntityBase {
            constructor(data: disputeDocument.CreateDisputeDocumentPage);
        }

        interface DisputeDocumentPage
            extends disputeDocument.CreateDisputeDocumentPage {
        }

        class DeclaredUbo extends Model<uboDeclaration.UboDeclarationData> {
            constructor(data: Partial<uboDeclaration.UboDeclarationData>);
        }

        class KycDocument extends EntityBase<kycDocument.KycDocumentData> {
            constructor(data: Partial<kycDocument.KycDocumentData>);
        }

        interface KycDocument extends kycDocument.KycDocumentData {
        }

        class KycPage {
            constructor(data: kycDocument.CreateKycPage);
        }

        interface KycPage extends kycDocument.CreateKycPage {
        }

        class EMoney {
            constructor(data: money.EMoneyData);
        }

        interface EMoney extends money.EMoneyData {
        }

        class UboDeclaration extends EntityBase<uboDeclaration.UboDeclarationData> {
            constructor(
                data: uboDeclaration.UboDeclarationData
            );
        }

        interface UboDeclaration extends uboDeclaration.UboDeclarationData {
        }

        class Ubo extends EntityBase<uboDeclaration.UboData> {
            constructor(
                data: uboDeclaration.UboData
            )
        }

        interface Ubo extends uboDeclaration.UboData {
        }

        class CardRegistration extends EntityBase<cardRegistration.CardRegistrationData> {
            constructor(
                data:
                    | cardRegistration.CreateCardRegistration
                    | cardRegistration.UpdateCardRegistration
            );
        }

        interface CardRegistration extends cardRegistration.CardRegistrationData {
        }

        class Card extends EntityBase<card.CardData> {
            constructor(data: card.CardData);
        }

        interface Card extends card.CardData {
        }

        class CardPreAuthorization {
            constructor(
                data:
                    | cardPreAuthorization.CardPreAuthorizationData
                    | cardPreAuthorization.UpdateCardPreAuthorization
            );
        }

        interface CardPreAuthorization
            extends cardPreAuthorization.CardPreAuthorizationData {
        }

        class SecurityInfo extends EntityBase<SecurityInfo & entityBase.EntityBaseData> {
            constructor(data: SecurityInfo);
        }

        class UserLegal extends EntityBase<user.UserLegalData> {
            PersonType: "LEGAL";

            constructor(
                data: MakeKeysRequired<Partial<user.UserLegalData>,
                    user.RequiredUserLegalData>
            );

            /**
             * Sets the person type for the model
             * @param personType
             */
            setPersonType(type: user.PersonType): void;
        }

        interface UserLegal extends user.UserLegalData {
        }

        class UserNatural extends EntityBase<user.UserNaturalData> {
            PersonType: "NATURAL";

            constructor(
                data: MakeKeysRequired<Partial<user.UserNaturalData>,
                    user.RequiredUserNaturalData>
            );

            /**
             * Sets the person type for the model
             * @param personType
             */
            setPersonType(type: user.PersonType): void;
        }

        interface UserNatural extends user.UserNaturalData {
        }

        class UserNaturalPayer extends EntityBase<user.UserNaturalData> {
            PersonType: "NATURAL";
            UserCategory: "PAYER";

            constructor(
                data: MakeKeysRequired<Partial<user.UserNaturalData>,
                    user.RequiredUserNaturalPayerData>
            );

            /**
             * Sets the person type for the model
             * @param personType
             */
            setPersonType(type: user.PersonType): void;

            setUserCategory(category: user.UserCategory): void;
        }

        interface UserNaturalPayer extends user.UserNaturalData {
        }

        class UserNaturalOwner extends EntityBase<user.UserNaturalData> {
            PersonType: "NATURAL";
            UserCategory: "OWNER";

            constructor(
                data: MakeKeysRequired<Partial<user.UserNaturalData>,
                    user.RequiredUserNaturalOwnerData>
            );

            /**
             * Sets the person type for the model
             * @param personType
             */
            setPersonType(type: user.PersonType): void;

            setUserCategory(category: user.UserCategory): void;
        }

        interface UserNaturalOwner extends user.UserNaturalData {
        }

        class UserLegalPayer extends EntityBase<user.UserLegalData> {
            PersonType: "LEGAL";
            UserCategory: "PAYER";

            constructor(
                data: MakeKeysRequired<Partial<user.UserLegalData>,
                    user.RequiredUserLegalPayerData>
            );

            /**
             * Sets the person type for the model
             * @param personType
             */
            setPersonType(type: user.PersonType): void;

            setUserCategory(category: user.UserCategory): void;
        }

        interface UserLegalPayer extends user.UserLegalData {
        }

        class UserLegalOwner extends EntityBase<user.UserLegalData> {
            PersonType: "LEGAL";
            UserCategory: "OWNER";

            constructor(
                data: MakeKeysRequired<Partial<user.UserLegalData>,
                    user.RequiredUserLegalOwnerData>
            );

            /**
             * Sets the person type for the model
             * @param personType
             */
            setPersonType(type: user.PersonType): void;

            setUserCategory(category: user.UserCategory): void;
        }

        interface UserLegalOwner extends user.UserLegalData {
        }

        class User extends EntityBase<user.UserData> {
            constructor(data: user.UserData);

            /**
             * Sets the person type for the model
             * @param personType
             */
            setPersonType(type: user.PersonType): void;
        }

        interface User extends user.UserData {
        }

        class PayIn extends EntityBase<payIn.BasePayInData> {
            constructor(data: any);
        }

        interface PayIn extends payIn.BasePayInData {
        }

        class PayInPaymentDetails extends EntityBase {
            constructor(data: any);
        }

        class PayInExecutionDetails extends EntityBase {
            constructor(data: any);
        }

        class PayInExecutionDetailsDirect extends PayInExecutionDetails {
            constructor(data: any);
        }

        class PayInExecutionDetailsWeb extends PayInExecutionDetails {
            constructor(data: any);
        }

        class PayInExecutionDetailsBankingAlias extends PayInExecutionDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsBankWire extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsBankingAlias extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsCard extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsPayconiq extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsCardDirect extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsCardWeb extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsDirectDebitDirect extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsDirectDebitWeb extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsPayPal extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsApplePay extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsGooglePay extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInPaymentDetailsPreAuthorized extends PayInPaymentDetails {
            constructor(data: any);
        }

        class PayInTemplateURLOptions extends EntityBase {
            constructor(data: any);
        }

        class Refund extends EntityBase<refund.RefundData> {
            constructor(data: refund.CreatePayInRefund | refund.CreateTransferRefund);
        }

        class RefundReasonDetails extends EntityBase {
            constructor(data: any);
        }

        class Repudiation extends EntityBase<repudiation.RepudiationData> {
            constructor(data: Partial<repudiation.RepudiationData>);
        }

        interface Repudiation extends repudiation.RepudiationData {
        }

        class Client extends EntityBase<client.ClientData> {
            constructor(data?: Partial<client.ClientData>);
        }

        interface Client extends client.ClientData {
        }

        class PlatformCategorization extends EntityBase<client.PlatformCategorization> {
            constructor(data: client.PlatformCategorization);
        }

        class Dispute extends EntityBase<dispute.DisputeData> {
            constructor(data: Partial<dispute.DisputeData>);
        }

        interface Dispute extends dispute.DisputeData {
        }

        class DisputeReason extends Model {
            constructor(data: any);
        }

        class SettlementTransfer extends EntityBase<settlementTransfer.SettlementTransferData> {
            constructor(data: Partial<settlementTransfer.SettlementTransferData>);
        }

        interface SettlementTransfer
            extends settlementTransfer.SettlementTransferData {
        }

        class Transfer extends EntityBase<transfer.TransferData> {
            constructor(data: Partial<transfer.CreateTransfer>);
        }

        interface Transfer extends transfer.TransferData {
        }

        class ShippingAddress extends EntityBase<shippingAddress.ShippingAddressData> {
            constructor(data: Partial<shippingAddress.ShippingAddressData>);
        }

        interface ShippingAddress extends shippingAddress.ShippingAddressData {
        }

        class PayOut extends EntityBase<payOut.PayOutData> {
            constructor(data: Partial<payOut.CreatePayOut>);
        }

        class PayOutPaymentDetails extends EntityBase {
            constructor(data?: any);
        }

        class PayOutPaymentDetailsBankWire extends PayOutPaymentDetails {
            constructor(data?: any);
        }

        class Mandate extends EntityBase<mandate.MandateData> {
            constructor(data?: Partial<mandate.MandateData>);
        }

        interface Mandate extends mandate.MandateData {
        }

        class Hook extends EntityBase<hook.HookData> {
            constructor(data?: Partial<hook.HookData>);
        }

        interface Hook extends hook.HookData {
        }

        class Report extends EntityBase<report.ReportData> {
            constructor(data?: Partial<report.ReportData>);
        }

        interface Report extends report.ReportData {
        }

        class ReportFilter extends Model<report.Filters> {
            constructor(data?: Partial<report.Filters>);
        }

        interface Report extends report.Filters {
        }

        class DebitedBankAccount extends EntityBase<bankAccount.DebitedBankAccountData> {
            constructor(data: bankAccount.DebitedBankAccountData);
        }

        interface DebitedBankAccount extends bankAccount.DebitedBankAccountData {
        }

        class CountryAuthorization extends EntityBase<countryAuthorization.CountryAuthorizationData> {
            constructor(data?: Partial<countryAuthorization.CountryAuthorizationData>);
        }

        interface CountryAuthorization extends countryAuthorization.CountryAuthorizationData {
        }

        class Deposit extends EntityBase<deposit.DepositData> {
            constructor(data?: Partial<deposit.CreateDeposit>);
        }

        interface Deposit extends deposit.DepositData {
        }
    }

    export {
        models,
        base,
        address,
        bankAccount,
        bankingAlias,
        billing,
        birthplace,
        card,
        cardPreAuthorization,
        cardRegistration,
        client,
        dispute,
        disputeDocument,
        entityBase,
        event,
        hook,
        idempotency,
        kycDocument,
        mandate,
        money,
        payIn,
        payOut,
        refund,
        report,
        repudiation,
        securityInfo,
        settlementTransfer,
        shipping,
        shippingAddress,
        transaction,
        transfer,
        uboDeclaration,
        user,
        wallet,
        Timestamp,
        SecureMode,
        enums,
        CountryISO,
        CurrencyISO,
        countryAuthorization,
        deposit
    };
}
