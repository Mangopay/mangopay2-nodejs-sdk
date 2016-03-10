var mangopaySdk = require('./index');

mangopaySdk.Users.getAll(function(data) {
    console.log(data);
}, {
    path: { "id": 120 },
    parameters: { limit: 100, offset: 50 },
    headers: { "test-header": "client-api" }
});

debugger;