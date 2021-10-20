import { Models } from "../models";
import { CountryISO } from "../types";
import { address } from "./address";
import { entityBase } from "./entityBase";

export namespace bankAccount {
    type CAData = BaseData & CADetails;

    type USData = BaseData & USDetails;

    type BankAccountType = "IBAN" | "GB" | "US" | "CA" | "OTHER";

    type DepositAccountType = "CHECKING" | "SAVINGS";

    type GBData = BaseData & GBDetails;

    type OtherData = BaseData & OtherDetails;

    type IBANData = BaseData & IBANDetails;

    type Data = OtherData | CAData | GBData | IBANData | USData;

    type DataIntersection = OtherData & CAData & GBData & IBANData & USData;

    type CreationDetails =
        | OtherDetails
        | CADetails
        | GBDetails
        | IBANDetails
        | USDetails;

    interface BaseData extends entityBase.EntityBaseData {
        /**
         * The object owner's UserId
         */
        UserId: string;

        /**
         * The type of bank account
         */
        Type: BankAccountType;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: address.AddressType;

        /**
         * @deprecated
         */
        Details?: Models.BankAccountDetails;

        /**
         * Whether the bank account is active or not
         */
        Active: boolean;
    }

    interface IBANDetails {
        Type: string | "IBAN";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: address.AddressType;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The IBAN of the bank account
         */
        IBAN: string;

        /**
         * The BIC of the bank account
         */
        BIC?: string;
    }

    interface USDetails {
        Type: string | "US";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: address.AddressType;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The account number of the bank account. US account numbers must be digits only.
         */
        AccountNumber: string;

        /**
         * The ABA of the bank account. Must be numbers only, and 9 digits long
         */
        ABA: string;

        /**
         * The type of account
         */
        DepositAccountType?: DepositAccountType;
    }

    interface CADetails {
        Type: string | "CA";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: address.AddressType;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The branch code of the bank where the bank account. Must be numbers only, and 5 digits long
         */
        BranchCode: string;

        /**
         * The institution number of the bank account. Must be numbers only, and 3 or 4 digits long
         */
        InstitutionNumber: string;

        /**
         * The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits.
         */
        AccountNumber: string;

        /**
         * The name of the bank where the account is held. Must be letters or numbers only and maximum 50 characters long.
         */
        BankName: string;
    }

    interface GBDetails {
        Type: string | "GB";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: address.AddressType;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The sort code of the bank account. Must be numbers only, and 6 digits long
         */
        SortCode: string;

        /**
         * The account number of the bank account. Must be numbers only. GB account numbers must be 8 digits long.
         */
        AccountNumber: string;
    }

    interface OtherDetails {
        Type: string | "OTHER";

        /**
         * The address of the owner of the bank account
         */
        OwnerAddress: address.AddressType;

        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The Country of the Address
         */
        Country: CountryISO;

        /**
         * The BIC of the bank account
         */
        BIC: string;

        /**
         * The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits.
         */
        AccountNumber: string;
    }

    interface DebitedBankAccountData {
        /**
         * The name of the owner of the bank account
         */
        OwnerName: string;

        /**
         * The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits.
         */
        AccountNumber: string;

        /**
         * The IBAN of the bank account
         */
        IBAN: string;

        /**
         * The BIC of the bank account
         */
        BIC: string;

        /**
         * The Type of the bank account
         */
        Type: BankAccountType;

        /**
         * The Country ISO
         */
        Country: CountryISO;
    }
}
