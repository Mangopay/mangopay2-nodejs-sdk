var expect = require('chai').expect;
var api = require('../main');
const path = require("path");
const fs = require('fs');

describe('Settlements', function () {
    var settlement;

    before(function (done) {
        const filePath = path.resolve(__dirname, '../settlement_sample.csv');
        const fileBuffer = fs.readFileSync(filePath);

        api.Settlements.upload(fileBuffer).then(function (data, response) {
            settlement = data;
            done();
        });
    });

    it('should be created', function () {
        expect(settlement).not.to.be.undefined;
        expect(settlement.Status).to.equal("UPLOADED");
    });

    describe('Fetch', function () {
        var fetched;

        before(function (done) {
            api.Settlements.get(settlement.SettlementId).then(async function (data) {
                fetched = data;
                done();
            });
        });

        it('should be fetched', function () {
            expect(fetched).not.to.be.undefined;
            expect(fetched.Status).to.equal("UPLOADED");
        });
    });

    describe('Update', function () {
        var updated;

        const filePath = path.resolve(__dirname, '../settlement_sample.csv');
        const fileBuffer = fs.readFileSync(filePath);

        before(function (done) {
            api.Settlements.update(settlement.SettlementId, fileBuffer).then(async function (data) {
                updated = data;
                done();
            });
        });

        it('should be updated', function () {
            expect(updated).not.to.be.undefined;
            expect(updated.Status).to.equal("UPLOADED");
        });
    });
});
