## [1.27.0] - 2022-05-11
##Added
- When you create a KYC Document you can now add a Tag ( custom data ).
##Fixed
- Issue #309 (Sort with column and direction using typescript)

## [1.26.1] - 2022-04-21
##Fixed
- Typescript check for GitHub runner

## [1.26.0] - 2022-04-01
##Added
###Instant payment eligibility check
With the function
`PayOuts.checkEligibility(payOut, callback, options)`
the destination bank reachability can now be verified prior to making an instant payout. 
This results in a better user experience, as this preliminary check will allow the platform to propose the instant payout option only to end users whose bank is eligible.
### Instant payment mode only
Instant Payment requests can now be automatically cancelled when an issue is encountered (rather than falling back to the standard payout mode).

This is possible by using the new `INSTANT_PAYMENT_ONLY` option that has been added to the PayoutModeRequested parameter.

## [1.25.2] - 2022-02-18
##Fixed
- Added Tag property in the CreateCardDirectPayIn interface.

## [1.25.1] - 2022-02-02
##Fixed
- Typescript is now a dev dependency
- Recurring Registration model is now exported (Thanks to @sengdaliu)
- Added missing ID in UpdateUbo

## [1.25.0] - 2021-12-09
##Added
You can now view the rate limiting status in the NodeJS SDK.
This test will show you all available properties in rateLimits : test/services/RateLimit.js.

##Fixed
Export CurrencyISO and CountryISO

## [1.24.1] - 2021-11-26
##Fixed
Missing namespaces and exports

## [1.24.0] - 2021-11-25
## Added

Following numerous requests, we are happy to announce an update in the MANGOPAY Node.JS SDK. This update greatly improves the compatibility of the Node.JS SDK with Typescript.

## Breaking Change

LegalRepresentativeAddress is mandatory to create a legal user

## Other notable changes
- The CardRegistrationId becomes mandatory to update a CardRegistration
- The CreditedUserId becomes optional during the creation of a BANK_WIRE DIRECT PayIn
- Addition of missing types of PayIn WEB DIRECT_DEBIT
- Addition of ReportType (WALLET, TRANSACTION) to the object Report
- Items moved to the “base” namespace: AuthorizationDate, Headers, ColumnAndDirection, Config, RequestOptions, PaginationOptions, FilterOptions, BrowserInfoData, FallbackReasonData
- Items moved to the “securityInfo” namespace: AVSResult, SecurityInfoData
- Items moved to the “cardPreauthorization” namespace: PreAuthorizationExecutionType, PaymentStatus, PreAuthorizationStatus
- Items moved to the “billing” namespace: BillingData, BillingOrShippingRecurringPayInData
- Items moved to the “money” namespace: MoneyData
- Items moved to the “payIn” namespace: _3DSVersion
- Items moved to the “enums” namespace: IPayInExecutionType, IPayInPaymentType, IMandateStatus, ILegalPersonType, IPersonType, IBankAccountType, IDeclaredUboStats, IKycDocumentStatus, IKycDocumentType, IPayOutPaymentType, IPlatformType, IUboDeclarationRefusedReasonType, IUboDeclarationStatus, IUboRefusedReasonType, IUserNaturalCapacity

## [1.23.0] - 2021-10-20
## Added

You can now change the status to "ENDED" for a recurring payment.

## Fixed

- "Status" is now available in the response when you request a recurring payment registration.

## [1.22.1] - 2021-10-11
## Added

**We provide more information regarding refused KYC documents.** Therefore it will be easier for you to adapt your app behavior and help your end user.

You are now able to see the exact explanation thanks to a new parameter called “Flags”. 

It has been added to 

`api.KycDocuments.get(document.Id, function(data, response){});`

It will display one or several error codes that provide the reason(s) why your document validation has failed. These error codes description are available [here](https://docs.mangopay.com/guide/kyc-document).


## [1.21.0] - 2021-10-06
## Added

As requested by numerous clients, we are now providing [Payconiq](https://www.payconiq.be/fr) as a new mean-of-payment. To request access, please contact MANGOPAY.

## Fix

- We have added missing types (IpAddress, BrowserInfo, DirectDebitDirectPayIn)
- We have fixed the tests and increased timeout limits.

## [1.20.2] - 2021-08-27
## Fixed 

- Missing types for Recurring payments
- Missing "NO_CHOICE" in secure mode
- Missing "KYC_OUTDATED" in type
- Bug fix UBO creation with BirthPlace 

## [1.20.1] - 2021-08-05
## Fixed 

- Change `FallbackReason` parameter's type to object in PayOutPaymentDetailsBankWire  


## [1.20.0] - 2021-08-04
## Fixed 

- We have added BrowserInfo for CreateCardDirectPayIn 
- We have fix a bug with DeactivateBankAccount (missing return data)

## Added

- You can now update and view a Recurring PayIn Registration object. To know more about this feature, please consult the documentation [here](https://docs.mangopay.com/guide/recurring-payments-introduction). 
- To improve recurring payments, we have added new parameters for CIT : DebitedFunds & Fees. To know more about this feature, please consult the documentation [here](https://docs.mangopay.com/endpoints/v2.01/payins#e1053_create-a-recurring-payin-cit)

## [1.19.0] - 2021-06-10
## Added 

We have added a new feature **[recurring payments](https://docs.mangopay.com/guide/recurring-payments)** dedicated to clients needing to charge a card repeatedly, such as subscriptions or payments installments. 

You can start testing in sandbox, to help you define your workflow. This release provides the first elements of the full feature.

- [Create a Recurring PayIn Registration object](https://docs.mangopay.com/endpoints/v2.01/payins#e1051_create-a-recurring-payin-registration), containing all the information to define the recurring payment
- [Initiate your recurring payment flow](https://docs.mangopay.com/endpoints/v2.01/payins#e1053_create-a-recurring-payin-cit) with an authenticated transaction (CIT) using the Card Recurring PayIn endpoint
- [Continue your recurring payment flow](https://docs.mangopay.com/endpoints/v2.01/payins#e1054_create-a-recurring-payin-mit) with an non-authenticated transaction (MIT) using the Card Recurring PayIn endpoint

This feature is not yet available in production and you need to contact the Support team to request access.

## [1.18.0] - 2021-05-27
## Added 

Mangopay introduces the instant payment mode. It allows payouts (transfer from wallet to user bank account) to be processed within 25 seconds, rather than the 48 hours for a standard payout.

You can now use this new type of payout with the NodeJS SDK.

Example :

```javascript
let payoutData = api.PayOuts.getBankwire(payOut.Id);
// where payOut.Id is the id of an existing payout
```

Please note that this feature must be authorized and activated by MANGOPAY. More information [here](https://docs.mangopay.com/guide/instant-payment-payout).

## [1.17.0] - 2021-05-11
## Fixed 

### IBAN for testing purposes

⚠️ **IBAN provided for testing purpose should never be used outside of a testing environement!**

- Fix `BankAccount` IBAN reference for tests

More information about how to test payments, click [here](https://docs.mangopay.com/guide/testing-payments).

### BankingAlias

The SDK was calling the endpoint using a deprecated format. It has been fixed.

## Added 

### New events for PreAuthorization

Some of you use a lot the [PreAuthorization](https://docs.mangopay.com/endpoints/v2.01/preauthorizations#e183_the-preauthorization-object) feature of our API. To make your life easier, we have added three new events :

- PREAUTHORIZATION_CREATED
- PREAUTHORIZATION_SUCCEEDED
- PREAUTHORIZATION_FAILED

The goal is to help you monitor a PreAuthorization with a [webhook](https://docs.mangopay.com/endpoints/v2.01/hooks#e246_the-hook-object).

*Example: If a PreAuthorization is desynchronized, when the status is updated, you will be able to know it.*

### Models and services are preloaded from predefined lists

Thanks to @jgautheron, the SDK is now compatible with bundlers (Webpack, etc...) and avoid i/o at runtime.

 
## [1.16.0] - 2021-03-25
## Added

### On demand feature for 3DSv2

> **This on-demand feature is for testing purposes only and will not be available in production**

#### Request

We've added a new parameter `Requested3DSVersion` (not mandatory) that allows you to choose between versions of 3DS protocols (managed by the parameter `SecureMode`). Two values are available: 
* `V1`
* `V2_1`

If nothing is sent, the flow will be 3DS V1. 

The `Requested3DSVersion` may be included on all calls to the following endpoints:
* `/preauthorizations/card/direct`
* `/payins/card/direct`

#### Response

In the API response, the `Requested3DSVersion` will show the value you requested:
* `V1`
* `V2_1`
* `null` – indicates that nothing was requested

The parameter `Applied3DSVersion` shows you the version of the 3DS protocol used. Two values are possible:
* `V1`
* `V2_1`

## [1.15.0] - 2021-02-22
- 3DS2 integration with Shipping and Billing objects, including FirstName and LastName fields
- The objects Billing and Shipping may be included on all calls to the following endpoints:
    - /preauthorizations/card/direct
    - /payins/card/direct
    - /payins/card/web
- Enable Instant Payment for payouts by adding a new parameter PayoutModeRequested on the following endpoint /payouts/bankwire
    - The new parameter PayoutModeRequested can take two different values : "INSTANT_PAYMENT" or "STANDARD" (STANDARD = the way we proceed normally a payout request)
    - This new parameter is not mandatory and if empty or not present, the payout will be "STANDARD" by default
    - Instant Payment is in beta all over Europe - SEPA region
- Fix typo in README
- Fix typo IpAdress -> IpAddress in PayInPaymentDetailsCardDirect
- Fix Users update through a PUT request

## [1.14.4] - 2020-12-09
- Added 'Regulatory' endpoint to allow checks of User Block Status
- Added support for Regulatory -> Blocked Status Hooks
- Fix for SubmitKycDocument bug

## [1.14.3] - 2020-10-30
- added PaymentType to the CreatePayOut Object
- added new endpoint for PreAuthorization Transactions
- added methods for creating client bank accounts and payouts

## [1.14.2]
- New endpoint -> get UBO declaration by ID
- RemainingFunds tests
- Fixing of Typos, for Typescript compatibility
- New endpoint to support changes to Card Validation process (please listen out for product announcements)

## [1.13]
### Added
`USER_KYC_REGULAR` has been added as a new `Event`. Thanks to it, you are now able to know when all the needed KYCs for a user have been validated and its KYCLevel is updated.

## Fixed
- Some issues on `CardRegistration` have been fixed
- Pagination parameters use has been fixed and can now be used correctly


## [1.12]
### Added
- GooglePay support has been added. This mean of payment will shortly be available (beta phase). Feel free to ask our Sales / Technical Account Manager team about it !
- `AccountNumber` parameter has been added for Payins `EXTERNAL_INSTRUCTION` (as funds could be sent from a non-IBAN account to a wallet)
- `EXPIRED` Status for Mandates has been added. Related EventType status `MANDATE_EXPIRED` has been added too.

### Changed
- `PAYLINEV2` parameter has been added to `TemplateURLOptions` object, as `PAYLINE` parameter will be deprecated very soon.

### Security
- node-rest-client has been updated from 1.8.x version to 3.1.x version
- Deprecated `Buffer` constructor has been replaced

## [1.11] - 2019-10-18
### Added
- ApplePay `Payin` functions are now available. More info about activation to come in the following weeks...  
### Changed
- GET EMoney method now supports year and month parameters. More info on our [docs](https://docs.mangopay.com/endpoints/v2.01/user-emoney#e895_view-a-users-emoney)

## [1.10] - 2019-07-09
- New UBO Declaration system (more info [here](https://docs.mangopay.com/endpoints/v2.01/ubo-declarations#e1024_the-ubo-declaration-object))
- `CompanyNumber` support for [Legal `Users`](https://docs.mangopay.com/endpoints/v2.01/users#e259_create-a-legal-user)
