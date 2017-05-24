var _ = require('underscore');
var Model = require('../Model');

var Mandate = Model.extend({
    defaults: {
        /**
         *  When the item was created
         */
        CreationDate: null,
        /**
         *  Custom data that you can add to this item
         */
        Tag: null,
        /**
         *  An ID of a Bank Account
         */
        BankAccountId: null,
        /**
         *  The object owner's UserId
         */
        UserId: null,
        /**
         *  The URL to redirect to after payment (whether successful or not)
         */
        ReturnURL: null,
        /**
         *  The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: null,
        /**
         *  The URL to download the mandate
         */
        DocumentURL: null,
        /**
         *  The language to use for the mandate confirmation page - needs to be the ISO code of the language
         */
        Culture: null,
        /**
         *  The type of mandate, but will only be completed once the mandate has been submitted
         */
        Scheme: null,
        /**
         *  The status of the mandate
         */
        Status: null,
        /**
         *  The result code
         */
        ResultCode: null,
        /**
         *  A verbal explanation of the ResultCode
         */
        ResultMessage: null,
        /**
         *  The execution type for creating the mandate
         */
        ExecutionType: 'WEB',
        /**
         *  The type of Mandate, defaults to DIRECT_DEBIT
         */
        MandateType: 'DIRECT_DEBIT',
        /**
         *  The bank reference
         */
        BankReference: null
    }
});

module.exports = Mandate;