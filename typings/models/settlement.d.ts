import {entityBase} from "./entityBase";

export namespace settlement {
    interface SettlementData extends entityBase.EntityBaseData {
        /**
         * The unique identifier of the settlement object
         */
        SettlementId: string;

        /**
         * The status of the settlement
         */
        Status: string;

        /**
         * The date at which the settlement was created by the external provider
         */
        SettlementDate: Timestamp;

        /**
         * The name of the external provider
         */
        ExternalProviderName: string;

        /**
         * The total amount declared through intent API calls with the following calculation:
         * (Sum of captured intents) - (Sum of refunds amounts) + (Sum of refund reversed amounts) - (Sum of DISPUTED disputes) + (Sum of WON disputes)
         */
        DeclaredIntentAmount: number;

        /**
         * The total fees charged by the external provider
         */
        ExternalProcessorFeesAmount: number;

        /**
         * The total amount due to the platform (to be held in escrow wallet).
         * This amount correspond to the TotalSettlementAmount from the settlement file.
         *
         * A negative amount will result in this parameter being set to zero, indicating no incoming funds to the escrow wallet.
         */
        ActualSettlementAmount: number;

        /**
         * The difference between ActualSettlementAmount and the amount received on the escrow wallet
         */
        FundsMissingAmount: number;
    }
}
