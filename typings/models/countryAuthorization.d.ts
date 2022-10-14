import { CountryISO } from "../types";

export namespace countryAuthorization {
    interface AuthorizationData {
        BlockUserCreation: boolean;
        BlockBankAccountCreation: boolean;
        BlockPayout: boolean;
    }

    interface CountryAuthorizationData {
        CountryCode: CountryISO;
        CountryName: string;
        Authorization: AuthorizationData;
        LastUpdate: number;
    }
}
