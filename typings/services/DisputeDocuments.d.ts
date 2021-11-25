import { disputeDocument } from "../models/disputeDocument";
import { Base } from "../base";
import NoArgMethodOverload = Base.NoArgMethodOverload;
import MethodOverload = Base.MethodOverload;

export class DisputeDocuments {
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
    createDisputeDocumentConsult: MethodOverload<string,
        any // Unsure of data structure from docs
        >;
}
