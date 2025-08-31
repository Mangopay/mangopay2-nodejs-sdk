import { CountryISO } from "../types";
import { Models } from "../models";

export namespace address {
    type AddressType = string | AddressData | Models.Address | CreateAddress;

    interface AddressData {
        /**
         * The first line of the address
         */
        AddressLine1: string;

        /**
         * The second line of the address
         */
        AddressLine2?: string;

        /**
         * The city of the address
         */
        City: string;

        /**
         * The region of the address - this is optional except if the Country is US, CA or MX
         */
        Region?: string;

        /**
         * The postal code of the address - can be alphanumeric, dashes or spaces
         */
        PostalCode: string;

        /**
         * The Country of the Address
         */
        Country: CountryISO;
    }

    interface CreateAddress {
        /**
         * The first line of the address
         */
        AddressLine1: string;

        /**
         * The second line of the address
         */
        AddressLine2?: string;

        /**
         * The city of the address
         */
        City: string;

        /**
         * The region of the address - this is optional except if the Country is US, CA or MX
         */
        Region?: string;

        /**
         * The postal code of the address - can be alphanumeric, dashes or spaces
         */
        PostalCode: string;

        /**
         * The Country of the Address
         */
        Country: CountryISO;
    }
}
