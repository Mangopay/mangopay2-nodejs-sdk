# Global





* * *

### create(user) 

Create a new user

**Parameters**

**user**: `Object`, Can be a UserNatural, UserLegal or a hash of user properties.

**Returns**: `Object`, Promise of the request


### getAll() 

Get all users

**Returns**: `Object`, Request promise


### get(userId, callback, options) 

Get natural or legal user by ID

**Parameters**

**userId**: `number`, User identifier

**callback**: , Get natural or legal user by ID

**options**: , Get natural or legal user by ID

**Returns**: `Object`, Request promise


### getNatural(userId, callback, options) 

Get natural user by ID

**Parameters**

**userId**: `number`, User identifier

**callback**: , Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### getLegal(userId, callback, options) 

Get legal user by ID

**Parameters**

**userId**: `number`, User identifier

**callback**: , Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### update(user, callback, options) 

Save user

**Parameters**

**user**: `Object`, User object to be saved

**callback**: `function`, Save user

**options**: `Object`, Save user

**Returns**: `Object`, Request promise


### createBankAccount(userId, bankAccount, callback, options) 

Create bank account for user

**Parameters**

**userId**: `number`, User identifier

**bankAccount**: `Object`, Bank account object

**callback**: `function`, Create bank account for user

**options**: `Object`, Create bank account for user

**Returns**: `Object`, Request promise


### getBankAccounts(userId, callback, options) 

Get all bank accounts for user

**Parameters**

**userId**: `number`, User identifier

**callback**: `function`, Get all bank accounts for user

**options**: `Object`, Get all bank accounts for user

**Returns**: `Object`, Request promise


### getBankAccount(userId, bankAccountId, callback, options) 

Get all bank accounts for user

**Parameters**

**userId**: `number`, User identifier

**bankAccountId**: `number`, Bank account id

**callback**: `function`, Get all bank accounts for user

**options**: `Object`, Get all bank accounts for user

**Returns**: `Object`, Request promise


### getWallets(userId, callback, options) 

Get all wallets accounts for user

**Parameters**

**userId**: `number`, User identifier

**callback**: `function`, Get all wallets accounts for user

**options**: `Object`, Get all wallets accounts for user

**Returns**: `Object`, Request promise


### getTransactions(userId, callback, options) 

Get all transactions for user

**Parameters**

**userId**: `number`, User identifier

**callback**: `function`, Get all transactions for user

**options**: `Object`, Get all transactions for user

**Returns**: `Object`, Request promise


### getCards(userId, callback, options) 

Get all cards for user

**Parameters**

**userId**: `number`, User identifier

**callback**: `function`, Get all cards for user

**options**: `Object`, Get all cards for user

**Returns**: `Object`, Request promise


### createKycDocument(userId, kycDocument, callback, options) 

Create new KYC document

**Parameters**

**userId**: `number`, User identifier

**kycDocument**: `Object`, Create new KYC document

**callback**: `function`, Create new KYC document

**options**: `Object`, Create new KYC document

**Returns**: `Object`, Request promise


### getKycDocuments(userId, callback, options) 

Get all KYC documents for user

**Parameters**

**userId**: `number`, Get all KYC documents for user

**callback**: `function`, Get all KYC documents for user

**options**: `object`, Get all KYC documents for user

**Returns**: `Object`, Request promise


### getKycDocument(userId, kycDocumentId, callback, options) 

Get KYC document

**Parameters**

**userId**: `number`, Get KYC document

**kycDocumentId**: `number`, Get KYC document

**callback**: `function`, Get KYC document

**options**: `object`, Get KYC document

**Returns**: `Object`, Request promise


### updateKycDocument(userId, kycDocumentId, callback, options) 

Save KYC document

**Parameters**

**userId**: `number`, Save KYC document

**kycDocumentId**: `number`, Save KYC document

**callback**: `function`, Save KYC document

**options**: `object`, Save KYC document

**Returns**: `Object`, Request promise


### createKycPage(userId, kycDocumentId, kycPage, callback, options) 

Create page for KYC document

**Parameters**

**userId**: `number`, Create page for KYC document

**kycDocumentId**: `number`, Create page for KYC document

**kycPage**: `Object`, Create page for KYC document

**callback**: `function`, Create page for KYC document

**options**: `Object`, Create page for KYC document

**Returns**: `Object`, Request promise


### createKycPageFromFile(userId, kycDocumentId, file, callback, options) 

Create page for KYC document

**Parameters**

**userId**: `number`, Create page for KYC document

**kycDocumentId**: `number`, Create page for KYC document

**file**: `string`, File path

**callback**: `function`, Create page for KYC document

**options**: `Object`, Create page for KYC document

**Returns**: `Object`, Request promise



* * *










