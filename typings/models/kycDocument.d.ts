import { Timestamp } from "../types";
import { entityBase } from "./entityBase";

export namespace kycDocument {
    type KycDocumentType =
        | "IDENTITY_PROOF"
        | "REGISTRATION_PROOF"
        | "ARTICLES_OF_ASSOCIATION"
        | "SHAREHOLDER_DECLARATION"
        | "ADDRESS_PROOF";

    type DocumentStatus =
        | "CREATED"
        | "VALIDATION_ASKED"
        | "VALIDATED"
        | "REFUSED";

    type KYCDocumentRefusedReasonType =
        | "DOCUMENT_UNREADABLE"
        | "DOCUMENT_NOT_ACCEPTED"
        | "DOCUMENT_HAS_EXPIRED"
        | "DOCUMENT_INCOMPLETE"
        | "DOCUMENT_MISSING"
        | "DOCUMENT_DO_NOT_MATCH_USER_DATA"
        | "DOCUMENT_DO_NOT_MATCH_ACCOUNT_DATA"
        | "SPECIFIC_CASE"
        | "DOCUMENT_FALSIFIED"
        | "UNDERAGE_PERSON"
        | "SPECIFIC_CASE";

    interface KycDocumentData extends entityBase.EntityBaseData {
        /**
         * Gives the type of the KYC document
         */
        Type: KycDocumentType;

        /**
         * The object owner's UserId
         */
        UserId: string;

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
        RefusedReasonType: KYCDocumentRefusedReasonType;

        /**
         * The date when the document was processed by MANGOPAY
         */
        ProcessedDate: Timestamp;

        /**
         * More information regarding why the document has been rejected
         */
        Flags: string[];
    }

    interface CreateKycDocument {
        /**
         * Gives the type of the KYC document
         */
        Type: KycDocumentType;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;
    }

    interface SubmitKycDocument {
        /**
         * The status of this KYC/Dispute document
         */
        Status: "VALIDATION_ASKED";

        Id: string;

        Tag?: string;
    }

    /**
     * - Documents have to be in "CREATED" Status
     * - You can create as many pages as needed
     *
     * Remember to change Status to "VALIDATION_ASKED" to submit KYC documents
     * The maximum size per page is about 7Mb (or 10Mb when base64encoded). The following formats are accepted for the documents : .pdf, .jpeg, .jpg, .gif and .png. The minimum size is 1Kb.
     */
    interface CreateKycPage {
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
}
