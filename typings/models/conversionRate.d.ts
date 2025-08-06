export namespace conversionRate {
    interface ConversionRateData {
        /**
         * The sell currency – the currency of the wallet to be debited
         */
        DebitedCurrency: string;

        /**
         * The buy currency – the currency of the wallet to be credited.
         */
        CreditedCurrency: string;

        /**
         * The market rate plus Mangopay's commission,
         * charged during the platform's billing cycle. This is an indicative rate.
         */
        ClientRate: string;

        /**
         * The rate used for the conversion, excluding Mangopay's commission.
         */
        MarketRate: string;

        /**
         *
         */
        MarketRateDate: number;
    }
}
