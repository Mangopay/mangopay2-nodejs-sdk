Mangopay Node.js SDK
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
        clientPassword: 'your_client_password'
    });
    
    api.Users.create(...)
    
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
[production account](https://www.mangopay.com/signup/submit-your-app/go-live/) (note that validation of your production 
account can take a few days, so think about doing it in advance of when you actually want to go live).


Configuration
-------------------------------------------------


Sample usage
-------------------------------------------------
Don't forget to check examples folder !
    
### Creating a user

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
    });;
    
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


Sample usage of Mangopay SDK installed with npm in a Node.js project
-------------------------------------------------
Don't forget to check examples folder !

Contributing
-------------------------------------------------
    npm start                       // installs dependencies and global mocha for testing and jsdox for documentation
    npm test                        // runs the mocha tests
    npm run-script documentation    // update documentation using jsdox
    
Unit Tests
-------------------------------------------------
Mocha tests are placed under ``/test/`` folder. To run the tests, make sure you have all dependencies installed.
Check Contributing section for details.