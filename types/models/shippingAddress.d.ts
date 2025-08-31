import { address } from "./address";

export namespace shippingAddress {
    interface ShippingAddressData {
        /**
         * Name of the shipping recipient
         */
        RecipientName: string;

        /**
         * The shipping address
         */
        Address: address.AddressType;
    }
}
