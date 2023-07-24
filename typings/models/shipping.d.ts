import { address } from "./address";

export namespace shipping {
    interface ShippingData {
        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The address
         */
        Address: address.AddressData;
    }

    interface CreateShipping {
        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The address
         */
        Address: address.CreateAddress;
    }
}
