var Service = require('../service');

var UboDeclaration = require('../models/UboDeclaration');

var UboDeclarations = Service.extend({

    /**
     * Retrieves a UBO declaration object from the API.
     * @param {String} id Unique identifier
     * @param {Function} callback
     * @param {Object} options
     */
    get: function(id, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                declarationId: id
            }
        });

        return this._api.method('ubo_declaration_get', callback, options);
    },

    /**
     * Updates a UBO declaration entity.
     * @param {Object} uboDeclaration Updated UBO declaration entity - must have ID!
     * @param {Function} callback
     * @param {Object} options
     */
    update: function(uboDeclaration, callback, options) {
        if (!uboDeclaration.Id) {
            this._api.errorHandler('Cannot update UBO declaration: Missing Id');
        }
        var declaredUboIds = [];
        uboDeclaration.DeclaredUBOs.forEach(function(ubo) {
            if(typeof ubo === 'object') {
                declaredUboIds.push(ubo.UserId);
            } else {
                declaredUboIds.push(ubo);
            }
        });
        uboDeclaration.DeclaredUBOs = declaredUboIds;
        options = this._api._getOptions(callback, options, {
            data: uboDeclaration,
            path: {
                declarationId: uboDeclaration.Id
            }
        });

        return this._api.method('ubo_declaration_update', callback, options);
    }
});

module.exports = UboDeclarations;