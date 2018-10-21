Mangopay Node.js SDK [![Build Status](https://travis-ci.org/Mangopay/mangopay2-nodejs-sdk.svg?branch=master)](https://travis-ci.org/Mangopay/mangopay2-nodejs-sdk)
=================================================
MangopaySDK is a Node.js client library to work with [Mangopay REST API](http://docs.mangopay.com/api-references/).


Installation
-------------------------------------------------
Install the module via npm

    npm install mangopay2-nodejs-sdk --save

Usage inside your app

    var mangopay = require('mangopay2-nodejs-sdk');

    var api = new mangopay({
        clientId: 'your_client_id',
        clientApiKey: 'your_client_api_key',
        // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
        baseUrl: 'https://api.mangopay.com'
    });

    api.Users.create(...)

Supported options 
-------------------------------------------------
| Option    | Default value | Description |
| --------  | -----------   | ----------- |
|clientId   |null      | API Client Id|
|clientApiKey|null| API Client Api Key|
|baseUrl|"https://api.sandbox.mangopay.com"| API Base URL. The fault base value points to sandbox. Production is 'https://api.mangopay.com'|
|debugMode|false| Active debugging|
|logClass|```function() {console.log(arguments)}```|Log function to be used for debug|
|connectionTimeout|30000|Set the connection timeout limit (in milliseconds)|
|responseTimeout|80000|Set the response timeout limit (in milliseconds)|
|apiVersion|'v2.01'|API Version|
|errorHandler|```function(options, err) {console.error(options, err)}```|Set a custom error handler

Documentation
-------------------------------------------------
[Github Full Node.js SDK Documentation](docs/README.md) is located in ``/docs`` folder.
You can also access [API References on our website](https://docs.mangopay.com/api-references/).

License
-------------------------------------------------
MangopaySDK is distributed under MIT license, see the [LICENSE file](LICENSE).

Contacts
-------------------------------------------------
Report bugs or suggest features using
[issue tracker on GitHub](https://github.com/Mangopay/mangopay2-nodejs-sdk/issues).

Account creation
-------------------------------------------------
You can get yourself a [free sandbox account](https://www.mangopay.com/signup/create-sandbox/) or sign up for a
[production account](https://www.mangopay.com/signup/production-account/) (note that validation of your production
account can take a few days, so think about doing it in advance of when you actually want to go live).

### Creating a user

#### Using a hash of properties:

    mangopay.Users.create({
        "FirstName": "Victor",
        "LastName": "Hugo",
        "Address": "1 rue des Misérables, Paris",
        "Birthday": 1300186358,
        "Nationality": "FR",
        "CountryOfResidence": "FR",
        "Occupation": "Writer",
        "IncomeRange": "6",
        "ProofOfIdentity": null,
        "ProofOfAddress": null,
        "PersonType": "NATURAL",
        "Email": "victor@hugo.com",
        "Tag": "custom tag",
    }, function(model) {
        // User created - using callback
    }).then(function(model){
        // User created - using promise
    });

#### Using Mangopay SDK pre-defined models:

    var myUser = new api.models.UserLegal({
        Name: 'MangoPay',
        Email: 'info@mangopay.com',
        LegalPersonType: 'BUSINESS',
        LegalRepresentativeFirstName: 'Mango',
        LegalRepresentativeLastName: 'Pay',
        LegalRepresentativeEmail: 'mango@mangopay.com',
        HeadquartersAddress: new api.models.Address({
            AddressLine1: "4101 Reservoir Rd NW",
            AddressLine2: "",
            City: "Washington",
            Region: "District of Columbia",
            PostalCode: "20007",
            Country: "US"
        }),
        LegalRepresentativeBirthday: 1300186358,
        LegalRepresentativeNationality: 'FR',
        LegalRepresentativeCountryOfResidence: 'FR',
        Tag: 'custom tag'
    });

    api.Users.create(myUser).then(function(){
        // Output the created user data to console
        console.log(myUser.Name + ' user created at ' + myUser.CreationDate);
    });

#### Promise vs Callback
Mangopay Node.js SDK supports both callback and promise approach.
Here is how they can be implemented :

    api.Service.method(... , function(data, response, err){
        // Callback method
    })

    api.Service.method(...).then(function(data) {
        // Promise function called
    }, function(error) {
        //exception
    })


### Pagination / Filtering
In order to [paginate](https://docs.mangopay.com/api-references/pagination/) or [filter](https://docs.mangopay.com/api-references/sort-lists/) results,
we can use ``options.parameters`` to specify these options:

    api.Transactions.getAll({
        parameters: {
            // Pagination
            per_page: 2,
            page: 2,

            // Filters
            BeforeDate: 1414000367,
            AfterDate: 1414000367,
            Nature: REGULAR,
            Status: FAILED,
            Type: TRANSFER
        }
    }

### Reading server response headers
For [reading the server response headers](examples/readResponseHeaders.js) we can use ``options.resolveWithFullResponse: true``

    api.Users.getAll(null, {
      parameters: {
        per_page: 1
      },
      resolveWithFullResponse: true
    }).then(function(response){
      // Read pages count
      console.log(response.headers['x-number-of-pages']);

      // Read response body
      console.log(response.body);
    });

Sample usage of Mangopay SDK installed with npm in a Node.js project
-------------------------------------------------
Don't forget to check examples folder !

Contributing
-------------------------------------------------
    npm start                       // installs dependencies and global mocha for testing and jsdox for documentation
    npm test                        // runs the mocha tests
    npm run-script documentation    // update documentation using jsdox, make sure to have it installed globally

Unit Tests
-------------------------------------------------
Mocha tests are placed under ``/test/`` folder. To run the tests, make sure you have all dependencies installed.
Check Contributing section for details.
