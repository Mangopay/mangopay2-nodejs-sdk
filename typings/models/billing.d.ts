import { Models } from "../models";
import { address } from "./address";

export namespace billing {
    interface BillingData {
        Address: Models.Address | address.AddressData | string;
    }

    interface BillingOrShippingRecurringPayInData {
        FirstName: string;

        LastName: string;

        Address: address.AddressData;
    }
}
