module.exports = {
    /**
     * Client Id
     */
    clientId: null,

    /**
     * Client api key
     */
    clientApiKey: null,

    /**
     * Base URL to MangoPay API
     * Production URL changes to baseUrl: 'https://api.mangopay.com'
     */
    baseUrl: 'https://api.sandbox.mangopay.com',

    /**
     * [INTERNAL USAGE ONLY]
     * Switch debug mode: log all request and response data
     */
    debugMode: false,

    /**
     * Set the logging class if DebugMode is enabled
     */
    logClass: require('./log'),

    /**
     * Set the connection timeout limit (in milliseconds)
     */
    connectionTimeout: 30000,

    /**
     * Set the response timeout limit (in milliseconds)
     */
     responseTimeout: 30000,

    /**
     * Mangopay REST API version - will be appended in the front of the endpoints
     * @deprecated It will be handled internally
     */
    apiVersion: 'v2.01',

    /**
     *  Set to true for uk traffic
     */
    ukHeaderFlag: false,

    /**
     * Custom error handler
     */
    errorHandler: function(options, err) {
        console.error(options, err);
    }
};
