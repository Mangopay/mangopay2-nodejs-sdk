import { Timestamp } from "../types";
import { entityBase } from "./entityBase";

export namespace disputeDocument {
    type DisputeDocumentType =
        | "DELIVERY_PROOF"
        | "INVOICE"
        | "REFUND_PROOF"
        | "USER_CORRESPONDANCE"
        | "USER_ACCEPTANCE_PROOF"
        | "PRODUCT_REPLACEMENT_PROOF"
        | "OTHER";

    type DocumentStatus =
        | "CREATED"
        | "VALIDATION_ASKED"
        | "VALIDATED"
        | "REFUSED"
        | "OUT_OF_DATE";

    type RefusedReasonType =
        | "DOCUMENT_UNREADABLE"
        | "DOCUMENT_NOT_ACCEPTED"
        | "DOCUMENT_HAS_EXPIRED"
        | "DOCUMENT_INCOMPLETE"
        | "DOCUMENT_MISSING"
        | "SPECIFIC_CASE"
        | "DOCUMENT_FALSIFIED"
        | "OTHER";

    interface DisputeDocumentData extends entityBase.EntityBaseData {
        /**
         * Gives the type of the KYC document
         */
        Type: DisputeDocumentType;

        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The Id of a Dispute
         */
        DisputeId: string;

        /**
         * The status of this KYC/Dispute document
         */
        Status: DocumentStatus;

        /**
         * The message accompanying a refusal
         */
        RefusedReasonMessage: string;

        /**
         * The type of reason for refusal
         */
        RefusedReasonType: RefusedReasonType;

        /**
         * The date when the document was processed by MANGOPAY
         */
        ProcessedDate: Timestamp;
    }

    interface CreateDisputeDocument {
        /**
         * Gives the type of the KYC document
         */
        Type: DisputeDocumentType;
        Tag?: string;
    }

    interface SubmitDisputeDocument {
        /**
         * The status of this KYC/Dispute document
         */
        Status: "VALIDATION_ASKED";
        Tag?: string;
    }

    /**
     * - Documents have to be in "CREATED" Status
     * - You can create as many pages as needed
     *
     * Remember to change Status to "VALIDATION_ASKED" to submit KYC documents
     * The maximum size per page is about 7Mb (or 10Mb when base64encoded). The following formats are accepted for the documents : .pdf, .jpeg, .jpg, .gif and .png. The minimum size is 1Kb.
     */
    interface CreateDisputeDocumentPage {
        /**
         * The base64 encoded file which needs to be uploaded
         *
         * You need to fill in only the binary code. Do not send the first part that some converters add into the binary code which is
         * `<img src=" data:image/png;base64..." />`
         *
         * e.g.
         * ```json
         * {
         *   "File": "/9j/4AAQSkZJRgABAQEBLAEsAAD/.../wgARCAAyADIDAREAAhEBAxEB/8QAGwAAAgMBAQEA"
         * }
         * ```
         */
        File: string;
    }

    interface DocumentPageConsult {
        /**
         * URL where this document page can be viewed.
         */
        Url: string;

        /**
         * Time in millis when the page consult will expire.
         */
        ExpirationDate: Timestamp;
    }
}
