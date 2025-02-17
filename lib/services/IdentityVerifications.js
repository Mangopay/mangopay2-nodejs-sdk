var Service = require('../service');
var IdentityVerification = require('../models/IdentityVerification');

var IdentityVerifications = Service.extend({
    /**
     * Start an identity verification session and get a link for the hosted experience
     */
    create: function(userId, identityVerification, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: identityVerification,
            dataClass: IdentityVerification,
            path: {
                userId: userId
            }
        });

        return this._api.method('identity_verification_create', callback, options);
    },
});

module.exports = IdentityVerifications;
