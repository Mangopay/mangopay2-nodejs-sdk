/**
 * @module BankAccounts
 */

var Service = require('../service');
var BankAccount = require('../models/BankAccount');

var BankAccounts = Service.extend({

    /**
     * Retrieve list of transactions for a bank account
     * @param   {number}    bankAccountId   Bank Account Id
     * @param   {Function}  callback        Callback function
     * @param   {Object}    options         Request options
     * @return  {Object}                    Request promise
     */
    getTransactions: function (bankAccountId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                bankAccountId: bankAccountId
            },
            dataClass: BankAccount
        });

        return this._api.method('transactions_get_for_bank_account', callback, options);
    }
});

module.exports = BankAccounts;