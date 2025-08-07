import { base } from "../base";
import { conversionRate } from "../models/conversionRate";
import { conversion } from "../models/conversion";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class Conversions {
    getConversionRate: TwoArgsMethodOverload<string, string, conversionRate.ConversionRateData>;

    createInstantConversion: MethodOverload<conversion.CreateInstantConversion, conversion.ConversionData>;

    createQuotedConversion: MethodOverload<conversion.CreateQuotedConversion, conversion.ConversionData>;

    createClientWalletsQuotedConversion: MethodOverload<conversion.CreateClientWalletsQuotedConversion, conversion.ConversionData>;

    createClientWalletsInstantConversion: MethodOverload<conversion.CreateClientWalletsInstantConversion, conversion.ConversionData>;

    getConversion: MethodOverload<string, conversion.ConversionData>;

    createQuote: MethodOverload<conversion.CreateQuote, conversion.QuoteData>;

    getQuote: MethodOverload<string, conversion.QuoteData>;
}
