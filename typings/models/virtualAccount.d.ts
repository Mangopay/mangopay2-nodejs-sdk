import { CountryISO, CurrencyISO, VirtualAccountOwner, VirtualAccountPurpose, VirtualAccountStatus } from "../types";
import { entityBase } from "./entityBase";

export namespace virtualAccount {

    interface VirtualAccountData extends entityBase.EntityBaseData {
        /**
         * The wallet ID
         */
        WalletId: string;

        /**
         * The credited user ID
         */
        CreditedUserId: string;

        /**
         * The type of the virtual account
         * Allowed values: `COLLECTION`, `USER_OWNED`
         */
        VirtualAccountPurpose: VirtualAccountPurpose;

        /**
         * The country of the IBAN. The country must correspond to the currency of the wallet
         */
        Country: CountryISO;

        /**
         * The status of the virtual account creation
         */
        Status: VirtualAccountStatus;

        /**
         * Whether the virtual account is active and can receive pay-ins. `Active` is only `true`
         * when the `Status` is `ACTIVE`.
         */
        Active: boolean;

        /**
         * Owner of the virtual account.
         */
        AccountOwner: VirtualAccountOwner;

        /**
         * Details of the account in local account identifier format
         */
        LocalAccountsDetails: LocalAccountsDetails;

        /**
         * Details of the account in IBAN format.
         * The `InternationalAccountDetails` are not returned if the country doesn’t use IBAN (e.g. AU -
         * Australia)
         */
        InternationalAccountDetails: InternationalAccountDetails[];

        /**
         * Information about the account’s payment capabilities
         */
        Capabilities: VirtualAccountCapabilities;
    }

    interface CreateVirtualAccount {
        /**
         * The country of the IBAN. The country must correspond to the currency of the wallet
         */
        Country: CountryISO;

        /**
         * The type of the virtual account
         * Allowed values: `COLLECTION`, `USER_OWNED`
         */
        VirtualAccountPurpose: VirtualAccountPurpose;

        /**
         * Tag
         */
        Tag?: string;
    }

    interface VirtualAccountAvailabilitiesData {
        Collection: VirtualAccountAvailability[];
        UserOwned: VirtualAccountAvailability[];
    }

    interface VirtualAccountAvailability {
        Country: CountryISO;
        Available: boolean;
        Currencies: CurrencyISO[];
    }

    interface InternationalAccountDetails {
        /**
         * Information about the address associated with the international IBAN account.
         */
        Address: VirtualAccountAddress;

        /**
         * The IBAN and BIC of the account.
         */
        Account: Account;
    }

    interface LocalAccountsDetails {
        /**
         * Information about the address associated with the local IBAN account.
         */
        Address: VirtualAccountAddress;

        /**
         * The account number of the account
         */
        AccountNumber: string;

        /**
         * The sort code of the account.
         */
        SortCode: string;
    }

    interface VirtualAccountAddress {
        StreetName: string;
        PostalCode: string;
        TownName: string;
        CountrySubDivision: string;
        Country: CountryISO;
    }

    interface Account {
        Iban: string;
        Bic: string;
    }

    interface VirtualAccountCapabilities {
        /**
         * Whether or not local bank wires can be made to this account.
         */
        LocalPayinAvailable: boolean;

        /**
         * Whether or not international bank wires can be made to this account
         */
        InternationalPayinAvailable: boolean;

        /**
         * List of currencies supported by the account
         */
        Currencies: CurrencyISO[];
    }
}
