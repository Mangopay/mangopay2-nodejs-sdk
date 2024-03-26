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
        MethodOverload<payIn.CreateDirectDebitWebPayIn, payIn.DirectDebitWebPayInData> &
        MethodOverload<payIn.CreateMbwayWebPayIn, payIn.MbwayWebPayInData> &
        MethodOverload<payIn.CreateMultibancoWebPayIn, payIn.MultibancoWebPayInData> &
        MethodOverload<payIn.CreateSatispayWebPayIn, payIn.SatispayWebPayInData> &
        MethodOverload<payIn.CreateBlikWebPayIn, payIn.BlikWebPayInData> &
        MethodOverload<payIn.CreateGooglePayDirectPayIn, payIn.GooglePayDirectPayInData> &
        MethodOverload<payIn.CreateKlarnaWebPayIn, payIn.KlarnaWebPayInData> &
        MethodOverload<payIn.CreateIdealWebPayIn, payIn.IdealWebPayInData> &
        MethodOverload<payIn.CreateGiropayWebPayIn, payIn.GiropayWebPayInData>;

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

    createCardPreAuthorizedDepositPayIn:
        MethodOverload<payIn.CreateCardPreAuthorizedDepositPayIn, payIn.CardPreAuthorizedDepositPayInData>;

    /**
     * Create new PayPal Web pay-in
     * To be used instead of the 'create' method for PayPal PayIns
     * @param payIn
     * @param options
     */
    createPayPal:
        MethodOverload<payIn.CreatePayPalWebPayIn, payIn.PayPalWebPayInData>;

    /**
     * Create new GooglePay Direct pay-in
     * To be used instead of the 'create' method for GooglePay PayIns
     * @param payIn
     * @param options
     */
    createGooglePay:
        MethodOverload<payIn.CreateGooglePayDirectPayIn, payIn.GooglePayDirectPayInData>;

    /**
     * Get Payment Method Metadata
     * The body should contain the 'Type' and: 'Bin' (if the type is BIN) or 'Token' (if the type is GOOGLE_PAY)
     */
    getPaymentMethodMetadata: MethodOverload<payIn.PaymentMethodMetadataRequest, payIn.PaymentMethodMetadata>;

    /**
     * Add tracking information to a PayPal PayIn (add the tracking number and carrier for LineItems shipments.)
     *
     * Caution – Tracking information cannot be edited
     *
     * You can’t modify the TrackingNumber, Carrier, or NotifyBuyer once added.
     *
     * You can only send a unique tracking number once.
     *
     * @param {string} payInId The ID of the PayIn
     * @param {Object}  trackingInformation    trackingInformation object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    addPayPalTrackingInformation: TwoArgsMethodOverload<string,
        payIn.PayPalWebTrackingData,
        payIn.PayPalWebPayInData>;
}
