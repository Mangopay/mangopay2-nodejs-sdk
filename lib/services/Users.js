/**
 * WORK IN PROGRESS
 */
var UserNatural = require('../models/UserNatural');
var UserLegal = require('../models/UserLegal');

function Users(api) {
    this._api = api;
}

Users.prototype = {
    /**
     * Get all users
     * @returns {*}
     */
    getAll: function(callback, options) {
        console.log('Get all users called');
        return this._api.method('users_all', function(data, response){
            callback(data, response);
        }, options);
    },

    /**
     * Create a new user
     * @param {object} user     Can be a UserNatural, UserLegal or a hash of user properties.
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
                throw new api.Error('Invalid data for creating a user', user);
            }
        }

        return user.create(callback);
    }
};

module.exports = Users;