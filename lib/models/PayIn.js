var _ = require('underscore');
var Transaction = require('./Transaction');

var PayIn = Transaction.extend({
    defaults: _.extend({}, Transaction.prototype.defaults, {
        CreditedWalletId: null,
        /**
         * PaymentType (CARD, BANK_WIRE, AUTOMATIC_DEBIT, DIRECT_DEBIT)
         */
        PaymentType: null,
        /**
         * One of PayInPaymentDetails implementations, depending on PaymentType
         */
        PaymentDetails: null,
        /**
         * ExecutionType (WEB, TOKEN, DIRECT, PREAUTHORIZED, RECURRING_ORDER_EXECUTION)
         */
        ExecutionType: null,
        /**
         * One of PayInExecutionDetails implementations, depending on ExecutionType
         */
        ExecutionDetails: null
    }),

    getReadOnlyProperties: function() {
        var properties = Transaction.prototype.getReadOnlyProperties();
        properties.push('PaymentType', 'ExecutionType');
        return properties;
    }
});

module.exports = PayIn;