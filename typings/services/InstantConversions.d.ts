import {base} from "mangopay2-nodejs-sdk";
import {conversionRate} from "../models/conversionRate";
import {instantConversion} from "../models/instantConversion";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class InstantConversions {
    getConversionRate: TwoArgsMethodOverload<string, string, conversionRate.ConversionRateData>;

    createInstantConversion: MethodOverload<instantConversion.CreateInstantConversion, instantConversion.InstantConversionData>;

    getInstantConversion: MethodOverload<string, instantConversion.InstantConversionData>;
}
