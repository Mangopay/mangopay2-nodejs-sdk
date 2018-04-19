var _ = require('underscore');
var expect = require('chai').expect;
var helpers = require('../helpers');

describe('KycDocuments', function() {
    var john = helpers.data.getUserNatural();
    var document;

    before(function(done){
        api.Users.create(john).then(function(){
            api.Users.createKycDocument(john.Id, {
                Status: 'CREATED',
                Type: 'IDENTITY_PROOF'
            }).then(function(data){
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
                     AfterDate: document.CreationDate - 10,
                     BeforeDate: document.CreationDate + 10
                 }
             });
        });

        it('should contain the created document', function () {
            expect(_.findWhere(documents, {Id: document.Id})).to.exist;
        });
    });

    describe('Get', function () {
        var getDocument;
        before(function(done){
            api.KycDocuments.get(document.Id, function(data, response){
                getDocument = data;
                done();
            });
        });

        it('should get the document', function () {
            expect(getDocument.Id).to.equal(document.Id);
        });
    });

    describe('Create KYC Document Consult', function () {
        var consults;

        before(function(done) {
            api.KycDocuments.createKycDocumentConsult(document.Id, function(data, response) {
                consults = data;
                done();
            });
        });

        it('should be created', function () {
            expect(consults).not.to.be.undefined;
            expect(consults).to.be.an('array');
        });
    });
});
