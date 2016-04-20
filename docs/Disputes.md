# Disputes

[MangoPay Disputes API Reference](https://docs.mangopay.com/api-references/disputes/)



* * *

### Disputes.get(disputeId, callback, options) 

Get dispute

**Parameters**

**disputeId**: `number`, Dispute identifier

**callback**: , Get dispute

**options**: , Get dispute

**Returns**: `Object`, Request promise


### Disputes.getAll(callback, options) 

Get all disputes

**Parameters**

**callback**: , Get all disputes

**options**: , Get all disputes

**Returns**: `Object`, Request promise


### Disputes.update(dispute, callback, options) 

Update dispute's tag

**Parameters**

**dispute**: `Object`, Dispute object of properties hash

**callback**: `function`, Update dispute's tag

**options**: `Object`, Update dispute's tag

**Returns**: `Object`, Request promise


### Disputes.contestDispute(disputeId, contestedFunds, callback, options) 

Contest dispute

**Parameters**

**disputeId**: `number`, Dispute id

**contestedFunds**: `Money`, Contested funds

**callback**: , Contest dispute

**options**: , Contest dispute

**Returns**: `Object`, Promise of the request


### Disputes.resubmitDispute(disputeId, callback, options) 

This method is used to resubmit a Dispute if it is reopened requiring more docs

**Parameters**

**disputeId**: `number`, Dispute id

**callback**: , This method is used to resubmit a Dispute if it is reopened requiring more docs

**options**: , This method is used to resubmit a Dispute if it is reopened requiring more docs

**Returns**: `Object`, Promise of the request


### Disputes.closeDispute(disputeId, callback, options) 

Close dispute

**Parameters**

**disputeId**: `number`, Dispute id

**callback**: , Close dispute

**options**: , Close dispute

**Returns**: `Object`, Promise of the request


### Disputes.getTransactions(disputeId, callback, options) 

Gets dispute's transactions

**Parameters**

**disputeId**: `number`, Dispute identifier

**callback**: , Gets dispute's transactions

**options**: , Gets dispute's transactions

**Returns**: `Object`, Request promise


### Disputes.getDisputesForWallet(walletId, callback, options) 

Gets dispute's documents for wallet

**Parameters**

**walletId**: `number`, Wallet identifier

**callback**: , Gets dispute's documents for wallet

**options**: , Gets dispute's documents for wallet

**Returns**: `Object`, Request promise


### Disputes.getDisputesForUser(userId, callback, options) 

Gets user's disputes

**Parameters**

**userId**: `number`, User identifier

**callback**: , Gets user's disputes

**options**: , Gets user's disputes

**Returns**: `Object`, Request promise


### Disputes.getRepudiation(repudiationId, callback, options) 

Gets repudiation

**Parameters**

**repudiationId**: `number`, Repudiation identifier

**callback**: , Gets repudiation

**options**: , Gets repudiation

**Returns**: `Object`, Request promise


### Disputes.createSettlementTransfer(settlementTransfer, repudiationId, callback, options) 

Creates settlement transfer

**Parameters**

**settlementTransfer**: `Object`, Settlement transfer

**repudiationId**: `number`, Repudiation identifier

**callback**: , Creates settlement transfer

**options**: , Creates settlement transfer

**Returns**: `Object`, Promise of the request


### Disputes.getSettlementTransfer(settlementTransferId, callback, options) 

Gets settlement transfer

**Parameters**

**settlementTransferId**: `number`, Settlement Transfer identifier

**callback**: , Gets settlement transfer

**options**: , Gets settlement transfer

**Returns**: `Object`, Request promise


### Disputes.getDocumentsForDispute(disputeId, callback, options) 

Gets documents for dispute

**Parameters**

**disputeId**: `number`, Dispute identifier

**callback**: , Gets documents for dispute

**options**: , Gets documents for dispute

**Returns**: `Object`, Request promise


### Disputes.updateDisputeDocument(disputeId, disputeDocument, callback, options) 

Update dispute document

**Parameters**

**disputeId**: `number`, Dispute identifier

**disputeDocument**: `Object`, Dispute document

**callback**: , Update dispute document

**options**: , Update dispute document

**Returns**: `Object`, Promise of the request


### Disputes.createDisputeDocument(disputeId, disputeDocument, callback, options) 

Creates document for dispute

**Parameters**

**disputeId**: `number`, Dispute Id

**disputeDocument**: `Object`, Dispute document

**callback**: , Creates document for dispute

**options**: , Creates document for dispute

**Returns**: `Object`, Promise of the request


### Disputes.createDisputeDocumentPage(disputeId, disputeDocumentId, disputeDocumentPage, callback, options) 

Creates document's page for dispute

**Parameters**

**disputeId**: `number`, Dispute identifier

**disputeDocumentId**: `number`, Dispute document indentifier

**disputeDocumentPage**: `Object`, Dispute document page

**callback**: , Creates document's page for dispute

**options**: , Creates document's page for dispute

**Returns**: `Object`, Promise of the request


### Disputes.createDisputeDocumentPageFromFile(disputeId, disputeDocumentId, file, callback, options) 

Creates document's page for dispute from file

**Parameters**

**disputeId**: `number`, Dispute identifier

**disputeDocumentId**: `number`, Dispute document indentifier

**file**: `string`, File path

**callback**: , Creates document's page for dispute from file

**options**: , Creates document's page for dispute from file

**Returns**: `Object`, Promise of the request



* * *










