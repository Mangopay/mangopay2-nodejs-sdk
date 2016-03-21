var _ = require('underscore');

function Service() {
    _.bindAll(this, 'initialize');
    this.initialize();
}

Service.prototype = {
    initialize: function() {}
};

Service.extend = require('./utils').extend;

module.exports = Service;