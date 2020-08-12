var Service = require('../service');
var _ = require('underscore');

var OptionsHelper = Service.extend({

    /**
     * Adds Idempotency-Key headers to the provided 'options' parameter
     * @param options
     * @param idempotencyKey
     */
    withIdempotency(options, idempotencyKey) {
        return _.extend(options, {
            headers: {
                "Idempotency-Key": idempotencyKey
            }
        });
    }
});

module.exports = OptionsHelper;
