# Cards

[MangoPay Cards API Reference](https://docs.mangopay.com/api-references/card/)



* * *

### Cards.get(cardId, callback, options) 

Get card

**Parameters**

**cardId**: `number`, Card identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Cards.getByFingerprint(fingerprint) 

Gets a list of cards having the same fingerprint.
The fingerprint is a hash uniquely generated per 16-digit card number.

**Parameters**

**fingerprint**: , The fingerprint hash

**Returns**: , List of Cards corresponding to provided fingerprint


### Cards.update(card, callback, options) 

Update card

**Parameters**

**card**: `Object`, Card object of properties hash

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise



* * *










