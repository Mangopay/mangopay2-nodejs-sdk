import { Models } from "../models";
import { address } from "./address";

export namespace billing {
    interface BillingData {
        Address: Models.Address | address.AddressData | string;
    }

    interface CompleteBillingData {
        FirstName: string;

        LastName: string;

        Address: address.AddressData;
    }

    // todo: replace with CompleteBillingData
    interface BillingOrShippingRecurringPayInData {
        FirstName: string;

        LastName: string;

        Address: address.AddressData;
    }
}
