import { Enums } from "./enums";
import { MakeKeysRequired } from "./types";
import { bankingAlias } from "./models/bankingAlias";
import { bankAccount } from "./models/bankAccount";
import { transaction } from "./models/transaction";
import { wallet } from "./models/wallet";
import { disputeDocument } from "./models/disputeDocument";
import { cardRegistration } from "./models/cardRegistration";
import { card } from "./models/card";
import { refund } from "./models/refund";
import { repudiation } from "./models/repudiation";
import { client } from "./models/client";
import { dispute } from "./models/dispute";
import { settlementTransfer } from "./models/settlementTransfer";
import { shippingAddress } from "./models/shippingAddress";
import { transfer } from "./models/transfer";
import { payOut } from "./models/payOut";
import { payIn } from "./models/payIn";
import { user } from "./models/user";
import { mandate } from "./models/mandate";
import { report } from "./models/report";
import { hook } from "./models/hook";
import { cardPreAuthorization } from "./models/cardPreauthorization";
import { uboDeclaration } from "./models/uboDeclaration";
import { kycDocument } from "./models/kycDocument";
import { address } from "./models/address";
import { entityBase } from "./models/entityBase";
import { Base } from "./base";
import { billing } from "./models/billing";
import { money } from "./models/money";

export namespace Models {
    import DependsObject = Base.DependsObject;
    import BillingData = billing.BillingData;
    import MoneyData = money.MoneyData;
    const PayInExecutionType: Enums.IPayInExecutionType;
    const PayInPaymentType: Enums.IPayInPaymentType;
    const MandateStatus: Enums.IMandateStatus;
    const LegalPersonType: Enums.ILegalPersonType;
    const PersonType: Enums.IPersonType;
    const BankAccountType: Enums.IBankAccountType;
    const DeclaredUboStatus: Enums.IDeclaredUboStatus;
    const KycDocumentStatus: Enums.IKycDocumentStatus;
    const KycDocumentType: Enums.IKycDocumentType;
    const PayOutPaymentType: Enums.IPayOutPaymentType;
    const PlatformType: Enums.IPlatformType;
    const UboDeclarationRefusedReasonType: Enums.IUboDeclarationRefusedReasonType;
    const UboDeclarationStatus: Enums.IUboDeclarationStatus;
    const UboRefusedReasonType: Enums.IUboRefusedReasonType;
    const UserNaturalCapacity: Enums.IUserNaturalCapacity;

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

    class Model<T = any> implements ModelMethods<T> {
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

    class EntityBase<T = any> extends Model<T> {
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

    interface BankAccount extends bankAccount.DataIntersection {
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

    // interface PayOut extends PayOut.PayoutData {}

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
}
