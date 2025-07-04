var EntityBase = require('./EntityBase');

var Settlement = EntityBase.extend({
    defaults: {
        SettlementId: null,
        Status: null,
        SettlementDate: null,
        ExternalProviderName: null,
        DeclaredIntentAmount: null,
        ExternalProcessorFeesAmount: null,
        ActualSettlementAmount: null,
        FundsMissingAmount: null
    }
});

module.exports = Settlement;