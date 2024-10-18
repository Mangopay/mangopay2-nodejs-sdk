import { CountryISO, CurrencyISO, VirtualAccountOwner, VirtualAccountPurpose, VirtualAccountStatus } from "../types";
import { entityBase } from "./entityBase";

export namespace virtualAccount {

    interface VirtualAccountData extends entityBase.EntityBaseData {
        WalletId: string;
        CreditedUserId: string;
        VirtualAccountPurpose: VirtualAccountPurpose;
        Country: CountryISO;
        Status: VirtualAccountStatus;
        Active: boolean;
        AccountOwner: VirtualAccountOwner;
        LocalAccountsDetails: LocalAccountsDetails;
        InternationalAccountDetails: InternationalAccountDetails[];
        Capabilities: VirtualAccountCapabilities;
    }

    interface CreateVirtualAccount {
        Country: CountryISO;
        VirtualAccountPurpose: VirtualAccountPurpose;
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
        Address: VirtualAccountAddress;
        Account: Account;
    }

    interface LocalAccountsDetails {
        Address: VirtualAccountAddress;
        AccountNumber: string;
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
        LocalPayinAvailable: boolean;
        InternationalPayinAvailable: boolean;
        Currencies: CurrencyISO[];
    }
}
