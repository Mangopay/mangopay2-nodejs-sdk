var expect = require('chai').expect;
var helpers = require('../helpers');

describe('KycDocuments', function() {
    var john = helpers.data.UserNatural;
    var document;

    before(function(done){
        api.Users.create(john).then(function(){
            api.Users.createKycDocument(john.Id, {
                Status: 'CREATED',
                Type: 'IDENTITY_PROOF'
            }).then(function(data, response){
                document = data;
                done();
            });
        });
    });

    describe('Get All', function () {
        var documents;
        before(function(done){
             api.KycDocuments.getAll(function(data, response){
                 documents = data;
                 done();
             }, {
                 parameters: {
                     Sort: 'CreatedDate:desc'
                 }
             })
        });

        it('should contain the document', function () {
            expect(_.findWhere(documents, {Id: document.Id})).to.exist;
        });
    });
});
