import {CountryISO, MakeKeysRequired, PickPartial, Timestamp} from "../types";
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

    type RequiredUserNaturalScaData =
        | "FirstName"
        | "LastName"
        | "Email"
        | "TermsAndConditionsAccepted"
        | "UserCategory"

    type RequiredUserLegalScaData =
        | "Name"
        | "LegalPersonType"
        | "LegalRepresentative"
        | "Email"
        | "TermsAndConditionsAccepted"
        | "UserCategory"

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
         * The date of birth of the user - be careful to set the right timezone (should be UTC)
         * to avoid 00h becoming 23h (and hence interpreted as the day before)
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
         * We recommend that you use the PhoneNumberCountry parameter to ensure the correct rendering
         * in line with the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll
         * the new value in SCA via the PendingUserAction.RedirectUrl.
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
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll
         * the new value in SCA via the PendingUserAction.RedirectUrl.
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
         * The URL to which to redirect the user to perform strong customer authentication (SCA)
         * via a Mangopay-hosted webpage. This value is a variable and should not be hardcoded.
         *
         * Caution: Before redirecting the user on this URL, you must add the query parameter ReturnUrl with
         * the percent-encoded URL to which you want the SCA session to return the user
         * after authentication (whether successful or not).
         *
         * For more details, see <a href="https://docs.mangopay.com/guides/users/sca#how-to-redirect-a-user-for-an-sca-session">How to redirect a user for an SCA session</a>
         */
        RedirectUrl: string;
    }

    interface UserLegalScaData extends UserData {
        PersonType: "LEGAL";

        /**
         * The registered legal name of the entity.
         * The Name value should be the one registered with the relevant national authority.
         */
        Name: string;

        /**
         * The type of legal user
         */
        LegalPersonType: LegalPersonType;

        /**
         * Information about the legal representative declared for the user.
         */
        LegalRepresentative: LegalRepresentativeData;

        /**
         * The Id of the KYC Document whose Type is REGISTRATION_PROOF if validated for the user.
         * If no registration proof is validated, then this value is null.
         */
        ProofOfRegistration: string;

        /**
         * The Id of the KYC Document whose Type is SHAREHOLDERS_DECLARATION if validated for the user.
         * If no Shareholder Declaration is validated, then this value is null.
         */
        ShareholderDeclaration: string;

        /**
         * The Id of the KYC Document whose Type is ARTICLES_OF_ASSOCIATION if validated for the user.
         * If no articles of association document is validated, then this value is null.
         */
        Statute: string;

        /**
         * The registration number of the entity, assigned by the relevant national authority
         */
        CompanyNumber: string;

        /**
         * Object containing the link needed for SCA redirection if triggered by the API call (otherwise returned null).
         */
        PendingUserAction: PendingUserActionData;

        /**
         * The legally registered address of the entity’s administrative center.
         * This object’s sub-parameters are null if the UserCategory is PAYER.
         */
        HeadquartersAddress: address.AddressData;

        /**
         * The address of the entity’s legal representative.
         */
        LegalRepresentativeAddress: address.AddressData;
    }

    interface LegalRepresentativeData {
        /**
         * The first name of the individual.
         */
        FirstName: string;

        /**
         * The last name of the individual.
         */
        LastName: string;

        /**
         * The date of birth of the individual.
         */
        Birthday: Timestamp;

        /**
         * The nationality of the individual.
         */
        Nationality: CountryISO;

        /**
         * The country of residence of the individual.
         */
        CountryOfResidence: CountryISO;

        /**
         * The individual’s email address.
         */
        Email: string;

        /**
         * Format: International E.164 standard (prefixed by plus sign and country code) or local format
         *
         * The individual’s phone number. The local format (recommended) requires
         * PhoneNumberCountry to ensure correct formatting.
         *
         * If present, the phone number forms part of card transaction data that is
         * passed to issuers to improve authentication rates.
         *
         * For users with UserCategory OWNER , the phone number is used to pre-populate the SCA
         * session for them to confirm and receive an SMS OTP. If the individual modifies the phone number
         * during the session, this data is not updated in the API.
         */
        PhoneNumber: string;

        /**
         * Format: Two-letter country code (ISO 3166-1 alpha-2 format)
         *
         * Required if the PhoneNumber is provided in local format (recommended), to render the value in the E.164 standard.
         */
        PhoneNumberCountry: CountryISO;
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

    interface CreateUserNaturalScaData {
        /**
         * Needed for calling the correct API url (it will not be sent to the API)
         */
        NaturalSca: true;

        PersonType: "NATURAL";

        UserCategory: "PAYER" | "OWNER";

        /**
         * The name of the user
         */
        FirstName: string;

        /**
         * The last name of the user
         */
        LastName: string;

        /**
         * The date of birth of the user - be careful to set the right timezone (should be UTC)
         * to avoid 00h becoming 23h (and hence interpreted as the day before)
         * Required if UserCategory is OWNER
         */
        Birthday?: Timestamp;

        /**
         * The user’s nationality. ISO 3166-1 alpha-2 format is expected
         * Required if UserCategory is OWNER
         */
        Nationality?: CountryISO;

        /**
         * The user’s country of residence. ISO 3166-1 alpha-2 format is expected
         * Required if UserCategory is OWNER
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
         * The person's email address (not more than 12 consecutive numbers) - must be a valid email
         */
        Email: string;

        /**
         * Format: International telephone numbering plan E.164 (+ then country code then the number) or local format
         *
         * Required if UserCategory is OWNER.
         *
         * The individual’s phone number.
         *
         * If the international format is sent, the PhoneNumberCountry value is not taken into account.
         *
         * We recommend that you use the PhoneNumberCountry parameter to ensure the correct rendering
         * in line with the E.164 standard.
         *
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll
         * the new value in SCA via the PendingUserAction.RedirectUrl.
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
         * Caution: If UserCategory is OWNER, modifying this value means the user will be required to re-enroll
         * the new value in SCA via the PendingUserAction.RedirectUrl.
         * For more details see the <a href="https://docs.mangopay.com/guides/users/sca/enrollment">SCA</a> guides.
         */
        PhoneNumberCountry?: CountryISO;

        /**
         * The user address
         */
        Address?: address.CreateAddress;

        /**
         * Whether the user has accepted Mangopay’s terms and conditions. Must be true if UserCategory is OWNER
         */
        TermsAndConditionsAccepted: boolean;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;
    }

    interface CreateUserLegalScaData {
        /**
         * Needed for calling the correct API url (it will not be sent to the API)
         */
        LegalSca: true;

        PersonType: "LEGAL";

        UserCategory: "PAYER" | "OWNER";

        /**
         * The registered legal name of the entity.
         * The Name value should be the one registered with the relevant national authority.
         */
        Name: string;

        /**
         * The type of legal user
         */
        LegalPersonType: LegalPersonType;

        /**
         * Information about the legal representative declared for the user.
         */
        LegalRepresentative: CreateLegalRepresentativeData;

        /**
        * The registration number of the entity, assigned by the relevant national authority
        * Required if UserCategory is OWNER and LegalPersonType is BUSINESS. Returned null if UserCategory is PAYER.
        */
        CompanyNumber?: string;

        /**
         * The legally registered address of the entity’s administrative center.
         * This object’s sub-parameters are null if the UserCategory is PAYER.
         * Required if UserCategory is OWNER. Child parameters returned null if UserCategory is PAYER.
         */
        HeadquartersAddress?: address.CreateAddress;

        /**
         * The address of the entity’s legal representative.
         */
        LegalRepresentativeAddress?: address.CreateAddress;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;

        /**
         * The email address for the entity.
         */
        Email: string;

        /**
         * Whether the user has accepted Mangopay’s terms and conditions (as defined by your contract, see the T&Cs guide for details).
         *
         * Must be true if UserCategory is OWNER.
         */
        TermsAndConditionsAccepted: boolean;
    }

    interface CreateLegalRepresentativeData {
        /**
         * The first name of the individual.
         */
        FirstName: string;

        /**
         * The last name of the individual.
         */
        LastName: string;

        /**
         * The date of birth of the individual.
         * Required if UserCategory is OWNER. Returned null if UserCategory is PAYER.
         */
        Birthday?: Timestamp;

        /**
         * The nationality of the individual.
         * Required if UserCategory is OWNER. Returned null if UserCategory is PAYER.
         */
        Nationality?: CountryISO;

        /**
         * The country of residence of the individual.
         * Required if UserCategory is OWNER. Returned null if UserCategory is PAYER.
         */
        CountryOfResidence?: CountryISO;

        /**
         * The individual’s email address.
         */
        Email: string;

        /**
         * Format: International E.164 standard (prefixed by plus sign and country code) or local format
         *
         * The individual’s phone number. The local format (recommended) requires
         * PhoneNumberCountry to ensure correct formatting.
         *
         * If present, the phone number forms part of card transaction data that is
         * passed to issuers to improve authentication rates.
         *
         * For users with UserCategory OWNER , the phone number is used to pre-populate the SCA
         * session for them to confirm and receive an SMS OTP. If the individual modifies the phone number
         * during the session, this data is not updated in the API.
         */
        PhoneNumber?: string;

        /**
         * Format: Two-letter country code (ISO 3166-1 alpha-2 format)
         *
         * Required if the PhoneNumber is provided in local format (recommended), to render the value in the E.164 standard.
         */
        PhoneNumberCountry?: CountryISO;
    }

    interface UpdateLegalRepresentativeData {
        FirstName?: string;
        LastName?: string;
        Birthday?: Timestamp;
        Nationality?: CountryISO;
        CountryOfResidence?: CountryISO;
        Email?: string;
        PhoneNumber?: string;
        PhoneNumberCountry?: CountryISO;
    }

    interface UpdateUserLegalScaData {
        /**
         * Needed for calling the correct API url (it will not be sent to the API)
         */
        LegalSca: true;
        Id: string;
        Tag?: string;
        TermsAndConditionsAccepted: boolean;
        Name?: string;
        LegalPersonType?: LegalPersonType;
        LegalRepresentative?: UpdateLegalRepresentativeData
        CompanyNumber?: string;
        HeadquartersAddress?: address.CreateAddress;
        LegalRepresentativeAddress?: address.CreateAddress;
        Email?: string;
    }

    interface UpdateUserNaturalScaData {
        /**
         * Needed for calling the correct API url (it will not be sent to the API)
         */
        NaturalSca: true;
        Id: string;
        TermsAndConditionsAccepted: boolean;
        FirstName?: string;
        LastName?: string;
        Birthday?: Timestamp;
        Nationality?: CountryISO;
        CountryOfResidence?: CountryISO;
        Occupation?: string;
        IncomeRange?: IncomeRange;
        Tag?: string;
        PhoneNumber?: string;
        PhoneNumberCountry?: CountryISO;
        Address?: address.CreateAddress;
    }
}
