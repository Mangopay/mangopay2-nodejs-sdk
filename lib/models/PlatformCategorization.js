var EntityBase = require('./EntityBase');

var PlatformCategorization = EntityBase.extend({
  defaults: {
    /**
     * The type of business conducted by the client
     */
    BusinessType: null,
    /**
     * Sector of business
     */
    Sector: null
  }
});

module.exports = PlatformCategorization;