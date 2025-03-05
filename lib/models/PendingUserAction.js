var EntityBase = require('./EntityBase');

var PendingUserAction = EntityBase.extend({
    defaults: {
        /**
         * The URL to which to redirect the user to perform strong customer authentication (SCA) via a Mangopay-hosted webpage. This value is a variable and should not be hardcoded.
         * <p>
         * Caution: Before redirecting the user on this URL, you must add the query parameter ReturnUrl with the percent-encoded URL to which you want the SCA session to return the user after authentication (whether successful or not).
         * <p>
         * For more details, see <a href="https://docs.mangopay.com/guides/users/sca#how-to-redirect-a-user-for-an-sca-session">How to redirect a user for an SCA session</a>
         */
        RedirectUrl: null
    }
});

module.exports = PendingUserAction;