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
Directly instantiate models available and work with them.

    var UserNatural = require('./lib/models/UserNatural');
    
    var userNatural = new UserNatural();
    userNatural.getReadOnlyProperties();


Sample usage of Mangopay SDK installed with npm in a Node.js project
-------------------------------------------------


Logging
-------------------------------------------------