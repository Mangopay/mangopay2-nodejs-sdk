var api = require('./api');

function Error(e) {
    // Allow users to configure their own error handling mechanism
    if (api.config.errorHandler) {
        api.config.errorHandler(e);
    } else {
        _errorHandler(e)
    }
}

var _errorHandler = function(options) {
    console.error(options.message, options.error);
};

module.exports = Error;