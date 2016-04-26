/**
 * @module KycDocuments
 * @desc [MangoPay KYC Documents API Reference](https://docs.mangopay.com/api-references/kyc/documents/)
 */

var _ = require('underscore');

var Service = require('../service');
var KycDocument = require('../models/KycDocument');

var KycDocuments = Service.extend({
    /**
     * Get all KycDocuments
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    getAll: function(callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: KycDocument
        });

        return this._api.method('kyc_documents_all', callback, options);
    },

    /**
     * Get KycDocument
     * @param {number}  kycDocumentId   KycDocument identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                Request promise
     */
    get: function(kycDocumentId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: kycDocumentId
            },
            dataClass: KycDocument
        });

        return this._api.method('kyc_documents_get_alt', callback, options);
    }
});

module.exports = KycDocuments;