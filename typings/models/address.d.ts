import { CountryISO } from "../types";
import { Models } from "../models";

export namespace address {
    type AddressType = string | AddressData | Models.Address;

    interface AddressData {
        AddressLine1: string;

        AddressLine2: string;

        City: string;

        Region: string;

        PostalCode: string;

        Country: CountryISO;
    }
}
