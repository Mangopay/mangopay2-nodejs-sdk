import { Timestamp } from "../types";
import { birthplace } from "./birthplace";
import { address } from "./address";
import { entityBase } from "./entityBase";

export namespace uboDeclaration {
    interface UboDeclarationData extends entityBase.EntityBaseData {
        /**
         * cannot be modified by clients
         */
        ProcessedDate: null;
        /**
         * Declaration status (one of UboDeclarationStatus)
         */
        Status: null;
        /**
         * Array of reasons why the declaration was refused
         * Values as declared in UboDeclarationRefusedReasonType.
         */
        Reason: null;
        /**
         * Explanation of why the declaration was refused.
         */
        Message: null;
        /**
         * Table of ubos (declared in Ubo)
         */
        Ubos: [];
    }

    interface UboData extends entityBase.EntityBaseData {
        FirstName: string;

        LastName: string;

        Address: address.AddressType;

        Nationality: string;

        Birthday: Timestamp;

        Birthplace: birthplace.Birthplace;

        isActive: boolean;
    }

    interface CreateUbo {
        FirstName: string;

        LastName: string;

        Address: address.AddressType;

        Nationality: string;

        Birthday: Timestamp;

        Birthplace: birthplace.Birthplace;
    }

    interface UpdateUbo {
        FirstName?: string;

        LastName?: string;

        Address?: address.AddressType;

        Nationality?: string;

        Birthday?: Timestamp;

        Birthplace?: birthplace.Birthplace;

        isActive?: boolean;
    }

    interface CreateUboDeclaration {
        Ubos?: string[];
    }

    interface UpdateUboDeclaration {
        Id: string;

        Tag?: string;

        Status?: "VALIDATION_ASKED";

        /**
         * An array of UserIDs declared as Ultimate Beneficial Owners of a BUSINESS Legal User.
         */
        Ubos?: string[];
    }
}
