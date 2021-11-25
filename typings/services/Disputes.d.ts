import { dispute } from "../models/dispute";
import { transaction } from "../models/transaction";
import { repudiation } from "../models/repudiation";
import { settlementTransfer } from "../models/settlementTransfer";
import { disputeDocument } from "../models/disputeDocument";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;
import NoArgMethodOverload = Base.NoArgMethodOverload;
import TwoArgsMethodOverload = Base.TwoArgsMethodOverload;
import { money } from "../models/money";
import MoneyData = money.MoneyData;
import ThreeArgsMethodOverload = Base.ThreeArgsMethodOverload;

export class Disputes {
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
    contestDispute: TwoArgsMethodOverload<string,
        MoneyData,
        dispute.DisputeData>;

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
    createSettlementTransfer: TwoArgsMethodOverload<settlementTransfer.CreateSettlementTransfer,
        string,
        settlementTransfer.SettlementTransferData>;

    /**
     * Gets settlement transfer
     * @param settlementTransferId
     * @param options
     */
    getSettlementTransfer: MethodOverload<string,
        settlementTransfer.SettlementTransferData>;

    /**
     * Gets documents for dispute
     * @param disputeId
     * @param options
     */
    getDocumentsForDispute: MethodOverload<string,
        disputeDocument.DisputeDocumentData[]>;

    /**
     * Update dispute document
     * @param disputeId
     * @param disputeDocument
     * @param options
     */
    updateDisputeDocument: TwoArgsMethodOverload<string,
        Partial<disputeDocument.DisputeDocumentData>,
        disputeDocument.DisputeDocumentData>;

    /**
     * Creates document for dispute
     * @param disputeId
     * @param disputeDocument
     * @param options
     */
    createDisputeDocument: TwoArgsMethodOverload<string,
        disputeDocument.CreateDisputeDocument,
        disputeDocument.DisputeDocumentData>;

    /**
     * Creates document's page for dispute
     * @param disputeId
     * @param disputeDocumentId
     * @param disputeDocumentPage
     * @param options
     */
    createDisputeDocumentPage: ThreeArgsMethodOverload<string,
        string,
        disputeDocument.CreateDisputeDocumentPage,
        disputeDocument.DisputeDocumentData>;

    /**
     * Creates document's page for dispute from file
     * @param disputeId
     * @param disputeDocumentId
     * @param file
     * @param options
     */
    createDisputeDocumentPageFromFile: ThreeArgsMethodOverload<string,
        string,
        string,
        disputeDocument.DisputeDocumentData>;

    /**
     * Retrieve a list of Disputes pending settlement
     * @param options
     */
    getPendingSettlement: NoArgMethodOverload<dispute.DisputeData[]>;
}
