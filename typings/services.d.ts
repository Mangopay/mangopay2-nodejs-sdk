import {
    MethodOverload,
    NoArgMethodOverload,
    ThreeArgsMethodOverload,
    TwoArgsMethodOverload
} from "./index";
import { CurrencyISO, Omit } from "./types";
import { Models } from "./models";
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
import { event } from "./models/event";
import { dispute } from "./models/dispute";
import { settlementTransfer } from "./models/settlementTransfer";
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
import { money } from "./models/money";

export namespace Services {
    import MoneyData = money.MoneyData;

    class Users {
        /**
         * Create a new user
         * @param user
         */
        create: MethodOverload<user.CreateUserLegalData, user.UserLegalData> &
            MethodOverload<user.CreateUserNaturalData, user.UserNaturalData>;

        /**
         * Update a user
         * @param user
         * @param options
         */
        update: MethodOverload<
            Models.UserLegal | user.UpdateUserLegalData,
            user.UserLegalData
            > &
            MethodOverload<
                Models.UserNatural | user.UpdateUserNaturalData,
                user.UserNaturalData
                >;

        /**
         * Get natural or legal user by ID
         * @param userId
         * @param options
         */
        get: MethodOverload<string, user.UserLegalData | user.UserNaturalData>;

        /**
         * Get natural user by ID
         * @param userId
         * @param options
         */
        getNatural: MethodOverload<string, user.UserNaturalData>;

        /**
         * Get legal user by ID
         * @param userId
         * @param options
         */
        getLegal: MethodOverload<string, user.UserLegalData>;

        /**
         * Get all users
         */
        getAll: NoArgMethodOverload<
            Array<user.UserLegalData | user.UserNaturalData>
            >;

        /**
         * Create bank account for user
         * @param userId
         * @param bankAccount
         * @param options
         */
        createBankAccount: TwoArgsMethodOverload<
            string,
            bankAccount.USDetails,
            bankAccount.USData
            > &
            TwoArgsMethodOverload<
                string,
                bankAccount.OtherDetails,
                bankAccount.OtherData
                > &
            TwoArgsMethodOverload<
                string,
                bankAccount.IBANDetails,
                bankAccount.IBANData
                > &
            TwoArgsMethodOverload<string, bankAccount.GBDetails, bankAccount.GBData> &
            TwoArgsMethodOverload<string, bankAccount.CADetails, bankAccount.CAData>;

        /**
         * Deactivate a bank account
         *
         * Note that once deactivated, a bank account can't be reactivated afterwards
         * @param userId
         * @param bankAccountId
         * @param options
         */
        deactivateBankAccount: TwoArgsMethodOverload<string, string, bankAccount.Data>;

        /**
         * Get all bank accounts for user
         * @param userId
         * @param options
         */
        getBankAccounts: MethodOverload<string, bankAccount.Data[]>;

        /**
         * Get all bank accounts for user
         * @param userId
         * @param bankAccountId
         * @param options
         */
        getBankAccount: TwoArgsMethodOverload<string, string, bankAccount.Data>;

        /**
         * Get all wallets accounts for user
         */
        getWallets: MethodOverload<string, wallet.WalletData[]>;

        /**
         * Get all transactions for user
         * @param userId
         * @param options
         */
        getTransactions: MethodOverload<string, transaction.TransactionData[]>;

        /**
         * Get all cards for user
         * @param userId
         * @param options
         */
        getCards: MethodOverload<string, card.CardData[]>;

        /**
         * Create new KYC document
         * @param  userId
         * @param  kycDocument
         * @param  options
         */
        createKycDocument: TwoArgsMethodOverload<
            string,
            kycDocument.CreateKycDocument,
            kycDocument.KycDocumentData
            >;

        /**
         * Get all KYC documents for user
         * @param userId
         * @param options
         */
        getKycDocuments: MethodOverload<string, kycDocument.KycDocumentData[]>;

        /**
         * Get KYC document
         * @param userId
         * @param kycDocumentId
         * @param options
         */
        getKycDocument: TwoArgsMethodOverload<
            string,
            string,
            kycDocument.KycDocumentData
            >;

        /**
         * Update status of KYC Document (Currently only allows for submitting the document)
         * @param userId
         * @param kycDocument
         * @param options
         */
        updateKycDocument: TwoArgsMethodOverload<
            string,
            kycDocument.SubmitKycDocument,
            kycDocument.KycDocumentData
            >;

        /**
         * Create page for KYC document
         * @param userId
         * @param kycDocumentId
         * @param kycPage
         * @param options
         */
        createKycPage: ThreeArgsMethodOverload<
            string,
            string,
            kycDocument.CreateKycPage,
            kycDocument.KycDocumentData
            >;

        /**
         * Create page for KYC document
         * @param userId
         * @param kycDocumentId
         * @param filePath
         * @param options
         */
        createKycPageFromFile: ThreeArgsMethodOverload<
            string,
            string,
            string,
            kycDocument.KycDocumentData
            >;

        /**
         * Get users's EMoney
         * @param userId
         * @param options
         */
        getEMoney: MethodOverload<string, money.EMoneyData>;

        // /**
        //  * Create an UboDeclaration for the user
        //  * @param userId
        //  * @param uboDeclaration
        //  * @param options
        //  */
        // createUboDeclaration: TwoArgsMethodOverload<
        //   string,
        //   uboDeclaration.CreateUboDeclaration,
        //   uboDeclaration.UboDeclarationData
        // >;

        /**
         * Get all user preauthorizations
         * @param userId
         * @param options
         */
        getPreAuthorizations: MethodOverload<
            string,
            cardPreAuthorization.CardPreAuthorizationData[]
            >;
    }

    class BankAccounts {
        /**
         * Retrieve list of transactions for a bank account
         * @param bankAccountId
         * @param options
         */
        getTransactions: MethodOverload<string, transaction.TransactionData[]>;
    }

    class BankingAliases {
        /**
         * Create a banking alias
         * @param bankingAlias
         * @param options
         */
        create: MethodOverload<
            bankingAlias.CreateIBANBankingAlias,
            bankingAlias.IBANBankingAliasData
            >;

        /**
         * Get a banking alias
         * @param bankingAliasId
         * @param options
         */
        get: MethodOverload<string, bankingAlias.IBANBankingAliasData>;

        /**
         * Get all banking aliases
         * @param options
         */
        getAll: NoArgMethodOverload<bankingAlias.IBANBankingAliasData[]>;

        /**
         * Update banking alias
         * @param bankingAliasId
         * @param options
         */
        update: MethodOverload<
            Partial<Omit<bankingAlias.CreateIBANBankingAlias, "CreditedUserId">>,
            bankingAlias.IBANBankingAliasData
            >;

        /**
         * Deactivate banking alias
         * @param bankingAliasId
         * @param options
         */
        deactivate: MethodOverload<string, bankingAlias.IBANBankingAliasData>;

        /**
         * Activate banking alias
         * @param bankingAliasId
         * @param options
         */
        activate: MethodOverload<string, bankingAlias.IBANBankingAliasData>;
    }

    class DisputeDocuments {
        /**
         * Get all KycDocuments
         * @param options
         */
        getAll: NoArgMethodOverload<disputeDocument.DisputeDocumentData[]>;

        /**
         * Get KycDocument
         * @param documentId
         * @param options
         */
        get: MethodOverload<string, disputeDocument.DisputeDocumentData>;

        /**
         * Creates temporary URLs where each page of a KYC document can be viewed.
         * @param documentId
         */
        createDisputeDocumentConsult: MethodOverload<
            string,
            any // Unsure of data structure from docs
            >;
    }

    class Wallets {
        /**
         * Create new wallet
         * @param wallet
         * @param options
         */
        create: MethodOverload<
            wallet.CreateWallet | Models.Wallet,
            wallet.WalletData
            >;

        /**
         * Update wallet
         * @param wallet
         * @param options
         */
        update: MethodOverload<
            wallet.UpdateWallet | Models.Wallet,
            wallet.WalletData
            >;

        /**
         * Get a specific wallet
         * @param walletId
         */
        get: MethodOverload<string, wallet.WalletData>;

        /**
         * Get transactions for the wallet
         * @param walletId
         * @param options
         */
        getTransactions: MethodOverload<string, transaction.TransactionData[]>;
    }

    /**
     * You need to create document in order to upload pages on this document.
     *
     * 1. The KYC Document Object is a request to validate a required document. There is one request for one Type of document
     * 2. Upload a file through a Page. A document should get several pages
     * 3. Edit the object Document and set the Status field to "VALIDATION_ASKED" (instead of "CREATED")
     * 4. The demand is received by our team. The object is waiting for a "VALIDATED" status
     *
     * Note that you are not allowed to store KYC documents on your side unless you have permission from the appropriate authorities in your country
     */
    class KycDocuments {
        /**
         * Get all KycDocuments
         * @param options
         */
        getAll: NoArgMethodOverload<kycDocument.KycDocumentData[]>;

        /**
         * Get KycDocument
         * @param kycDocumentId
         * @param options
         */
        get: MethodOverload<string, kycDocument.KycDocumentData>;

        /**
         * Creates temporary URLs where each page of a KYC document can be viewed.
         * @param documentId
         */
        createKycDocumentConsult: MethodOverload<
            string,
            any // Unsure of data structure from docs
            >;
    }

    /**
     * An UBO Declaration is an electronic version of the previous KYC document "Shareholder Declaration", in order to declare all the Ultimate Beneficial Owners of a BUSINESS-typed legal User
     * (ie the shareholders with >25% of capital or voting rights).
     *
     * 1. Create each Ultimate Beneficial Owner as a Natural User, who must have a "DECLARATIVE" Capacity.
     * 2. Create a new UBO Declaration for your legal user, and link every Ultimate Beneficial Owners created previously thanks to DeclaredUBOs.
     *  - This list can be empty if your legal user has no Ultimate Beneficial Owner, or no eligible one (ie. no Ultimate Beneficial Owner that owns more than 25% of this company).
     * 3. Edit the UBODeclaration object and set the Status field to "VALIDATION_ASKED" (instead of "CREATED")
     * 4. The demand is received by our team and once processed, it will either get a "VALIDATED" status, or "REFUSED" with more information provided in the RefusedReasonTypes parameter
     *
     * Note that UBO declarations are not yet a requirement for your user to be KYC verified and are optional at this stage
     */
    class UboDeclarations {
        /**
         * Retrieves a UBO declaration object from the API.
         * @param {String} userId User Unique identifier
         * @param {String} id Unique identifier
         * @param {Object} options
         */
        get: TwoArgsMethodOverload<string, string, uboDeclaration.UboDeclarationData>;

        /**
         * Retrieves a UBO declaration object from the API.
         * @param {String} id Unique identifier
         * @param {Object} options
         */
        getById: MethodOverload<string, uboDeclaration.UboDeclarationData>;

        /**
         * Updates a UBO declaration entity.
         * @param {String} userId User Unique Identifier
         * @param {Object} uboDeclaration Updated UBO declaration entity - must have ID!
         * @param {Object} options
         */
        update: TwoArgsMethodOverload<
            string,
            uboDeclaration.UpdateUboDeclaration,
            uboDeclaration.UboDeclarationData
            >;

        /**
         * Create a UBO declaration object from the API
         * @param {String} userId user Unique identifier
         * @param {Object} options
         */
        create: MethodOverload<string, uboDeclaration.UboDeclarationData>;

        /**
         * @param {String} userId user Uniquer identifier
         */
        getAll: MethodOverload<string, uboDeclaration.UboDeclarationData[]>;

        /**
         * @param {String} userId User Uniquer identifier
         * @param {String} uboDeclarationId UboDeclaration Uniquer identifier
         * @param {Object} Ubo object
         */
        createUbo: ThreeArgsMethodOverload<string, string, uboDeclaration.CreateUbo, uboDeclaration.UboData>;

        /**
         * @param {String} userId User Uniquer identifier
         * @param {String} uboDeclarationId UboDeclaration Uniquer identifier
         * @param {String} uboId Ubo Uniquer identifier
         */
        getUbo: ThreeArgsMethodOverload<string, string, string, uboDeclaration.UboData>;

        /**
         * @param {String} userId User Uniquer identifier
         * @param {String} uboDeclarationId UboDeclaration Uniquer identifier
         * @param {Object} Ubo object
         */
        updateUbo: ThreeArgsMethodOverload<string, string, uboDeclaration.CreateUbo, uboDeclaration.UboData>;
    }

    class Cards {
        /**
         * Get card
         * @param cardId
         * @param ptions
         */
        get: MethodOverload<string, card.CardData>;

        /**
         * Gets a list of cards having the same fingerprint.
         * The fingerprint is a hash uniquely generated per 16-digit card number.
         *
         * @param fingerprint The fingerprint hash
         */
        getByFingerprint: MethodOverload<string, card.CardData[]>;

        /**
         * Update card (currently only supports deactivation)
         * @param card
         * @param options
         */
        update: MethodOverload<card.UpdateCard, card.CardData>;

        /**
         * Get list of Transactions of a Card
         * @param cardId
         * @param options
         */
        getTransactions: MethodOverload<string, transaction.TransactionData[]>;

        /**
         * Gets list of PreAuthorizations of a Card.
         * @param cardId
         * @param options
         */
        getPreAuthorizations: MethodOverload<
            string,
            cardPreAuthorization.CardPreAuthorizationData[]
            >;
    }

    /**
     * You need to register a card in order to process a Direct PayIn. Card registration enables you to tokenize a Card. These are the steps to follow:
     *
     * 1. Create a CardRegistration Object
     * 2. Get a PreRegistrationData
     * 3. The user posts PreRegistrationData, AccessKey and card details through a form (PHP & JS samples) to the CardRegistrationURL (5. in the diagram)
     * 4. Get a RegistrationData back
     * 5. Edit the CardRegistration Object (POST method) with the RegistrationData just received
     * 6. Get the CardId ready to use into the Direct PayIn Object
     *
     * - If you don’t want to save the card you must change the field ACTIVE in the card object to false
     */
    class CardRegistrations {
        /**
         * Create new card registration
         * @param cardRegistration
         * @param options
         */
        create: MethodOverload<
            cardRegistration.CreateCardRegistration,
            cardRegistration.CardRegistrationData
            >;

        /**
         * Create new card registration
         * @param cardRegistrationId
         * @param options
         */
        get: MethodOverload<string, cardRegistration.CardRegistrationData>;

        /**
         * Update card registration
         * @param  cardRegistration
         */
        update: MethodOverload<
            cardRegistration.UpdateCardRegistration,
            cardRegistration.CardRegistrationData
            >;
    }

    /**
     * The PreAuthorization Object ensures the solvency of a registered card for 7 days. The overall process is as follows:
     *
     * 1. Register a card (CardRegistration)
     * 2. Create a PreAuthorization with the CardId. This allows you to charge an amount on a card
     * 3. Charge the card through the PreAuthorized PayIn object (Payins/preauthorized/direct)
     *
     * How does PreAuthorization work?
     * - Once the PreAuthorization object is created the Status is "CREATED" until 3D secure validation.
     * - If the authorization is successful the status is "SUCCEEDED" if it failed the status is "FAILED".
     * - Once Status = "SUCCEEDED" and PaymentStatus = "WAITING" you can charge the card.
     * - The Pay-In amount has to be less than or equal to the amount authorized.
     */
    class CardPreAuthorizations {
        /**
         * Create new pre-authorization
         * @param cardPreAuthorization
         * @param options
         */
        create: MethodOverload<
            cardPreAuthorization.CreateCardPreAuthorization,
            cardPreAuthorization.CardPreAuthorizationData
            >;

        /**
         * Get data for Card pre-authorization
         * @param cardPreAuthorizationId
         * @param options
         */
        get: MethodOverload<string, cardPreAuthorization.CardPreAuthorizationData>;

        /**
         * Update pre-authorization object (currently only supports cancellation)
         * @param  cardPreAuthorization
         */
        update: MethodOverload<
            cardPreAuthorization.UpdateCardPreAuthorization,
            cardPreAuthorization.CardPreAuthorizationData
            >;
    }

    class PayIns {
        /**
         * Create new pay-in
         * @param payIn
         * @param options
         */
        create: MethodOverload<
            payIn.CreateCardDirectPayIn,
            payIn.CardDirectPayInData
            > &
            MethodOverload<
                payIn.CreateCardPreAuthorizedPayIn,
                payIn.CardPreAuthorizedPayInData
                > &
            MethodOverload<payIn.CreateCardWebPayIn, payIn.CardWebPayInData> &
            MethodOverload<
                payIn.CreateBankWireDirectPayIn,
                payIn.BankWireDirectPayInData
                > &
            MethodOverload<
                payIn.CreatePayconiqWebPayInData,
                payIn.PayconiqWebPayInData
                > &
            MethodOverload<
                payIn.CreateDirectDebitDirectPayIn,
                payIn.DirectDebitDirectPayInData
                >;

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
        createRefund: TwoArgsMethodOverload<
            string,
            refund.CreatePayInRefund,
            refund.RefundData
            >;

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
            payIn.RecurringPayInData
            >;
    }

    class Transfers {
        /**
         * Create new transfer
         * @param transfer
         * @param options
         */
        create: MethodOverload<transfer.CreateTransfer, transfer.TransferData>;

        /**
         * Get transfer
         * @param transferId
         * @param options
         */
        get: MethodOverload<string, transfer.TransferData>;

        /**
         * Create refund for transfer object
         * @param transferId
         * @param refund
         * @param options
         */
        createRefund: TwoArgsMethodOverload<
            string,
            refund.CreateTransferRefund,
            refund.RefundData
            >;

        /**
         * Gets list of Refunds of a Transfer
         * @param transferId
         * @param options
         */
        getRefunds: MethodOverload<string, refund.RefundData[]>;
    }

    class PayOuts {
        /**
         * Create new pay-out
         * @param payOut
         * @param options
         */
        create: MethodOverload<payOut.CreatePayOut, payOut.PayOutData>;

        /**
         * Get payout
         * @param payOutId
         * @param options
         */
        get: MethodOverload<string, payOut.PayOutData>;

        /**
         * Gets list of Refunds of a PayOut
         * @param payOutId
         * @param options
         */
        getRefunds: MethodOverload<string, refund.RefundData[]>;
    }

    class Refunds {
        /**
         * Get events
         * @param refundId
         * @param options
         */
        get: MethodOverload<string, refund.RefundData>;
    }

    class Clients {
        /**
         * Get the client
         */
        get: NoArgMethodOverload<client.ClientData>;

        /**
         * Update the client
         * @param client
         * @param options
         */
        update: MethodOverload<client.UpdateClient, client.ClientData>;

        /**
         * Upload client logo from base64 image string
         * @param base64Logo
         * @param options
         */
        uploadLogo: MethodOverload<string, client.ClientData>;

        /**
         * Upload client logo from file path
         * @param filePath
         * @param options
         */
        uploadLogoFromFile: MethodOverload<string, client.ClientData>;

        /**
         * Get all client wallets
         * @param options
         */
        getClientWallets: NoArgMethodOverload<wallet.ClientWalletData[]>;

        /**
         * Get a client wallet
         * @param fundsType
         * @param currency
         * @param options
         */
        getClientWallet: TwoArgsMethodOverload<
            wallet.ClientFundsType,
            CurrencyISO,
            wallet.ClientWalletData
            >;

        /**
         * Get client wallets by the type of funds
         * @param fundsType
         * @param options
         */
        getClientWalletsByFundsType: MethodOverload<
            wallet.ClientFundsType,
            wallet.ClientWalletData[]
            >;

        /**
         * Get a client wallet's transactions
         * @param fundsType
         * @param currency
         * @param options
         */
        getClientWalletTransactions: TwoArgsMethodOverload<
            wallet.ClientFundsType,
            CurrencyISO,
            transaction.TransactionData[]
            >;
    }

    class Disputes {
        /**
         * Get dispute
         * @param disputeId
         * @param options
         */
        get: MethodOverload<string, dispute.DisputeData>;

        /**
         * Get all disputes
         * @param options
         */
        getAll: NoArgMethodOverload<dispute.DisputeData[]>;

        /**
         * Update dispute's tag
         * @param dispute
         * @param options
         */
        update: MethodOverload<dispute.UpdateDispute, dispute.DisputeData>;

        /**
         * Contest dispute
         * @param disputeId
         * @param contestedFunds
         * @param options
         */
        contestDispute: TwoArgsMethodOverload<
            string,
            MoneyData,
            dispute.DisputeData
            >;

        /**
         * This method is used to resubmit a Dispute if it is reopened requiring more docs
         * @param disputeId
         * @param options
         */
        resubmitDispute: MethodOverload<string, dispute.DisputeData>;

        /**
         * Close dispute
         * @param disputeId
         * @param options
         */
        closeDispute: MethodOverload<string, dispute.DisputeData>;

        /**
         * Gets dispute's transactions
         * @param disputeId
         * @param options
         */
        getTransactions: MethodOverload<string, transaction.TransactionData[]>;

        /**
         * Gets dispute's documents for wallet
         * @param walletId
         * @param options
         */
        getDisputesForWallet: MethodOverload<string, dispute.DisputeData[]>;

        /**
         * Gets user's disputes
         * @param userId
         * @param options
         */
        getDisputesForUser: MethodOverload<string, dispute.DisputeData[]>;

        /**
         * Gets repudiation
         * @param repudiationId
         * @param options
         */
        getRepudiation: MethodOverload<string, repudiation.RepudiationData[]>;

        /**
         * Creates settlement transfer
         * @param settlementTransfer
         * @param repudiationId
         * @param options
         */
        createSettlementTransfer: TwoArgsMethodOverload<
            settlementTransfer.CreateSettlementTransfer,
            string,
            settlementTransfer.SettlementTransferData
            >;

        /**
         * Gets settlement transfer
         * @param settlementTransferId
         * @param options
         */
        getSettlementTransfer: MethodOverload<
            string,
            settlementTransfer.SettlementTransferData
            >;

        /**
         * Gets documents for dispute
         * @param disputeId
         * @param options
         */
        getDocumentsForDispute: MethodOverload<
            string,
            disputeDocument.DisputeDocumentData[]
            >;

        /**
         * Update dispute document
         * @param disputeId
         * @param disputeDocument
         * @param options
         */
        updateDisputeDocument: TwoArgsMethodOverload<
            string,
            Partial<disputeDocument.DisputeDocumentData>,
            disputeDocument.DisputeDocumentData
            >;

        /**
         * Creates document for dispute
         * @param disputeId
         * @param disputeDocument
         * @param options
         */
        createDisputeDocument: TwoArgsMethodOverload<
            string,
            disputeDocument.CreateDisputeDocument,
            disputeDocument.DisputeDocumentData
            >;

        /**
         * Creates document's page for dispute
         * @param disputeId
         * @param disputeDocumentId
         * @param disputeDocumentPage
         * @param options
         */
        createDisputeDocumentPage: ThreeArgsMethodOverload<
            string,
            string,
            disputeDocument.CreateDisputeDocumentPage,
            disputeDocument.DisputeDocumentData
            >;

        /**
         * Creates document's page for dispute from file
         * @param disputeId
         * @param disputeDocumentId
         * @param file
         * @param options
         */
        createDisputeDocumentPageFromFile: ThreeArgsMethodOverload<
            string,
            string,
            string,
            disputeDocument.DisputeDocumentData
            >;

        /**
         * Retrieve a list of Disputes pending settlement
         * @param options
         */
        getPendingSettlement: NoArgMethodOverload<dispute.DisputeData[]>;
    }

    class Repudiations {
        /**
         * Gets list of Refunds of a Repudiation
         * @param repudiationId
         * @param options
         */
        getRefunds: MethodOverload<string, refund.RefundData[]>;
    }

    class Events {
        /**
         * Get events
         * @param options
         */
        getAll: NoArgMethodOverload<event.EventData[]>;
    }

    class Responses {
        /**
         * Get response from previous call
         * @param options
         */
        get: NoArgMethodOverload<any[]>;
    }

    class Mandates {
        /**
         * Create a new Mandate
         * @param mandate
         * @param options
         */
        create: MethodOverload<mandate.CreateMandate, mandate.MandateData>;

        /**
         * Get all mandates
         * @param options
         */
        getAll: NoArgMethodOverload<mandate.MandateData[]>;

        /**
         * Get mandate by ID
         * @param mandateId
         * @param options
         */
        get: MethodOverload<string, mandate.MandateData>;

        /**
         * Cancel a mandate
         * @param mandateId
         * @param options
         */
        cancel: MethodOverload<string, mandate.MandateData>;

        /**
         * Gets user's mandates
         * @param userId
         * @param options
         */
        getMandatesForUser: MethodOverload<string, mandate.MandateData[]>;

        /**
         * Gets bank account mandates
         * @param userId
         * @param bankAccountId
         * @param options
         */
        getMandatesForBankAccount: TwoArgsMethodOverload<
            string,
            string,
            mandate.MandateData[]
            >;

        /**
         * Gets Transactions for a Mandate
         * @param mandateId
         * @param options
         */
        getTransactions: MethodOverload<string, transaction.TransactionData[]>;
    }

    class Hooks {
        /**
         * Create new hook
         * @param hook
         * @param options
         */
        create: MethodOverload<hook.CreateHook, hook.HookData>;

        /**
         * Get hook
         * @param hookId
         * @param options
         */
        get: MethodOverload<string, hook.HookData>;

        /**
         * Save hook
         * @param hook
         * @param options
         */
        update: MethodOverload<hook.UpdateHook, hook.HookData>;

        /**
         * Get all hooks
         * @param options
         */
        getAll: NoArgMethodOverload<hook.HookData[]>;
    }

    class Reports {
        /**
         * Create a report
         * @param report
         * @param options
         */
        create: MethodOverload<report.CreateReport, report.ReportData>;

        /**
         * Get a report
         * @param reportId
         * @param options
         */
        get: MethodOverload<string, report.ReportData>;

        /**
         * Get all reports
         * @param options
         */
        getAll: NoArgMethodOverload<report.ReportData[]>;
    }
}
