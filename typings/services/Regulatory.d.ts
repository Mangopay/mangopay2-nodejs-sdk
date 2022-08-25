import { base } from "../base";
import { countryAuthorization } from "../models/countryAuthorization";
import MethodOverload = base.MethodOverload;
import NoArgMethodOverload = base.NoArgMethodOverload;

export class Regulatory {
    /**
     * View the restrictions for a specific country
     * @param countryCode: the code of the Country
     */
    getCountryAuthorizations: MethodOverload<string, countryAuthorization.CountryAuthorizationData>;

    /**
     * View the restrictions for al countries
     */
    getAllCountriesAuthorizations: NoArgMethodOverload<countryAuthorization.CountryAuthorizationData[]>;
}
