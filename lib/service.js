function Service() {
    this.initialize();
}

Service.prototype = {
    initialize: function() {}
};

Service.extend = require('./utils').extend;

module.exports = Service;