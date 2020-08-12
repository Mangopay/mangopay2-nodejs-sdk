var Service = require('../service');
var IdempotencyResponse = require('../models/IdempotencyResponse');

var Idempotency = Service.extend({
    get: function(idempotencyKey, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                idempotencyKey: idempotencyKey
            },
            dataClass: IdempotencyResponse
        });

        return this._api.method('idempotency_response_get', callback, options);
    },
});

module.exports = Idempotency;
