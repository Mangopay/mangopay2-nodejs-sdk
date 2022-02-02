import { Timestamp, ValueOf } from "../types";
import { birthplace } from "./birthplace";
import { address } from "./address";
import { entityBase } from "./entityBase";
import { enums } from "../enums";

export namespace uboDeclaration {
    interface UboDeclarationData extends entityBase.EntityBaseData {
        /**
         * cannot be modified by clients
         */
        ProcessedDate: Timestamp;
        /**
         * Declaration status (one of UboDeclarationStatus)
         */
        Status: ValueOf<enums.IUboDeclarationStatus>;
        /**
         * Array of reasons why the declaration was refused
         * Values as declared in UboDeclarationRefusedReasonType.
         */
        Reason: ValueOf<enums.IUboDeclarationRefusedReasonType>;
        /**
         * Explanation of why the declaration was refused.
         */
        Message: string;
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
        Id: string;

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
