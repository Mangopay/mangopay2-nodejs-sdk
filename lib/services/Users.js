/**
 * WORK IN PROGRESS
 */
var _ = require('underscore');
var Service = require('../service');

var UserNatural = require('../models/UserNatural');
var UserLegal = require('../models/UserLegal');
var PersonType = require('../models/PersonType');

var Users = Service.extend({
    /**
     * Create a new user
     * @param {Object} user     Can be a UserNatural, UserLegal or a hash of user properties.
     * @return {Object}         Promise of the request
     */
    create: function(user, callback, options) {
        options = this._api._getOptions(callback, options);

        // If it's a Model instance, attributes will be retrieved from data, otherwise it should be a hash of props
        var userData = user.data || user;

        options = _.extend(options, {
            data: user
        });

        var userCreateDetails = this._getUserApiAndClass(user);
        options.dataClass = userCreateDetails.userClass;

        if (!userCreateDetails) {
            this._api.errorHandler({
                message: 'Invalid data for creating a user',
                error: user
            });
        }

        return this._api.method(userCreateDetails.createApiMethod, callback, options);
    },

    /**
     * Get all users
     * @returns {Object}    Request promise
     */
    getAll: function(callback, options) {
        return this._api.method('users_all', callback, options);
    },

    /**
     * Get natural or legal user by ID
     * @param {number}  userId  User identifier
     * @param callback
     * @param options
     * @returns {Object}        Request promise
     */
    get: function(userId, callback, options) {
        options = this._api._getOptions(callback, options);
        options = _.extend({}, options, {
            path: {
                id: userId
            }
        });

        return this._api.method('users_get', callback, options);
    },

    /**
     * Get natural user by ID
     * @param {number} userId       User identifier
     * @param callback              Callback function
     * @param {Object}  options     Request options
     * @return {Object}             Request promise
     */
    getNatural: function(userId, callback, options) {
        options = this._api._getOptions(callback, options);
        options = _.extend({}, options, {
            path: {
                id: userId
            },
            dataClass: UserNatural
        });

        return this._api.method('users_getnaturals', callback, options);
    },

    /**
     * Get legal user by ID
     * @param {number} userId       User identifier
     * @param callback              Callback function
     * @param {Object}  options     Request options
     * @return {Object}             Request promise
     */
    getLegal: function(userId, callback, options) {
        options = this._api._getOptions(callback, options);
        options = _.extend({}, options, {
            path: {
                id: userId
            },
            dataClass: UserLegal
        });

        return this._api.method('users_getlegals', callback, options);
    },

    /**
     * Save user
     * @param {Object} user     User object to be saved
     * @return {Object}         Request promise
     */
    update: function(user, callback, options) {
        options = this._api._getOptions(callback, options);

        var userSaveDetails = this._getUserApiAndClass(user);
        options.dataClass = userSaveDetails.userClass;

        if (!userSaveDetails) {
            this._api.errorHandler({
                message: 'Invalid data for saving a user',
                error: user
            });
        }

        return this._api.method(userSaveDetails.saveApiMethod, callback, options);
    },

    /**
     * Gets the details for a user instance of hash of properties
     * @param {Object}  user
     */
    _getUserApiAndClass: function(user) {
        if (user instanceof UserNatural || user.PersonType === PersonType.Natural) {
            return {
                createApiMethod: 'users_createnaturals',
                saveApiMethod: 'users_savelegals',
                userClass: UserNatural
            };
        } else if (user instanceof UserLegal || user.PersonType === PersonType.Legal) {
            return {
                createApiMethod: 'users_createlegals',
                saveApiMethod: 'users_savelegals',
                userClass: UserLegal
            };
        }

        return;
    }
});

module.exports = Users;