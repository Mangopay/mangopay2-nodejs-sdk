/**
 * WORK IN PROGRESS
 */

var Service = require('../service');

var UserNatural = require('../models/UserNatural');
var UserLegal = require('../models/UserLegal');

var Users = Service.extend({
    /**
     * Create a new user
     * @param {Object} user     Can be a UserNatural, UserLegal or a hash of user properties.
     * @return {Object}         Promise of the request
     */
    create: function(user, callback) {
        // TODO - Crazy case handling proof of concept
        if (user instanceof UserNatural) {
            // handle UserNatural
        } else if (user instanceof UserLegal) {
            // handle UserLegal
        } else {
            // Create a user from a plain object
            if (user.PersonType === 'NATURAL')  {
                user = new UserNatural(user);
            } else if (user.PersonType === 'LEGAL') {
                user = new UserLegal(user);
            } else {
                throw new this._api.Error('Invalid data for creating a user', user);
            }
        }

        return user.create(callback);
    },

    /**
     * Save user
     * @param {Object} user     User object to be saved
     * @return {Object}         Request promise
     */
    update: function(user, callback) {},

    /**
     * Get all users
     * @returns {Object}    Request promise
     */
    getAll: function(callback, options) {
        console.log('Get all users called');
        return this._api.method('users_all', function(data, response){
            callback(data, response);
        }, options);
    },
    getNatural: function(userId) {},
    getLegal: function(userId) {}
});

module.exports = Users;