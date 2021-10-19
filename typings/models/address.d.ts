import { CountryISO } from "../types";
import { Models } from "../models";

export namespace address {
    interface AddressData {
        AddressLine1: string;
        AddressLine2: string;
        City: string;
        Region: string;
        PostalCode: string;
        Country: CountryISO;
    }

    type AddressType = string | AddressData | Models.Address;
}
