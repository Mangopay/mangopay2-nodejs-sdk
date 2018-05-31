var EntityBase = require('./EntityBase');

var PlatformCategorization = EntityBase.extend({
  defaults: {
    BusinessType: null,
    Sector: null
  }
});

module.exports = PlatformCategorization;