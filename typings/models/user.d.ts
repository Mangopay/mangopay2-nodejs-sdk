import { CountryISO, MakeKeysRequired, PickPartial, Timestamp } from "../types";
import { address } from "./address";
import { entityBase } from "./entityBase";

export namespace user {
    /**
     * Should be only one of these values:
     * 1 - for incomes <18K€),
     * 2 - for incomes between 18 and 30K€,
     * 3 - for incomes between 30 and 50K€,
     * 4 - for incomes between 50 and 80K€,
     * 5 - for incomes between 80 and 120K€,
     * 6 - for incomes >120K€
     */
    type IncomeRange = 1 | 2 | 3 | 4 | 5 | 6;

    type PersonType = "NATURAL" | "LEGAL";

    type KYCLevel = "LIGHT" | "REGULAR";

    type LegalPersonType = "BUSINESS" | "ORGANIZATION" | "SOLETRADER" | "PARTNERSHIP";

    type StaticKeys =
        | "KYCLevel"
        | "PersonType"
        | "Id"
        | "CreationDate"
        | "ProofOfIdentity"
        | "ProofOfAddress"
        | "ProofOfRegistration"
        | "LegalRepresentativeProofOfIdentity"
        | "ShareholderDeclaration"
        | "Statute";

    type RequiredUserLegalData =
        | "LegalPersonType"
        | "Name"
        | "LegalRepresentativeBirthday"
        | "LegalRepresentativeCountryOfResidence"
        | "LegalRepresentativeNationality"
        | "LegalRepresentativeFirstName"
        | "LegalRepresentativeLastName"
        | "Email";

    type RequiredUserNaturalData =
        | "FirstName"
        | "LastName"
        | "Birthday"
        | "Nationality"
        | "CountryOfResidence"
        | "Email";

    type RequiredUserNaturalPayerData =
        | "FirstName"
        | "LastName"
        | "Email";

    type RequiredUserNaturalScaPayerData =
        | "FirstName"
        | "LastName"
        | "Email"
        | "TermsAndConditionsAccepted";

    type RequiredUserNaturalScaOwnerData =
        | "FirstName"
        | "LastName"
        | "Email"
        | "Birthday"
        | "Nationality"
        | "CountryOfResidence"
        | "TermsAndConditionsAccepted";

    type RequiredUserNaturalOwnerData =
        | "FirstName"
        | "LastName"
        | "Email"
        | "Birthday"
        | "Nationality"
        | "CountryOfResidence"
        | "TermsAndConditionsAccepted";

    type RequiredUserLegalPayerData =
        | "LegalPersonType"
        | "Name"
        | "LegalRepresentativeFirstName"
        | "LegalRepresentativeLastName"
        | "Email";

    type RequiredUserLegalOwnerData =
        | "HeadquartersAddress"
        | "LegalPersonType"
        | "Name"
        | "LegalRepresentativeBirthday"
        | "LegalRepresentativeCountryOfResidence"
        | "LegalRepresentativeNationality"
        | "LegalRepresentativeFirstName"
        | "LegalRepresentativeLastName"
        | "Email"
        | "CompanyNumber"
        | "TermsAndConditionsAccepted";

    type UserCategory = "PAYER" | "OWNER";

    interface UserData extends entityBase.EntityBaseData {
        /**
         * Type of user
         */
        PersonType: PersonType;

        /**
         * The person's email address (not more than 12 consecutive numbers) - must be a valid email
         */
        Email: string;

        /**
         * KYC Level (LIGHT or REGULAR)
         */
        KYCLevel: KYCLevel;

        /**
         * Whether or not the user has accepted the MANGOPAY Terms and Conditions.
         */
        TermsAndConditionsAccepted?: boolean;

        /**
         * The date when the user has accepted the MANGOPAY Terms and Conditions.
         */
        TermsAndConditionsAcceptedDate?: number;

        /**
         * Category of the user. May take one of the following values:
         * PAYER - Users who only use MANGOPAY to give money to other users
         * OWNER - Users who use MANGOPAY to receive funds. Please note that a user needs to be KYC validated to perform payouts
         */
        UserCategory?: UserCategory;

        UserStatus?: string;
    }

    interface UserLegalData extends UserData {
        PersonType: "LEGAL";

        /**
         * The name of the legal user
         */
        Name: string;

        /**
         * Type for legal user.
         */
        LegalPersonType: LegalPersonType;

        /**
         * The address of the company’s headquarters
         */
        HeadquartersAddress: address.AddressType;

        /**
         * The first name of the company’s Legal representative person
         */
        LegalRepresentativeFirstName: string;

        /**
         * The last name of the company’s Legal representative person
         */
        LegalRepresentativeLastName: string;

        /**
         * The address of the company’s Legal representative person
         */
        LegalRepresentativeAddress: address.AddressType;

        /**
         * The email of the company’s Legal representative person - must be valid
         */
        LegalRepresentativeEmail: string;

        /**
         * The date of birth of the company’s Legal representative person - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        LegalRepresentativeBirthday: Timestamp;

        /**
         * The nationality of the company’s Legal representative person
         */
        LegalRepresentativeNationality: CountryISO;

        /**
         * The country of residence of the company’s Legal representative person
         */
        LegalRepresentativeCountryOfResidence: CountryISO;

        ProofOfIdentity: string | null;

        /**
         * The business statute of the company
         */
        Statute: string | null;

        /**
         * A MANGOPAY reference to the validated document of the proof of registration of the company
         */
        ProofOfRegistration: string | null;

        /**
         * The shareholder declaration of the company
         */
        ShareholderDeclaration: string | null;

        /**
         * The official registered number of the business
         */
        CompanyNumber: string;
    }

    interface UserNaturalData extends UserData {
        PersonType: "NATURAL";

        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The user address
         */
        Address: string | address.AddressData;

        /**
         * The date of birth of the user - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        Birthday: Timestamp;

        /**
         * The user’s nationality. ISO 3166-1 alpha-2 format is expected
         */
        Nationality: CountryISO;

        /**
         * The user’s country of residence. ISO 3166-1 alpha-2 format is expected
         */
        CountryOfResidence: CountryISO;

        /**
         * User’s occupation, ie. Work
         */
        Occupation: string;

        IncomeRange: IncomeRange;

        /**
         * Maximum length is 255 characters
         */
        ProofOfIdentity: string | null;

        /**
         * Maximum length is 255 characters
         */
        ProofOfAddress: string | null;

        /**
         * The capacity of this user - for use with UBO declarations
         */
        Capacity: "NORMAL" | "DECLARATIVE";
    }

    interface UserNaturalScaData extends UserData {
        PersonType: "NATURAL";

        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The user address
         */
        Address: string | address.AddressData;

        /**
         * The date of birth of the user - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        Birthday: Timestamp;

        /**
         * The user’s nationality. ISO 3166-1 alpha-2 format is expected
         */
        Nationality: CountryISO;

        /**
         * The user’s country of residence. ISO 3166-1 alpha-2 format is expected
         */
        CountryOfResidence: CountryISO;

        /**
         * User’s occupation, ie. Work
         */
        Occupation: string;

        /**
         * Income range
         */
        IncomeRange: IncomeRange;

        /**
         * Maximum length is 255 characters
         */
        ProofOfIdentity: string | null;

        /**
         * Maximum length is 255 characters
         */
        ProofOfAddress: string | null;

        /**
         * Format: International telephone numbering plan E.164 (+ then country code then the number) or local format
         *
         * Required if UserCategory is OWNER.
         *
         * The individual’s phone number.
         *
         * If the international format is sent, the PhoneNumberCountry value is not taken into account.
         *
         * We recommend that you use the PhoneNumberCountry parameter to ensure the correct rendering in line with the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll the new value in SCA via the PendingUserAction.RedirectUrl.
         * For more details see the <a href="https://docs.mangopay.com/guides/users/sca/enrollment">SCA</a> guides.
         */
        PhoneNumber: string;

        /**
         * Allowed values: Two-letter country code (ISO 3166-1 alpha-2 format).
         *
         * Required if the PhoneNumber is provided in local format.
         *
         * The country code of the PhoneNumber, used to render the value in the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll the new value in SCA via the PendingUserAction.RedirectUrl.
         * For more details see the <a href="https://docs.mangopay.com/guides/users/sca/enrollment">SCA</a> guides.
         */
        PhoneNumberCountry: CountryISO;

        /**
         * Information about the action required from the user if UserStatus is PENDING_USER_ACTION (otherwise returned null).
         */
        PendingUserAction: PendingUserActionData;
    }

    interface PendingUserActionData {
        /**
         * The URL to which to redirect the user to perform strong customer authentication (SCA) via a Mangopay-hosted webpage. This value is a variable and should not be hardcoded.
         * <p>
         * Caution: Before redirecting the user on this URL, you must add the query parameter ReturnUrl with the percent-encoded URL to which you want the SCA session to return the user after authentication (whether successful or not).
         * <p>
         * For more details, see <a href="https://docs.mangopay.com/guides/users/sca#how-to-redirect-a-user-for-an-sca-session">How to redirect a user for an SCA session</a>
         */
        RedirectUrl: string;
    }

    interface BaseUserLegalData extends PickPartial<UserLegalData,
        | RequiredUserLegalData
        | "CompanyNumber"
        | "LegalRepresentativeEmail"
        | "LegalRepresentativeAddress"
        | "HeadquartersAddress"
        | "Tag"
        | "TermsAndConditionsAccepted"
        | "UserCategory"> {
        PersonType: "LEGAL";
    }

    interface UpdateUserLegalData extends BaseUserLegalData {
        Id: string;
    }

    interface CreateUserLegalData extends MakeKeysRequired<BaseUserLegalData,
        RequiredUserLegalData | "PersonType"> {
    }

    interface BaseUserNaturalData extends PickPartial<UserNaturalData,
        | RequiredUserNaturalData
        | "Address"
        | "Occupation"
        | "IncomeRange"
        | "Tag"
        | "TermsAndConditionsAccepted"
        | "UserCategory"> {
        PersonType: "NATURAL";
    }

    interface UpdateUserNaturalData extends BaseUserNaturalData {
        Id: string;
    }

    interface CreateUserNaturalData extends MakeKeysRequired<BaseUserNaturalData,
        RequiredUserNaturalData | "PersonType"> {
    }

    interface CreateUserNaturalPayerData extends MakeKeysRequired<BaseUserNaturalData, RequiredUserNaturalPayerData | "PersonType">,
        PickPartial<UserNaturalData, "Address" | "Tag" | "TermsAndConditionsAccepted" | "UserCategory"> {
    }

    interface CreateUserNaturalOwnerData extends MakeKeysRequired<BaseUserNaturalData, RequiredUserNaturalOwnerData | "PersonType">,
        PickPartial<UserNaturalData, "Address" | "Tag" | "Occupation" | "IncomeRange" | "UserCategory"> {
    }

    interface CreateUserLegalPayerData extends MakeKeysRequired<BaseUserLegalData, RequiredUserLegalPayerData | "PersonType">,
        PickPartial<UserLegalData, "Tag" | "TermsAndConditionsAccepted" | "UserCategory"> {
    }

    interface CreateUserLegalOwnerData extends MakeKeysRequired<BaseUserLegalData, RequiredUserLegalOwnerData | "PersonType">,
        PickPartial<UserLegalData, "Tag" | "LegalRepresentativeEmail" | "UserCategory"> {
    }

    interface CreateUserNaturalScaPayerData {
        /**
         * Needed for calling the correct API url (it will not be sent to the API)
         */
        Sca: true;

        PersonType: "NATURAL";

        UserCategory: "PAYER";

        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The person's email address (not more than 12 consecutive numbers) - must be a valid email
         */
        Email: string;

        /**
         * The user address
         */
        Address?: address.CreateAddress;

        /**
         * The date of birth of the user - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        Birthday?: Timestamp;

        /**
         * The user’s nationality. ISO 3166-1 alpha-2 format is expected
         */
        Nationality?: CountryISO;

        /**
         * The user’s country of residence. ISO 3166-1 alpha-2 format is expected
         */
        CountryOfResidence?: CountryISO;

        /**
         * User’s occupation, ie. Work
         */
        Occupation?: string;

        /**
         * Income range
         */
        IncomeRange?: IncomeRange;

        /**
         * Format: International telephone numbering plan E.164 (+ then country code then the number) or local format
         *
         * Required if UserCategory is OWNER.
         *
         * The individual’s phone number.
         *
         * If the international format is sent, the PhoneNumberCountry value is not taken into account.
         *
         * We recommend that you use the PhoneNumberCountry parameter to ensure the correct rendering in line with the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll the new value in SCA via the PendingUserAction.RedirectUrl.
         * For more details see the <a href="https://docs.mangopay.com/guides/users/sca/enrollment">SCA</a> guides.
         */
        PhoneNumber?: string;

        /**
         * Allowed values: Two-letter country code (ISO 3166-1 alpha-2 format).
         *
         * Required if the PhoneNumber is provided in local format.
         *
         * The country code of the PhoneNumber, used to render the value in the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll the new value in SCA via the PendingUserAction.RedirectUrl.
         * For more details see the <a href="https://docs.mangopay.com/guides/users/sca/enrollment">SCA</a> guides.
         */
        PhoneNumberCountry?: CountryISO;

        /**
         * Whether the user has accepted Mangopay’s terms and conditions. Must be true if UserCategory is OWNER
         */
        TermsAndConditionsAccepted: boolean;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }

    interface CreateUserNaturalScaOwnerData {
        /**
         * Needed for calling the correct API url (it will not be sent to the API)
         */
        Sca: true;

        PersonType: "NATURAL";

        UserCategory: "OWNER";

        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The person's email address (not more than 12 consecutive numbers) - must be a valid email
         */
        Email: string;

        /**
         * The user address
         */
        Address?: address.CreateAddress;

        /**
         * The date of birth of the user - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before)
         */
        Birthday: Timestamp;

        /**
         * The user’s nationality. ISO 3166-1 alpha-2 format is expected
         */
        Nationality: CountryISO;

        /**
         * The user’s country of residence. ISO 3166-1 alpha-2 format is expected
         */
        CountryOfResidence: CountryISO;

        /**
         * Format: International telephone numbering plan E.164 (+ then country code then the number) or local format
         *
         * Required if UserCategory is OWNER.
         *
         * The individual’s phone number.
         *
         * If the international format is sent, the PhoneNumberCountry value is not taken into account.
         *
         * We recommend that you use the PhoneNumberCountry parameter to ensure the correct rendering in line with the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll the new value in SCA via the PendingUserAction.RedirectUrl.
         * For more details see the <a href="https://docs.mangopay.com/guides/users/sca/enrollment">SCA</a> guides.
         */
        PhoneNumber?: string;

        /**
         * Allowed values: Two-letter country code (ISO 3166-1 alpha-2 format).
         *
         * Required if the PhoneNumber is provided in local format.
         *
         * The country code of the PhoneNumber, used to render the value in the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll the new value in SCA via the PendingUserAction.RedirectUrl.
         * For more details see the <a href="https://docs.mangopay.com/guides/users/sca/enrollment">SCA</a> guides.
         */
        PhoneNumberCountry?: CountryISO;

        /**
         * Whether the user has accepted Mangopay’s terms and conditions. Must be true if UserCategory is OWNER
         */
        TermsAndConditionsAccepted: boolean;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }
}
