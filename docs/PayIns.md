# PayIns

[MangoPay PayIns API Reference](https://docs.mangopay.com/api-references/payins/payin-payment-methods/)



* * *

### PayIns.create(payIn, callback, options) 

Create new pay-in

**Parameters**

**payIn**: `Object`, PayIn object

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### PayIns.get(payInId, callback, options) 

Get pay-in

**Parameters**

**payInId**: `number`, PayIn identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### PayIns.createRefund(payInId, refund, callback, options) 

Create refund for pay-in object

**Parameters**

**payInId**: `number`, PayIn identifier

**refund**: `Object`, Refund data

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### PayIns.createTemporaryImmediatePayIn(immediatePayIn, callback, options) 

Create new temporary immediate pay-in (WARNING It's temporary entity and it will be removed in the future. Please, contact with support before using these features or if you have any questions.)

**Parameters**

**immediatePayIn**: `Object`, Immediate pay-in object

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise



* * *










