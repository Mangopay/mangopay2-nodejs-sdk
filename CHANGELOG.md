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
