import { CountryISO, Timestamp, ValueOf } from "../types";
import { entityBase } from "./entityBase";
import { money } from "./money";
import { enums } from "../enums";
import { payIn } from "./payIn";
import { base } from "../base";
import { billing } from "./billing";
import { shipping } from "./shipping";
import { card } from "./card";

export namespace deposit {
    import MoneyData = money.MoneyData;
    import PayInPaymentType = payIn.PayInPaymentType;
    import PayInExecutionType = payIn.PayInExecutionType;
    import BrowserInfoData = base.BrowserInfoData;
    import ShippingData = shipping.ShippingData;
    import CompleteBillingData = billing.CompleteBillingData;
    import _3DSVersion = payIn._3DSVersion;
    import CardInfoData = card.CardInfoData;

    type DepositStatus = ValueOf<enums.IDepositStatus>;

    type PaymentStatus = ValueOf<enums.IPaymentStatus>;

    interface DepositData extends entityBase.EntityBaseData {
        AuthorId: string;

        DebitedFunds: MoneyData;

        Status: DepositStatus;

        PaymentStatus: PaymentStatus;

        PayinsLinked: PayinsLinkedData;

        ResultCode: string;

        ResultMessage: string;

        CardId: string;

        SecureModeReturnURL: string;

        SecureModeRedirectURL: string;

        SecureModeNeeded: boolean;

        ExpirationDate: Timestamp;

        PaymentType: PayInPaymentType;

        ExecutionType: PayInExecutionType;

        StatementDescriptor: string;

        Culture: CountryISO;

        IpAddress: string;

        BrowserInfo: BrowserInfoData;

        Billing: CompleteBillingData;

        Shipping: ShippingData;

        Requested3DSVersion: _3DSVersion;

        Applied3DSVersion: _3DSVersion;

        CardInfo: CardInfoData;
    }

    interface CreateDeposit {
        AuthorId: string;

        DebitedFunds: MoneyData;

        CardId: string;

        SecureModeReturnURL: string;

        StatementDescriptor?: string;

        Culture?: CountryISO;

        IpAddress: string;

        BrowserInfo: BrowserInfoData;

        Billing?: CompleteBillingData;

        Shipping?: ShippingData;
    }

    interface PayinsLinkedData {
        PayinCaptureId: string;
        PayinComplementId: string;
    }
}
