/**
 * @module Disputes
 * @desc [MangoPay Disputes API Reference](https://docs.mangopay.com/api-references/disputes/)
 */

var _ = require('underscore');
var fs = require('fs');

var Service = require('../service');
var Dispute = require('../models/Dispute');
var Transaction = require('../models/Transaction');
var Repudiation = require('../models/Repudiation');
var Transfer = require('../models/Transfer');
var DisputeDocument = require('../models/DisputeDocument');
var DisputeDocumentPage = require('../models/DisputeDocumentPage');
var Money = require('../models/Money');

var Disputes = Service.extend({
    /**
     * Get dispute
     * @param {number}  disputeId       Dispute identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    get: function(disputeId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: disputeId
            },
            dataClass: Dispute
        });

        return this._api.method('disputes_get', callback, options);
    },

    /**
     * Get all disputes
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Request promise
     */
    getAll: function(callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            dataClass: Dispute
        });

        return this._api.method('disputes_all', callback, options);
    },

    /**
     * Update dispute's tag
     * @param {Object}      dispute     Dispute object of properties hash
     * @param {function}    callback    Callback function
     * @param {Object}      options     Request options
     * @return {Object}                 Request promise
     */
    update: function(dispute, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: dispute,
            path: {
                id: dispute.Id
            },
            dataClass: Dispute
        });

        return this._api.method('disputes_save_tag', callback, options);
    },

    /**
     * Contest dispute
     * @param {number}  disputeId       Dispute id
     * @param {Money}   contestedFunds  Contested funds
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Promise of the request
     */
    contestDispute: function(disputeId, contestedFunds, callback, options) {
        contestedFunds = (contestedFunds instanceof Money) ? contestedFunds : new Money(contestedFunds);

        var dispute = new Dispute({
            Id: disputeId,
            ContestedFunds: contestedFunds
        });

        options = this._api._getOptions(callback, options, {
            data: dispute,
            path: {
                id: dispute.Id
            },
            dataClass: Dispute
        });

        return this._api.method('disputes_save_contest_funds', callback, options);
    },

    /**
     * This method is used to resubmit a Dispute if it is reopened requiring more docs
     * @param {number}  disputeId   Dispute id
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Promise of the request
     */
    resubmitDispute: function(disputeId, callback, options) {
        var dispute = new Dispute({
            Id: disputeId
        });

        options = this._api._getOptions(callback, options, {
            data: dispute,
            path: {
                id: dispute.Id
            },
            dataClass: Dispute
        });

        return this._api.method('disputes_save_contest_funds', callback, options);
    },

    /**
     * Close dispute
     * @param {number}  disputeId   Dispute id
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Promise of the request
     */
    closeDispute: function(disputeId, callback, options) {
        var dispute = new Dispute({
            Id: disputeId
        });

        options = this._api._getOptions(callback, options, {
            data: dispute,
            path: {
                id: dispute.Id
            },
            dataClass: Dispute
        });

        return this._api.method('dispute_save_close', callback, options);
    },

    /**
     * Gets dispute's transactions
     * @param {number}  disputeId       Dispute identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    getTransactions: function(disputeId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: disputeId
            },
            dataClass: Transaction
        });

        return this._api.method('disputes_get_transactions', callback, options);
    },

    /**
     * Gets dispute's documents for wallet
     * @param {number}  walletId        Wallet identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    getDisputesForWallet: function(walletId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: walletId
            },
            dataClass: Dispute
        });

        return this._api.method('disputes_get_for_wallet', callback, options);
    },

    /**
     * Gets user's disputes
     * @param {number}  userId          User identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    getDisputesForUser: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: userId
            },
            dataClass: Dispute
        });

        return this._api.method('disputes_get_for_user', callback, options);
    },

    /**
     * Gets repudiation
     * @param {number}  repudiationId   Repudiation identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    getRepudiation: function(repudiationId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: repudiationId
            },
            dataClass: Repudiation
        });

        return this._api.method('disputes_repudiation_get', callback, options);
    },

    /**
     * Creates settlement transfer
     * @param {Object}  settlementTransfer  Settlement transfer
     * @param {number}  repudiationId       Repudiation identifier
     * @param {Function} callback           Callback function
     * @param {Object} options              Request options
     * @return {Object}                     Promise of the request
     */
    createSettlementTransfer: function(settlementTransfer, repudiationId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: repudiationId
            },
            dataClass: Transfer,
            data: settlementTransfer
        });

        return this._api.method('disputes_repudiation_create_settlement', callback, options);
    },

    /**
     * Gets settlement transfer
     * @param {number}  settlementTransferId    Settlement Transfer identifier
     * @param {Function} callback               Callback function
     * @param {Object} options                  Request options
     * @return {Object}                         Request promise
     */
    getSettlementTransfer: function(settlementTransferId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: settlementTransferId
            },
            dataClass: Transfer
        });

        return this._api.method('disputes_repudiation_get_settlement', callback, options);
    },

    /**
     * Gets documents for dispute
     * @param {number}  disputeId       Dispute identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    getDocumentsForDispute: function(disputeId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                id: disputeId
            },
            dataClass: DisputeDocument
        });

        return this._api.method('disputes_document_get_for_dispute', callback, options);
    },

    /**
     * Update dispute document
     * @param {number}  disputeId           Dispute identifier
     * @param {Object}  disputeDocument     Dispute document
     * @param {Function} callback           Callback function
     * @param {Object} options              Request options
     * @return {Object}                     Promise of the request
     */
    updateDisputeDocument: function(disputeId, disputeDocument, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: disputeId,
                documentId: disputeDocument.Id
            },
            data: disputeDocument,
            dataClass: DisputeDocument
        });

        return this._api.method('disputes_document_save', callback, options);
    },

    /**
     * Creates document for dispute
     * @param {number}  disputeId           Dispute Id
     * @param {Object}  disputeDocument     Dispute document
     * @param {Function} callback           Callback function
     * @param {Object} options              Request options
     * @return {Object}                     Promise of the request
     */
    createDisputeDocument: function(disputeId, disputeDocument, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: disputeId
            },
            data: disputeDocument,
            dataClass: DisputeDocument
        });

        return this._api.method('disputes_document_create', callback, options);
    },

    /**
     * Creates document's page for dispute
     * @param {number}  disputeId               Dispute identifier
     * @param {number}  disputeDocumentId       Dispute document identifier
     * @param {Object}  disputeDocumentPage     Dispute document page
     * @param {Function} callback               Callback function
     * @param {Object} options                  Request options
     * @return {Object}                         Promise of the request
     */
    createDisputeDocumentPage: function(disputeId, disputeDocumentId, disputeDocumentPage, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: disputeId,
                documentId: disputeDocumentId
            },
            data: disputeDocumentPage
        });

        return this._api.method('disputes_document_page_create', callback, options);
    },

    /**
     * Creates document's page for dispute from file
     * @param {number}  disputeId               Dispute identifier
     * @param {number}  disputeDocumentId       Dispute document identifier
     * @param {string}  file                    File path
     * @param {Function} callback               Callback function
     * @param {Object} options                  Request options
     * @return {Object}                         Promise of the request
     */
    createDisputeDocumentPageFromFile: function(disputeId, disputeDocumentId, file, callback, options) {
        if (!file) {
            this._api.errorHandler('File path cannot be empty');
            return;
        }

        try {
            fs.statSync(file);
        } catch (e) {
            this._api.errorHandler('File does not exist');
            return;
        }

        var disputeDocumentPage = new DisputeDocumentPage({
            File: Buffer.from(fs.readFileSync(file)).toString('base64')
        });

        if (!disputeDocumentPage.File) this._api.errorHandler('Content of the file cannot be empty');
        return this.createDisputeDocumentPage(disputeId, disputeDocumentId, disputeDocumentPage, callback, options);
    },

    /**
     * Retrieve a list of Disputes pending settlement
     * @param {function}    callback    Callback function
     * @param {object}      options     Request options
     * @return {object}                 Request promise
     */
    getPendingSettlement: function(callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: Dispute
        });

        return this._api.method('disputes_pending_settlement', callback, options);
    }
});

module.exports = Disputes;