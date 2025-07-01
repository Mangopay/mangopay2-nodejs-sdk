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
        var fetchedAfterDelay;

        before(function (done) {
            api.Settlements.get(settlement.SettlementId).then(async function (data) {
                fetched = data;
                // wait for the API to process the file
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                await delay(10000);
                api.Settlements.get(settlement.SettlementId).then(function (data) {
                    fetchedAfterDelay = data;
                    done();
                });
            });
        });

        it('should be fetched', function () {
            expect(fetched).not.to.be.undefined;
            expect(fetchedAfterDelay).not.to.be.undefined;
            expect(fetched.Status).to.equal("UPLOADED");
            expect(fetchedAfterDelay.Status).to.equal("PARTIALLY_SETTLED");
        });
    });

    describe('Update', function () {
        var fetchedAfterUpdate;
        var updated;

        const filePath = path.resolve(__dirname, '../settlement_sample.csv');
        const fileBuffer = fs.readFileSync(filePath);

        before(function (done) {
            api.Settlements.update(settlement.SettlementId, fileBuffer).then(async function (data) {
                updated = data;
                // wait for the API to process the file
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                await delay(10000);
                api.Settlements.get(settlement.SettlementId).then(function (data) {
                    fetchedAfterUpdate = data;
                    done();
                });
            });
        });

        it('should be updated', function () {
            expect(updated).not.to.be.undefined;
            expect(fetchedAfterUpdate).not.to.be.undefined;
            expect(updated.Status).to.equal("UPLOADED");
            expect(fetchedAfterUpdate.Status).to.equal("PARTIALLY_SETTLED");
        });
    });
});
