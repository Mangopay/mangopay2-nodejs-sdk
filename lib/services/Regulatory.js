var Service = require('../service');
const CountryAuthorization = require("../models/CountryAuthorization");

var Regulatory = Service.extend({

    /**
     * View the restrictions for a specific country
     * @param countryCode: the code of the Country
     */
    getCountryAuthorizations: function(countryCode, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                countryCode: countryCode
            },
            dataClass: CountryAuthorization
        });

        return this._api.method('countries_get_one', callback, options);
    },

    /**
     * View the restrictions for al countries
     */
    getAllCountriesAuthorizations: function(callback, options) {
        return this._api.method('countries_get_all', callback, options);
    }
});

module.exports = Regulatory;
