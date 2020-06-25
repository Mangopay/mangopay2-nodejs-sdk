/**
 * @module DisputeDocuments
 * @desc [MangoPay Dispute Documents API Reference](https://docs.mangopay.com/api-references/disputes/dispute-documents/)
 */

var _ = require('underscore');
var Service = require('../service');
var DisputeDocument = require('../models/DisputeDocument');

var DisputeDocuments = Service.extend({
    /**
     * Gets dispute's document
     * @param {number}  documentId      Document identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    get: function (documentId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: documentId
            },
            dataClass: DisputeDocument
        });

        return this._api.method('disputes_document_get', callback, options);
    },

    /**
     * Gets dispute's documents for client
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    getAll: function (callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            dataClass: DisputeDocument
        });

        return this._api.method('disputes_document_all', callback, options);
    },

    /**
     * Creates temporary URLs where each page of a dispute document can be viewed.
     *
     * @param {string} documentId       Document identifier
     * @param {Function} callback       Callback function
     * @param {Object} options          Request options
     * @return {Object}                 Request promise
     */
    createDisputeDocumentConsult: function (documentId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: documentId
            },
            dataClass: DisputeDocument
        });

        return this._api.method('disputes_document_create_consult', callback, options);
    }
});

module.exports = DisputeDocuments;