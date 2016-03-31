Mangopay Node.js SDK
=================================================
MangopaySDK is a JavaScript client library to work with
[Mangopay REST API](http://docs.mangopay.com/api-references/).


Installation
-------------------------------------------------


License
-------------------------------------------------
MangopaySDK is distributed under MIT license, see the 
[LICENSE file](https://github.com/Mangopay/mangopay2-node-sdk/blob/master/LICENSE).


Unit Tests
-------------------------------------------------
Tests are placed under /test/ folder


Contacts
-------------------------------------------------
Report bugs or suggest features using
[issue tracker on GitHub](https://github.com/Mangopay/mangopay2-node-sdk).

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
Directly instantiate models available and work with them.

    var UserNatural = require('./lib/models/UserNatural');
    
    var userNatural = new UserNatural();
    userNatural.getReadOnlyProperties();
    
### Creating a user ###
Using a model 

    var UserNatural = require('./lib/models/UserNatural');
    
    var victorHugo = new UserNatural({
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
    });
    
    mangopay.Users.create(victorHugo).then(function(model){ 
        // User created - using promise
    });
    
Using a hash of properties - **PersonType is mandatory** in this case !

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
    });


Sample usage of Mangopay SDK installed with npm in a Node.js project
-------------------------------------------------
Don't forget to check examples folder !

Logging
-------------------------------------------------