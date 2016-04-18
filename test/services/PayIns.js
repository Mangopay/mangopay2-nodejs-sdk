//var _ = require('underscore');
//var path = require('path');
//var Promise = require('promise');
//var expect = require('chai').expect;
//var assert = require('chai').assert;
//var sinon = require('sinon');
//
//var helpers = require('../helpers');
//
//
//
//describe('PayIns', function() {
//    var john = helpers.data.UserNatural;
//    john.PersonType = 'NATURAL';
//    var wallet, payIn;
//
//    before(function(done){
//        api.Users.create(john).then(function(){
//            wallet = {
//                Owners: [john.Id],
//                Currency: 'EUR',
//                Description: 'WALLET IN EUR'
//            };
//
//            api.Wallets.create(wallet).then(function(){
//                payIn = {
//                    AuthorId: john.Id,
//                    CreditedUserId: john.Id,
//                    DebitedFunds: {
//                        Currency: 'EUR',
//                        Amount: 10000
//                    },
//                    Fees: {
//                        Currency: 'EUR',
//                        Amount: 5
//                    },
//                    CreditedWalletId: wallet.id,
//                    CardType: 'CB_VISA_MASTERCARD',
//                    ReturnURL: 'https://test.com',
//                    TemplateURL: 'https://TemplateURL.com',
//                    'SecureMode':  'DEFAULT',
//                    'Culture': 'fr'
//                };
//                done();
//            });
//        })
//    });
//});