/**
 * @module BankAccounts
 */

var Service = require('../service');
var Transaction = require('../models/Transaction');

var BankAccounts = Service.extend({

    /**
     * Retrieve list of transactions for a bank account
     * @param   {number}    bankAccountId   Bank Account Id
     * @param   {Function}  callback        Callback function
     * @param   {Object}    options         Request options
     * @return  {Object}                    Request promise
     */
    getTransactions: function (bankAccountId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                bankAccountId: bankAccountId
            },
            dataClass: Transaction
        });

        return this._api.method('transactions_get_for_bank_account', callback, options);
    }
});

module.exports = BankAccounts;