# Clients

[MangoPay Users API Reference](https://docs.mangopay.com/endpoints/v2.01/clients)



* * *

### Clients.get(clientId, callback, options) 

Get client by ID

**Parameters**

**clientId**: `string`, Client identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Clients.update(client, callback, options) 

Update client

**Parameters**

**client**: , Client to be updated

**callback**: , Callback function

**options**: , Request options

**Returns**: `*`, Promise of the request


### Clients.uploadLogo(logo, callback, options) 

Upload client logo

**Parameters**

**logo**: `string`, Logo

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Clients.uploadLogoFromFile(file, callback, options) 

Upload client logo from file

**Parameters**

**file**: `string`, File path

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Clients.getClientWallets(callback, options) 

Get all client wallets

**Parameters**

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Clients.getClientWallet(fundsType, currency, callback, options) 

Get a client wallet

**Parameters**

**fundsType**: , Wallet's funds type

**currency**: , Currency of the wallet

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Clients.getClientWalletsByFundsType(fundsType, callback, options) 

Get client wallets by the type of funds

**Parameters**

**fundsType**: , Wallets funds type

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Clients.getClientWalletTransactions(fundsType, currency, callback, options) 

Get a client wallet's transactions

**Parameters**

**fundsType**: , Wallet's funds type

**currency**: , Currency of the wallet

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request



* * *










