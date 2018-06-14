var EntityBase = require('./EntityBase');

var SecurityInfo = EntityBase.extend({
  defaults: {
    /**
     * The address
     */
    AVSResult: null
  }
});

module.exports = SecurityInfo;