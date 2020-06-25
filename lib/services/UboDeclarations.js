var Service = require('../service');

var UboDeclaration = require('../models/UboDeclaration');
var Ubo = require('../models/Ubo');

var UboDeclarations = Service.extend({

    /**
     * Create a UBO declaration object from the API
     * @param {String} userId user Unique identifier
     * @param {Function} callback
     * @param {Object} options
     */
    create: function (userId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                userId: userId
            }
        });
        return this._api.method('ubo_declaration_create', callback, options);
    },

    /**
     * Retrieves a UBO declaration object from the API.
     * @param {String} userId User Unique identifier
     * @param {String} id Unique identifier
     * @param {Function} callback
     * @param {Object} options
     */
    get: function (userId, id, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                userId: userId,
                declarationId: id
            }
        });

        return this._api.method('ubo_declaration_get', callback, options);
    },

    getAll: function (userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, {parameters: {...options}});
        options = this._api._getOptions(callback, options, {
            path: {
                userId: userId
            }
        });
        return this._api.method('ubo_declarations_get', callback, options);
    },

    /**
     * Updates a UBO declaration entity.
     * @param {String} userId User Unique Identifier
     * @param {Object} uboDeclaration Updated UBO declaration entity - must have ID!
     * @param {Function} callback
     * @param {Object} options
     */
    update: function (userId, uboDeclaration, callback, options) {
        if (!uboDeclaration.Id) {
            this._api.errorHandler('Cannot update UBO declaration: Missing Id');
        }
        if (!uboDeclaration.Ubos) {
            this._api.errorHandler('Cannot update UBO declaration: Ubos null');
        }
        options = this._api._getOptions(callback, options, {
            data: uboDeclaration,
            path: {
                userId: userId,
                declarationId: uboDeclaration.Id
            }
        });
        return this._api.method('ubo_declaration_update', callback, options);
    },

    createUbo: function (userId, uboDeclarationId, ubo, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                userId: userId,
                declarationId: uboDeclarationId
            },
            data: ubo,
            dataClass: Ubo
        });
        return this._api.method('ubo_create', callback, options);
    },

    getUbo: function (userId, uboDeclarationId, uboId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                userId: userId,
                declarationId: uboDeclarationId,
                uboId: uboId
            }
        });
        return this._api.method('ubo_get', callback, options);
    },

    updateUbo: function (userId, uboDeclarationId, ubo, callback, options) {
        if (!ubo.Id) {
            this._api.errorHandler('Cannot update UBO: Ubo Id null');
        }
        options = this._api._getOptions(callback, options, {
            path: {
                userId: userId,
                declarationId: uboDeclarationId,
                uboId: ubo.Id
            },
            data: ubo,
            dataClass: Ubo
        });
        return this._api.method('ubo_update', callback, options);

    }
});

module.exports = UboDeclarations;