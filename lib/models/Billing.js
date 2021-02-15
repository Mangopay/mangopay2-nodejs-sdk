var EntityBase = require('./EntityBase');

var Billing = EntityBase.extend({
  defaults: {
    FirstName: null,
    LastName: null,
    /**
     * The address
     */
    Address: null
  }
});

module.exports = Billing;