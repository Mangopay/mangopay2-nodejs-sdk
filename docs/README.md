# MangoPay Node.js SDK Documentation

## Services
* [CardPreAuthorizations](CardPreAuthorizations.md)
* [CardRegistrations](CardRegistrations.md)
* [Cards](Cards.md)
* [DisputeDocuments](DisputeDocuments.md)
* [Disputes](Disputes.md)
* [Events](Events.md)
* [Hooks](Hooks.md)
* [KycDocuments](KycDocuments.md)
* [PayIns](PayIns.md)
* [PayOuts](PayOuts.md)
* [Refunds](Refunds.md)
* [Responses](Responses.md)
* [Transfers](Transfers.md)
* [Users](Users.md)
* [Wallets](Wallets.md)

## All available functions
| Function | Description | Source Code |
| -------- | ----------- | ----------- |
|[Disputes.closeDispute(disputeId, callback, options)](Disputes.md) | Close dispute | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Disputes.contestDispute(disputeId, contestedFunds, callback, options)](Disputes.md) | Contest dispute | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[PayOuts.create(payOut, callback, options)](PayOuts.md) | Create new pay-out | [..&#x2F;lib&#x2F;services&#x2F;PayOuts.js](../lib/services/PayOuts.js) |
|[Hooks.create(hook, callback, options)](Hooks.md) | Create new hook | [..&#x2F;lib&#x2F;services&#x2F;Hooks.js](../lib/services/Hooks.js) |
|[CardPreAuthorizations.create(cardPreAuthorization, callback, options)](CardPreAuthorizations.md) | Create new pre-authorization | [..&#x2F;lib&#x2F;services&#x2F;CardPreAuthorizations.js](../lib/services/CardPreAuthorizations.js) |
|[Users.create(user)](Users.md) | Create a new user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Transfers.create(transfer, callback, options)](Transfers.md) | Create new transfer | [..&#x2F;lib&#x2F;services&#x2F;Transfers.js](../lib/services/Transfers.js) |
|[PayIns.create(payIn, callback, options)](PayIns.md) | Create new pay-in | [..&#x2F;lib&#x2F;services&#x2F;PayIns.js](../lib/services/PayIns.js) |
|[Wallets.create(wallet, callback, options)](Wallets.md) | Create new wallet | [..&#x2F;lib&#x2F;services&#x2F;Wallets.js](../lib/services/Wallets.js) |
|[CardRegistrations.create(cardRegistration, callback, options)](CardRegistrations.md) | Create new card registration | [..&#x2F;lib&#x2F;services&#x2F;CardRegistrations.js](../lib/services/CardRegistrations.js) |
|[Users.createBankAccount(userId, bankAccount, callback, options)](Users.md) | Create bank account for user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Disputes.createDisputeDocument(disputeId, disputeDocument, callback, options)](Disputes.md) | Creates document for dispute | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Disputes.createDisputeDocumentPage(disputeId, disputeDocumentId, disputeDocumentPage, callback, options)](Disputes.md) | Creates document&#39;s page for dispute | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Disputes.createDisputeDocumentPageFromFile(disputeId, disputeDocumentId, file, callback, options)](Disputes.md) | Creates document&#39;s page for dispute from file | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Users.createKycDocument(userId, kycDocument, callback, options)](Users.md) | Create new KYC document | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Users.createKycPage(userId, kycDocumentId, kycPage, callback, options)](Users.md) | Create page for KYC document | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Users.createKycPageFromFile(userId, kycDocumentId, file, callback, options)](Users.md) | Create page for KYC document | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[PayIns.createRefund(payInId, refund, callback, options)](PayIns.md) | Create refund for pay-in object | [..&#x2F;lib&#x2F;services&#x2F;PayIns.js](../lib/services/PayIns.js) |
|[Transfers.createRefund(transferId, refund, callback, options)](Transfers.md) | Create refund for transfer object | [..&#x2F;lib&#x2F;services&#x2F;Transfers.js](../lib/services/Transfers.js) |
|[Disputes.createSettlementTransfer(settlementTransfer, repudiationId, callback, options)](Disputes.md) | Creates settlement transfer | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[PayIns.createTemporaryImmediatePayIn(immediatePayIn, callback, options)](PayIns.md) | WARNING
It&#39;s temporary entity and it will be removed in the future.
Please, contact with support before using these features or if you have any questions.

Create new temporary immediate pay-in | [..&#x2F;lib&#x2F;services&#x2F;PayIns.js](../lib/services/PayIns.js) |
|[Cards.createTemporaryPaymentCard(paymentCard, callback, options)](Cards.md) | WARNING
It&#39;s temporary entity and it will be removed in the future.
Please, contact with support before using these features or if you have any questions.

Create new temporary payment card | [..&#x2F;lib&#x2F;services&#x2F;Cards.js](../lib/services/Cards.js) |
|[CardRegistrations.get(cardRegistrationId, callback, options)](CardRegistrations.md) | Get registration | [..&#x2F;lib&#x2F;services&#x2F;CardRegistrations.js](../lib/services/CardRegistrations.js) |
|[Disputes.get(disputeId, callback, options)](Disputes.md) | Get dispute | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[PayOuts.get(payOutId, callback, options)](PayOuts.md) | Get payout | [..&#x2F;lib&#x2F;services&#x2F;PayOuts.js](../lib/services/PayOuts.js) |
|[Hooks.get(hookId, callback, options)](Hooks.md) | Get hook | [..&#x2F;lib&#x2F;services&#x2F;Hooks.js](../lib/services/Hooks.js) |
|[PayIns.get(payInId, callback, options)](PayIns.md) | Get pay-in | [..&#x2F;lib&#x2F;services&#x2F;PayIns.js](../lib/services/PayIns.js) |
|[Refunds.get(refundId, callback, options)](Refunds.md) | Get events | [..&#x2F;lib&#x2F;services&#x2F;Refunds.js](../lib/services/Refunds.js) |
|[DisputeDocuments.get(documentId, callback, options)](DisputeDocuments.md) | Gets dispute&#39;s document | [..&#x2F;lib&#x2F;services&#x2F;DisputeDocuments.js](../lib/services/DisputeDocuments.js) |
|[KycDocuments.get(kycDocumentId, callback, options)](KycDocuments.md) | Get KycDocument | [..&#x2F;lib&#x2F;services&#x2F;KycDocuments.js](../lib/services/KycDocuments.js) |
|[Cards.get(cardId, callback, options)](Cards.md) | Get card | [..&#x2F;lib&#x2F;services&#x2F;Cards.js](../lib/services/Cards.js) |
|[Users.get(userId, callback, options)](Users.md) | Get natural or legal user by ID | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[CardPreAuthorizations.get(cardPreAuthorizationId, callback, options)](CardPreAuthorizations.md) | Get pre-authorization object | [..&#x2F;lib&#x2F;services&#x2F;CardPreAuthorizations.js](../lib/services/CardPreAuthorizations.js) |
|[Wallets.get(walletId, callback, options)](Wallets.md) | Get pay-in | [..&#x2F;lib&#x2F;services&#x2F;Wallets.js](../lib/services/Wallets.js) |
|[Responses.get(callback, options)](Responses.md) | Get response from previous call | [..&#x2F;lib&#x2F;services&#x2F;Responses.js](../lib/services/Responses.js) |
|[Transfers.get(transferId, callback, options)](Transfers.md) | Get transfer | [..&#x2F;lib&#x2F;services&#x2F;Transfers.js](../lib/services/Transfers.js) |
|[Events.getAll(callback, options)](Events.md) | Get events | [..&#x2F;lib&#x2F;services&#x2F;Events.js](../lib/services/Events.js) |
|[DisputeDocuments.getAll(callback, options)](DisputeDocuments.md) | Gets dispute&#39;s documents for client | [..&#x2F;lib&#x2F;services&#x2F;DisputeDocuments.js](../lib/services/DisputeDocuments.js) |
|[Hooks.getAll(callback, options)](Hooks.md) | Get all hooks | [..&#x2F;lib&#x2F;services&#x2F;Hooks.js](../lib/services/Hooks.js) |
|[Disputes.getAll(callback, options)](Disputes.md) | Get all disputes | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Users.getAll()](Users.md) | Get all users | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[KycDocuments.getAll(callback, options)](KycDocuments.md) | Get all KycDocuments | [..&#x2F;lib&#x2F;services&#x2F;KycDocuments.js](../lib/services/KycDocuments.js) |
|[Users.getBankAccount(userId, bankAccountId, callback, options)](Users.md) | Get all bank accounts for user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Users.getBankAccounts(userId, callback, options)](Users.md) | Get all bank accounts for user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Users.getCards(userId, callback, options)](Users.md) | Get all cards for user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Disputes.getDisputesForUser(userId, callback, options)](Disputes.md) | Gets user&#39;s disputes | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Disputes.getDisputesForWallet(walletId, callback, options)](Disputes.md) | Gets dispute&#39;s documents for wallet | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Disputes.getDocumentsForDispute(disputeId, callback, options)](Disputes.md) | Gets documents for dispute | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Users.getKycDocument(userId, kycDocumentId, callback, options)](Users.md) | Get KYC document | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Users.getKycDocuments(userId, callback, options)](Users.md) | Get all KYC documents for user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Users.getLegal(userId, callback, options)](Users.md) | Get legal user by ID | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Users.getNatural(userId, callback, options)](Users.md) | Get natural user by ID | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Disputes.getRepudiation(repudiationId, callback, options)](Disputes.md) | Gets repudiation | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Disputes.getSettlementTransfer(settlementTransferId, callback, options)](Disputes.md) | Gets settlement transfer | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Cards.getTemporaryPaymentCard(paymentCardId, callback, options)](Cards.md) | WARNING
It&#39;s temporary entity and it will be removed in the future.
Please, contact with support before using these features or if you have any questions.

Create new temporary payment card | [..&#x2F;lib&#x2F;services&#x2F;Cards.js](../lib/services/Cards.js) |
|[Users.getTransactions(userId, callback, options)](Users.md) | Get all transactions for user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Disputes.getTransactions(disputeId, callback, options)](Disputes.md) | Gets dispute&#39;s transactions | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Wallets.getTransactions(walletId, callback, options)](Wallets.md) | Get transactions for the wallet | [..&#x2F;lib&#x2F;services&#x2F;Wallets.js](../lib/services/Wallets.js) |
|[Users.getWallets(userId, callback, options)](Users.md) | Get all wallets accounts for user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Disputes.resubmitDispute(disputeId, callback, options)](Disputes.md) | This method is used to resubmit a Dispute if it is reopened requiring more docs | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Cards.update(card, callback, options)](Cards.md) | Update card | [..&#x2F;lib&#x2F;services&#x2F;Cards.js](../lib/services/Cards.js) |
|[CardPreAuthorizations.update(cardPreAuthorization, callback, options)](CardPreAuthorizations.md) | Update pre-authorization object | [..&#x2F;lib&#x2F;services&#x2F;CardPreAuthorizations.js](../lib/services/CardPreAuthorizations.js) |
|[Disputes.update(dispute, callback, options)](Disputes.md) | Update dispute&#39;s tag | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Hooks.update(hook, callback, options)](Hooks.md) | Save hook | [..&#x2F;lib&#x2F;services&#x2F;Hooks.js](../lib/services/Hooks.js) |
|[CardRegistrations.update(cardRegistration, callback, options)](CardRegistrations.md) | Update card registration | [..&#x2F;lib&#x2F;services&#x2F;CardRegistrations.js](../lib/services/CardRegistrations.js) |
|[Wallets.update(wallet, callback, options)](Wallets.md) | Update wallet | [..&#x2F;lib&#x2F;services&#x2F;Wallets.js](../lib/services/Wallets.js) |
|[Users.update(user, callback, options)](Users.md) | Save user | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
|[Disputes.updateDisputeDocument(disputeId, disputeDocument, callback, options)](Disputes.md) | Update dispute document | [..&#x2F;lib&#x2F;services&#x2F;Disputes.js](../lib/services/Disputes.js) |
|[Users.updateKycDocument(userId, kycDocumentId, callback, options)](Users.md) | Save KYC document | [..&#x2F;lib&#x2F;services&#x2F;Users.js](../lib/services/Users.js) |
