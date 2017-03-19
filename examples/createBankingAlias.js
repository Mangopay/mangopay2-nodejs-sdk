/**
 * Creating a banking alias example
 */
var mangopay = require('../index');

var api = new mangopay({
    clientId: 'sdk-unit-tests',
    clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
});


api.Users.create({
    FirstName: 'John_NodejsSDK',
    LastName: 'Doe_NodejsSDK',
    Email: 'john.doe@sample.org',
    Address: new api.models.Address({
        "AddressLine1": "4101 Reservoir Rd NW",
        "AddressLine2": "",
        "City": "Washington",
        "Region": "District of Columbia",
        "PostalCode": "20007",
        "Country": "US"
    }),
    Birthday: new Date('12/21/1975').getTime(),
    Nationality: 'FR',
    CountryOfResidence: 'FR',
    Occupation: 'programmer',
    IncomeRange: 3,
    PersonType: 'NATURAL'
}).then(function(user){
    wallet = {
        Owners: [user.Id],
        Currency: 'EUR',
        Description: 'WALLET IN EUR'
    };
    api.Wallets.create(wallet).then(function(){
        bankingAlias = new api.models.BankingAliasIBAN({
            CreditedUserId: user.Id,
            WalletId: wallet.Id,
            OwnerName: user.FirstName,
            Country: 'LU'
        });
        api.BankingAliases.create(bankingAlias).then(function(){
            api.Users.getTransactions(user.Id, function(data, response){
                transactions = data;
            }, {
                parameters: {
                    Type: 'PAYIN'
                }
            });
        });
    });
});