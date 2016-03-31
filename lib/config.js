module.exports = {
    /**
     * Client Id
     */
    clientId: null,

    /**
     * Client Password
     */
    clientPassword: null,

    /**
     * Base URL to MangoPay API
     * Producion URL changes to baseUrl: 'https://api.mangopay.com'
     */
    baseUrl: 'https://api.sandbox.mangopay.com',

    /**
     * Path to folder with temporary files (with permissions to write)
     */
    temporaryFolder: null,

    /**
     * Absolute path to file holding one or more certificates to verify the peer with.
     * If empty - don't verifying the peer's certificate.
     */
    certificatesFilePath: null,

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
     responseTimeout: 80000,

    /**
     * Mangopay REST API version - will be appended in the front of the endpoints
     */
    apiVersion: 'v2',

    errorHandler: function(options) {
        console.error(options.message, options.error);
    }
};