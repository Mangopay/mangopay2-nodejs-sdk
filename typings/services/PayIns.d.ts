import { payIn } from "../models/payIn";
import { refund } from "../models/refund";
import { base } from "../base";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;
import NoArgMethodOverload = base.NoArgMethodOverload;
import ThreeArgsMethodOverload = base.ThreeArgsMethodOverload;

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
        MethodOverload<payIn.CreateApplePayPayIn, payIn.ApplePayPayInData> &
        MethodOverload<payIn.CreateGooglePayDirectPayIn, payIn.GooglePayDirectPayInData> &
        MethodOverload<payIn.CreateKlarnaWebPayIn, payIn.KlarnaWebPayInData> &
        MethodOverload<payIn.CreateIdealWebPayIn, payIn.IdealWebPayInData> &
        MethodOverload<payIn.CreateGiropayWebPayIn, payIn.GiropayWebPayInData> &
        MethodOverload<payIn.CreateSwishWebPayIn, payIn.SwishWebPayInData> &
        MethodOverload<payIn.CreateTwintWebPayIn, payIn.TwintWebPayInData> &
        MethodOverload<payIn.CreateBancontactWebPayIn, payIn.BancontactWebPayInData> &
        MethodOverload<payIn.CreateBizumWebPayIn, payIn.BizumWebPayInData> &
        MethodOverload<payIn.CreatePayByBankWebPayIn, payIn.PayByBankWebPayInData>;



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
     * Create Recurring PayIn Registration
     * @param createData
     */
    createRecurringPayment: MethodOverload<payIn.CreatePayInRecurringRegistration,
        payIn.PayInRecurringRegistrationData>;

    /**
     * Create new recurring pay-in CIT
     */
    createRecurringPayInRegistrationCIT: MethodOverload<payIn.CreateRecurringPayInCIT,
        payIn.RecurringPayInData>;

    /**
     * Create new recurring pay-in MIT
     */
    createRecurringPayInRegistrationMIT: MethodOverload<payIn.CreateRecurringPayInMIT,
        payIn.RecurringPayInData>;

    /**
     * Create new Card PreAuthorized Deposit PayIn without complement
     */
    createCardPreAuthorizedDepositPayIn:
        MethodOverload<payIn.CreateCardPreAuthorizedDepositPayIn, payIn.CardPreAuthorizedDepositPayInData>;

    /**
     * Create new Card PreAuthorized Deposit PayIn prior to complement
     */
    createDepositPreauthorizedPayInPriorToComplement:
        MethodOverload<payIn.CreateCardPreAuthorizedDepositPayIn, payIn.CardPreAuthorizedDepositPayInData>;

    /**
     * Create new Card PreAuthorized Deposit PayIn complement
     */
    createDepositPreauthorizedPayInComplement:
        MethodOverload<payIn.CreateCardPreAuthorizedDepositPayIn, payIn.CardPreAuthorizedDepositPayInData>;

    createRecurringPayPalPayInCIT: MethodOverload<payIn.CreateRecurringPayPalPayInCIT,
        payIn.RecurringPayInData>;

    createRecurringPayPalPayInMIT: MethodOverload<payIn.CreateRecurringPayPalPayInMIT,
        payIn.RecurringPayInData>;

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

    /**
     * View card details for a Web Card PayIn
     * @param payInId
     * @param options
     */
    getCardWebPayInExtendedDetails: MethodOverload<string, payIn.CardWebExtendedPayInData>;

    /**
     * Create new pay-in Payconiq Web, using the latest API url (/payment-methods/payconiq)
     * @param payIn
     * @param options
     */
    createPayconiq: MethodOverload<payIn.CreatePayconiqWebPayInData, payIn.PayconiqWebPayInData>

    /**
     * Create a pay in intent authorization
     * @param {payIn.CreatePayInIntentAuthorization} payInIntentAuthorization PayInIntentAuthorization object
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    createPayInIntentAuthorization: MethodOverload<payIn.CreatePayInIntentAuthorization, payIn.PayInIntentData>

    /**
     * Create a pay in intent full capture
     * @param {string} payInIntentId PayInIntent identifier
     * @param {payIn.CreatePayInIntentFullCapture}  payInIntentFullCapture PayInIntentFullCapture object
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    createPayInIntentFullCapture: TwoArgsMethodOverload<string, payIn.CreatePayInIntentFullCapture, payIn.PayInIntentData>

    /**
     * Create a pay in intent partial capture
     * @param {string} payInIntentId PayInIntent identifier
     * @param {payIn.CreatePayInIntentPartialCapture} payInIntentPartialCapture PayInIntentPartialCapture object
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    createPayInIntentPartialCapture: TwoArgsMethodOverload<string, payIn.CreatePayInIntentPartialCapture, payIn.PayInIntentData>

    /**
     * Get a PayInIntent
     * @param {string} payInIntentId PayInIntent identifier
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    getPayInIntent: MethodOverload<string, payIn.PayInIntentData>

    // /**
    //  * Cancel a PayInIntent
    //  * @param {string}  payInIntentId    PayInIntent identifier
    //  * @param {payIn.FullCancelPayInIntent}  intentDetails  Details about the intent to be canceled
    //  * @param {Function} callback    Callback function
    //  * @param {Object} options    Request options
    //  * @return {Object}         Request promise
    //  */
    // fullCancelPayInIntent: TwoArgsMethodOverload<string, payIn.FullCancelPayInIntent, payIn.PayInIntentData>
    //
    // /**
    //  * Cancel a PayInIntent
    //  * @param {string}  payInIntentId    PayInIntent identifier
    //  * @param {payIn.PartialCancelPayInIntent}  intentDetails  Details about the intent to be canceled
    //  * @param {Function} callback    Callback function
    //  * @param {Object} options    Request options
    //  * @return {Object}         Request promise
    //  */
    // partialCancelPayInIntent: TwoArgsMethodOverload<string, payIn.PartialCancelPayInIntent, payIn.PayInIntentData>

    /**
     * Create PayInIntent splits
     * @param {string} payInIntentId  PayInIntent identifier
     * @param {payIn.CreatePayInIntentSplits} splits CreatePayInIntentSplits object
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    createPayInIntentSplits: TwoArgsMethodOverload<string, payIn.CreatePayInIntentSplits, payIn.PayInIntentSplitsData>

    /**
     * Execute split
     * @param {string} payInIntentId PayInIntent identifier
     * @param {string} splitId Split identifier
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    executePayInIntentSplit: TwoArgsMethodOverload<string, string, payIn.PayInIntentSplitData>

    /**
     * Reverse split
     * @param {string} payInIntentId PayInIntent identifier
     * @param {string} splitId Split identifier
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    reversePayInIntentSplit: TwoArgsMethodOverload<string, string, payIn.PayInIntentSplitData>

    /**
     * Get split
     * @param {string} payInIntentId PayInIntent identifier
     * @param {string} splitId Split identifier
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    getPayInIntentSplit: TwoArgsMethodOverload<string, string, payIn.PayInIntentSplitData>

    /**
     * Update split
     * @param {string} payInIntentId PayInIntent identifier
     * @param {string} splitId Split identifier
     * @param {payIn.UpdatePayInIntentSplit} Object containing the split properties to be updated
     * @param {Function} callback Callback function
     * @param {Object} options Request options
     * @return {Object} Request promise
     */
    updatePayInIntentSplit: ThreeArgsMethodOverload<string, string, payIn.UpdatePayInIntentSplit, payIn.PayInIntentSplitData>

    /**
     * Retrieve a paginated list of banks that you can present to the user for selection during their Pay by Bank checkout experience
     * Optionally filter by CountryCodes. Paginated.
     * @param {Function} callback   Callback function
     * @param {Object} options  Request options
     * @return {Object}   Request promise
     */
    getPayByBankSupportedBanks: NoArgMethodOverload<payIn.PayByBankSupportedBank>

    /**
     * Send key pre-transaction data such as order details, buyer information,
     * and merchant context before initiating a PayPal payment.
     *
     * Given that the payload can be anything, depending on what PayPal needs, there is no defined interface for it.
     *
     * @param dataCollection The data collection to be created
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    createPayPalDataCollection: MethodOverload<any, any>

    /**
     * Get a PayPal data collection.
     *
     * @param dataCollectionId Data collection identifier
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    getPayPalDataCollection: MethodOverload<string, any>
}
