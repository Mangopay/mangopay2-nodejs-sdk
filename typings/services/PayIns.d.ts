import { payIn } from "../models/payIn";
import { refund } from "../models/refund";
import { base } from "../base";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class PayIns {
    /**
     * Create new pay-in
     * @param payIn
     * @param options
     */
    create:
        MethodOverload<payIn.CreateCardDirectPayIn, payIn.CardDirectPayInData> &
        MethodOverload<payIn.CreateCardPreAuthorizedPayIn, payIn.CardPreAuthorizedPayInData> &
        MethodOverload<payIn.CreateCardWebPayIn, payIn.CardWebPayInData> &
        MethodOverload<payIn.CreateBankWireDirectPayIn, payIn.BankWireDirectPayInData> &
        MethodOverload<payIn.CreatePayconiqWebPayInData, payIn.PayconiqWebPayInData> &
        MethodOverload<payIn.CreateDirectDebitDirectPayIn, payIn.DirectDebitDirectPayInData> &
        MethodOverload<payIn.CreateDirectDebitWebPayIn, payIn.DirectDebitWebPayInData>;

    /**
     * Get pay-in
     * @param payInId
     * @param options
     */
    get: MethodOverload<string, payIn.PayInData>;

    /**
     * Create refund for pay-in object
     * @param payInId
     * @param refundData
     * @param options
     */
    createRefund: TwoArgsMethodOverload<string,
        refund.CreatePayInRefund,
        refund.RefundData>;

    /**
     * Gets list of Refunds for a PayIn
     * @param payInId
     * @param options
     */
    getRefunds: MethodOverload<string, refund.RefundData[]>;

    /**
     * Get Recurring PayIn
     * @param payInId
     */
    getRecurringPayin: MethodOverload<string, payIn.PayInRecurringRegistrationData>;

    /**
     * Update Recurring PayIn
     * @param payInId
     * @param updateData
     */
    updateRecurringPayin: TwoArgsMethodOverload<string,
        payIn.UpdatePayInRecurringRegistration,
        payIn.PayInRecurringRegistrationData>;

    /**
     * Create Recurring PayIn
     * @param createData
     */
    createRecurringPayment: MethodOverload<payIn.CreatePayInRecurringRegistration,
        payIn.PayInRecurringRegistrationData>;

    createRecurringPayInRegistrationCIT: MethodOverload<payIn.CreateRecurringPayInCIT,
        payIn.RecurringPayInData>;

    createRecurringPayInRegistrationMIT: MethodOverload<payIn.CreateRecurringPayInMIT,
        payIn.RecurringPayInData>;
}
