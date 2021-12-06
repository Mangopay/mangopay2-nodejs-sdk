import { kycDocument } from "../models/kycDocument";
import { base } from "../base";
import NoArgMethodOverload = base.NoArgMethodOverload;
import MethodOverload = base.MethodOverload;

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
export class KycDocuments {
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
