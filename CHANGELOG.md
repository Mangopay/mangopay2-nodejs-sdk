## [1.59.1] - 2025-07-28
### Added
- `Sku` parameter on LineItem, for [Klarna PayIns](https://docs.mangopay.com/api-reference/klarna/create-klarna-payin)
- support for new endpoint [View supported banks for Pay by Bank](https://docs.mangopay.com/api-reference/pay-by-bank/view-supported-banks-pay-by-bank), to enable presentation of banks to user before Pay by Bank payment request

## [1.59.0] - 2025-07-18
### Added
Endpoints for [Mangopay Echo](https://docs.mangopay.com/guides/echo), a solution for platforms working with another third-party PSP for funds acquisition (including via the Mirakl Connector) #482:
- [POST Create an Intent](https://docs.mangopay.com/api-reference/intents/create-intent)
- [GET View an Intent](https://docs.mangopay.com/api-reference/intents/view-intent)
- [POST Create a Capture for an Intent](https://docs.mangopay.com/api-reference/intents/create-intent-capture)
- [POST Create a Settlement](https://docs.mangopay.com/api-reference/settlements/create-settlement)
- [PUT Update a Settlement](https://docs.mangopay.com/api-reference/settlements/update-settlement)
- [GET View a Settlement](https://docs.mangopay.com/api-reference/settlements/view-settlement)
- [POST Create a Split of an Intent](https://docs.mangopay.com/api-reference/intents/create-intent-split)

## [1.58.0] - 2025-07-03
### Added
- New endpoint [POST Create a Bizum PayIn](https://docs.mangopay.com/api-reference/bizum/create-bizum-payin)
- New webhook event types for SCA enrollment ([API release note](https://docs.mangopay.com/release-notes/api/2025-06-23)), note that these are triggered on enrollment not authentication:
  - `SCA_ENROLLMENT_SUCCEEDED`
  - `SCA_ENROLLMENT_FAILED`
  - `SCA_ENROLLMENT_EXPIRED`
- New webhook event types for `UserCategory` change ([API release note](https://docs.mangopay.com/release-notes/api/2025-06-23) ):
  - `USER_CATEGORY_UPDATED_TO_OWNER`
  - `USER_CATEGORY_UPDATED_TO_PAYER`
  - `USER_CATEGORY_UPDATED_TO_PLATFORM`
- Support for `PLATFORM` value to `UserCategory` enum

## [1.57.1] - 2025-06-17
### Added
- [US and CA virtual accounts](https://docs.mangopay.com/release-notes/api/2025-06-12) for local pay-in collection

## [1.57.0] - 2025-06-10
### Added

Endpoints for [new Reporting Service](https://docs.mangopay.com/release-notes/api/2025-06-05) feature:
- [POST Create a Report](https://docs.mangopay.com/api-reference/reporting/create-report)
- [GET View a Report](https://docs.mangopay.com/api-reference/reporting/view-report)
- [GET List all Reports](https://docs.mangopay.com/api-reference/reporting/list-reports)

Webhook [event types](url) for new Reporting Service:
- `REPORT_GENERATED`
- `REPORT_FAILED`

Support for [GET List Disputes for a PayIn](https://docs.mangopay.com/api-reference/disputes/list-disputes-payin) endpoint.

## [1.56.1] - 2025-06-06
### Added
- Support for `RecipientScope` query parameter on [GET List Recipients for a User](https://docs.mangopay.com/api-reference/recipients/list-recipients-user)
- [POST Validate the format of User data](https://docs.mangopay.com/api-reference/user-data-format/validate-user-data-format)

### Fixed
- `Status` enum value on Identity Verification object changed from `OUTDATED` to `OUT_OF_DATE`

## [1.56.0] - 2025-05-23
### Added
Event types for [user account webhooks](https://docs.mangopay.com//webhooks/event-types#user-account), relevant to [SCA enrollment in user endpoints](https://docs.mangopay.com/guides/sca/users#user-status) and account closure:
- `USER_ACCOUNT_VALIDATION_ASKED`
- `USER_ACCOUNT_ACTIVATED`
- `USER_ACCOUNT_CLOSED`

Event types for [instant and quoted FX conversions](https://docs.mangopay.com//webhooks/event-types#fx-conversions):
- `INSTANT_CONVERSION_CREATED`
- `INSTANT_CONVERSION_SUCCEEDED`
- `INSTANT_CONVERSION_FAILED`
- `QUOTED_CONVERSION_CREATED`
- `QUOTED_CONVERSION_SUCCEEDED`
- `QUOTED_CONVERSION_FAILED`

Support for [30-day deposit preauthorization](https://docs.mangopay.com/guides/payment-methods/card/deposit-preauthorization) features:
- [POST Create a Deposit Preauthorized PayIn prior to complement](https://docs.mangopay.com/api-reference/deposit-preauthorizations/create-deposit-preauthorized-payin-prior-to-complement)
- [POST Create a Deposit Preauthorized PayIn complement](https://docs.mangopay.com/api-reference/deposit-preauthorizations/create-deposit-preauthorized-payin-complement)
- `NO_SHOW_REQUESTED` on `updateDeposit` method for [PUT Cancel a Deposit Preauthorization or request a no-show](https://docs.mangopay.com/api-reference/deposit-preauthorizations/cancel-deposit-preauthorization-request-no-show)
- [GET View a PayIn (Deposit Preauthorized Card](https://docs.mangopay.com/api-reference/deposit-preauthorizations/view-payin-deposit-preauthorized)
- [GET List Transactions for a Deposit Preauthorization](https://docs.mangopay.com/api-reference/transactions/list-transactions-deposit-preauthorization)

## [1.55.1] - 2025-05-15
#### Fixed

- File naming issue on Recipients service (thanks for raising @JordhanMadec 🙏)

## [1.55.0] - 2025-05-14
### Added and refined

#### Hosted KYC/KYB endpoints

The following endpoints have been refined following the beta phase, and are now generally available:
- [POST Create an IDV Session](https://docs.mangopay.com/api-reference/idv-sessions/create-idv-session) (no changes)
- [GET View an IDV Session](https://docs.mangopay.com/api-reference/idv-sessions/view-idv-session) (includes `Checks` in response)
- [GET List IDV Sessions for a User](https://docs.mangopay.com/api-reference/idv-sessions/list-idv-sessions-user) (new endpoint)

The previously available endpoint GET View Checks for an IDV Session has been removed (as Checks were integrated into the GET by ID).

See the [guide](https://docs.mangopay.com/guides/users/verification/hosted) for more details.

#### Recipients

The `Country` property has been added to [Recipients](https://docs.mangopay.com/guides/sca/recipients), as a required query parameter on [GET View the schema for a Recipient](https://docs.mangopay.com/api-reference/recipients/view-recipient-schema) and as a required body parameter on [POST Validate data for a Recipient](https://docs.mangopay.com/api-reference/recipients/validate-recipient-data) and [POST Create a Recipient](https://docs.mangopay.com/api-reference/recipients/create-recipient).

### Added

- [GET List Deposit Preauthorizations for a Card](https://docs.mangopay.com/api-reference/deposit-preauthorizations/list-deposit-preauthorizations-card)
- [GET List Deposit Preauthorizations for a User](https://docs.mangopay.com/api-reference/deposit-preauthorizations/list-deposit-preauthorizations-user)

## [1.54.0] - 2025-04-29
### Added

#### SCA on wallet access endpoints
`ScaContext` query parameter added on wallet access endpoints for the [introduction of SCA](https://docs.mangopay.com/guides/sca/wallets):

- [GET View a Wallet](https://docs.mangopay.com/api-reference/wallets/view-wallet)
- [GET List Wallets for a User](https://docs.mangopay.com/api-reference/wallets/list-wallets-user)
- [GET List Transactions for a User](https://docs.mangopay.com/api-reference/transactions/list-transactions-user)
- [GET List Transactions for a Wallet](https://docs.mangopay.com/api-reference/transactions/list-transactions-wallet)

If SCA is required, Mangopay responds with a 401 response code. The `PendingUserAction` `RedirectUrl` is in the dedicated `WWW-Authenticate` response header.

See the tests for examples on handling this error.

#### BLIK with code
Support for [BLIK with code endpoint](https://docs.mangopay.com/api-reference/blik/create-blik-payin-with-code)

## [1.53.1] - 2025-04-17
### Fixed
- Fixed the PaymentType enum for recurring payin registrations

## [1.53.0] - 2025-04-16
### Added

#### Recipients
- [GET View payout methods](/api-reference/recipients/view-payout-methods)
- [GET View the schema for a Recipient](/api-reference/recipients/view-recipient-schema)
- [POST Validate data for a Recipient](/api-reference/recipients/validate-recipient-data)
- [POST Create a Recipient](/api-reference/recipients/create-recipient)
- [GET View a Recipient](/api-reference/recipients/view-recipient)
- [GET List Recipients for a user](/api-reference/recipients/list-recipients-user)
- [PUT Deactivate a Recipient](/api-reference/recipients/deactivate-recipient)
- Webhook event types:
  - `RECIPIENT_ACTIVE`
  - `RECIPIENT_CANCELED`
  - `RECIPIENT_DEACTIVATED`

#### SCA on Owner-initiated transfers
- On [POST Create a Transfer](/api-reference/transfers/create-transfer)
  - `ScaContext` body parameter
  - `PendingUserAction` response field containing `RedirectUrl`

#### Endpoints to close a user account
- [DELETE Close a Natural User](/api-reference/users/close-natural-user)
- [DELETE Close a Legal User](/api-reference/users/close-legal-user)

## [1.52.0] - 2025-04-16
### Added
- [POST Create a TWINT PayIn](https://docs.mangopay.com/api-reference/twint/create-twint-payin)
- `RTGS_PAYMENT` for `PayoutModeRequested` on [POST Create a Payout](https://docs.mangopay.com/api-reference/payouts/create-payout)
- PayPal recurring payments, thanks to the `PaymentType` value `PAYPAL` on [Recurring PayIn Registrations](https://docs.mangopay.com/api-reference/recurring-payin-registrations/create-recurring-payin-registration-paypal) and new endpoints ([POST Create a Recurring PayPal PayIn (CIT)](https://docs.mangopay.com/api-reference/paypal/create-recurring-paypal-payin-cit) and [POST Create a Recurring PayPal PayIn (MIT)](https://docs.mangopay.com/api-reference/paypal/create-recurring-paypal-payin-mit)

#### Fixed
- Removed chai requirement from Users service - thanks for the MR @thierrymarianne

## [1.51.1] - 2025-04-01
### Changed
- User-Agent Header value standardized on format: User-Agent: Mangopay-SDK/`SDKVersion` (`Language`/`LanguageVersion`)

### Fixed
- Fixed tests for categorize SCA users endpoint
## [1.51.0] - 2025-03-07

### Added

New endpoints for [strong customer authentication (SCA)](https://docs.mangopay.com/guides/users/sca) on Owner users:
- [POST Create a Natural User (SCA)](https://docs.mangopay.com/api-reference/users/create-natural-user-sca)
- [PUT Update a Natural User (SCA)](https://docs.mangopay.com/api-reference/users/update-natural-user-sca)
- [POST Create a Legal User (SCA)](https://docs.mangopay.com/api-reference/users/create-legal-user-sca)
- [PUT Update a Legal User (SCA)](https://docs.mangopay.com/api-reference/users/update-legal-user-sca)
- [PUT Categorize a Natural User (SCA)](https://docs.mangopay.com/api-reference/users/categorize-natural-user)
- [PUT Categorize a Legal User (SCA)](https://docs.mangopay.com/api-reference/users/categorize-legal-user)
- [POST Enroll a User in SCA](https://docs.mangopay.com/api-reference/users/enroll-user)

### Added

New endpoint for Payconiq:
- [POST Create a Payconiq PayIn](https://docs.mangopay.com/api-reference/payconiq/create-payconiq-payin)

## [1.50.1] - 2025-02-28
### Added

Missing endpoint [GET View card details for a Web Card PayIn](https://docs.mangopay.com/api-reference/web-card-payins/view-card-details-web-card-payin)

### Fixed

Rate limiting headers interpreted dynamically based on `X-RateLimit-Reset` time and for a variable number of bucket values.

## [1.50.0] - 2025-02-26
### Added

Endpoints and webhooks for [hosted KYC/B solution](https://docs.mangopay.com/guides/users/verification/hosted) (in beta)

- Endpoints
  - [Create an IDV Session](https://docs.mangopay.com/api-reference/idv-sessions/create-idv-session)
  - [View an IDV Session](https://docs.mangopay.com/api-reference/idv-sessions/view-idv-session)
  - [View Checks for an IDV Session](https://mangopay-idv.mintlify.app/api-reference/idv-sessions/view-idv-session-checks)

- Event types
  - `IDENTITY_VERIFICATION_VALIDATED`
  - `IDENTITY_VERIFICATION_FAILED`
  - `IDENTITY_VERIFICATION_INCONCLUSIVE`
  - `IDENTITY_VERIFICATION_OUTDATED`

## [1.49.1] - 2025-02-24
### Added

New endpoint for the [Pay by Bank PayIn](https://docs.mangopay.com/api-reference/pay-by-bank/view-payin-pay-by-bank#200) object:

-  [Create a Pay by Bank PayIn](https://docs.mangopay.com/api-reference/pay-by-bank/create-pay-by-bank-payin)
-  [View a PayIn (Pay by Bank)](https://docs.mangopay.com/api-reference/pay-by-bank/view-payin-pay-by-bank)

## [1.49.0] - 2025-02-14
### Added

New endpoint for the [Swish PayIn](https://docs.mangopay.com/api-reference/swish/swish-payin-object) object:

-  [Create a Swish PayIn](https://docs.mangopay.com/api-reference/swish/create-swish-payin)
-  [View a PayIn (Swish)](https://docs.mangopay.com/api-reference/swish/view-payin-swish)

Added the [List Transactions for a Card Fingerprint ](https://mangopay.com/docs/endpoints/direct-card-payins#list-transactions-card-fingerprint)endpoint.

### Updated

Improve retrieval of UBO declarations:  `get(userId, uboDeclarationId)` is now deprecated. Please use `getById(uboDeclarationId)` to retrieve UBO declarations.
## [1.48.4] - 2025-02-07
### Updated

- Improved Apple Pay to ensure full support in TypeScript.
- Add `StatementDescriptor` parameter to the [Refund](https://docs.mangopay.com/api-reference/refunds/create-refund-payin) object.

## [1.48.3] - 2025-02-04
### Updated

Revised tests to improve reliability and address any outdated tests.

## [1.48.2] - 2025-01-30
### Updated

- #429 Add the missing `PaymentStatus` values for [deposit preauthorized pay-ins](https://docs.mangopay.com/api-reference/deposit-preauthorizations/deposit-preauthorized-payin-object). Thanks for your contribution [@gabrieledarrigo](https://github.com/gabrieledarrigo)!

## [1.48.1] - 2024-12-17
### Fixed

- #426 Fixed typo mistake reports_wallets_create instead of reports_wallet_create. Thanks for your contribution [@jilink](https://github.com/jilink)
- #428 Fixed tests and added missing `BankWireExternalInstructionPayInData` type.

## [1.48.0] - 2024-12-17
### Added

- New PaymentRef parameter for [Payouts](https://docs.mangopay.com/api-reference/payouts/payout-object#the-payout-object)

## [1.47.1] - 2024-11-28
### Updated

Added all relevant `EVENT_TYPE_CHOICES` for virtual accounts:

- `VIRTUAL_ACCOUNT_ACTIVE`
- `VIRTUAL_ACCOUNT_BLOCKED`
- `VIRTUAL_ACCOUNT_CLOSED`
- `VIRTUAL_ACCOUNT_FAILED`

## [1.47.0] - 2024-10-25
### Added

New endpoints for The Virtual Account object:
- [Create a Virtual Account]()
- [Deactivate a Virtual Account]()
- [View a Virtual Account]()
- [List Virtual Accounts for a Wallet]()
- [View Client Availabilities]()

## [1.46.2] - 2024-09-04
### Fixed

- Add additional refund reason types.

## [1.46.1] - 2024-08-30
### Fixed
- Updated Axios to the latest version.

## [1.46.0] - 2024-07-15
### Added

- New endpoint [Create a bancontact payin](https://mangopay.com/docs/endpoints/bancontact#create-bancontact-payin)
- Parameter `StatementDescriptor` for the endpoint [Create refund payin](https://mangopay.com/docs/endpoints/refunds#create-refund-payin)
- Parameter `CardHolderName` for the endpoint [Deactivate or edit a Card](https://mangopay.com/docs/endpoints/direct-card-payins#deactivate-edit-card)
- Parameter PaymentCategory for the endpoints : [Create a card validation](https://mangopay.com/docs/endpoints/card-validations#create-card-validation), [Create a direct card payin](https://mangopay.com/docs/endpoints/direct-card-payins#create-direct-card-payin), [Create a preauthorization](https://mangopay.com/docs/endpoints/preauthorizations#create-preauthorization)

## [1.45.4] - 2024-05-24
### Added

- New parameter `CardHolderName` for [Update Card registration](https://mangopay.com/docs/endpoints/card-validations#update-card-registration)

## [1.45.3] - 2024-04-30
### Fixed

- Updated the implementation for [Look up metadata for a payment method](https://mangopay.com/docs/endpoints/payment-method-metadata#lookup-payment-method-metadata). The `CommercialIndicator` and `CardType` fields have been moved to the `BinData` object in the API response.

## [1.45.2] - 2024-04-16
### Fixed

- #400 & #401 Improve timeout error management

## [1.45.1] - 2024-04-02
### Added
- New parameter `SecureMode` for [Create card validation](https://mangopay.com/docs/endpoints/card-validations#create-card-validation)

## [1.45.0] - 2024-04-02
### Added

- New endpoint [Add tracking to Paypal payin](https://mangopay.com/docs/endpoints/paypal#add-tracking-paypal-payin)
- New parameters for Paypal mean of payment : `CancelURL` & `Category` (sub-parameter of `LineItems`). And management of `PaypalPayerID`, `BuyerCountry`, `BuyerFirstname`, `BuyerLastname`, `BuyerPhone`, `PaypalOrderID` in the response.

## [1.44.0] - 2024-03-15
### Fixed

- Conversions endpoint spelling
- #350 thanks @hostyn

### Added

- The optional Fees parameter is now available on instant conversions, allowing platforms to charge users for FX services. More information [here](https://mangopay.com/docs/release-notes/millefeuille).
- Platforms can now use a quote to secure the rate for a conversion between two currencies for a set amount of time. More information [here](https://mangopay.com/docs/release-notes/millefeuille).
- Introduced the `ukHeaderFlag` boolean configuration key. Platforms partnered with Mangopay's UK entity should set this key to true for proper configuration.

## [1.43.1] - 2024-02-29
### Fixed

- Fix for #393 and #395 : Reject promise on API error and fix `status` type.

## [1.43.0] - 2024-02-21
### Added

- New endpoint to look up metadata from BIN or Google Pay token. More information [here](https://mangopay.com/docs/release-notes/kisale)
- [Get a card validation endpoint](https://mangopay.com/docs/endpoints/card-validations#view-card-validation)
- Event types for Card Validation : "CARD_VALIDATION_CREATED", "CARD_VALIDATION_SUCCEEDED" and "CARD_VALIDATION_FAILED"

## [1.42.1] - 2024-02-08
### Fixed

We have upgraded our SDK to use Axios for API communication with Mangopay. This change ensures faster, more reliable, and secure interactions, aligning with our commitment to provide an efficient and robust user experience.

## [1.42.0] - 2023-12-22
### Added

New `CardInfo` parameter returned on card transactions. More information [here](https://mangopay.com/docs/release-notes/chilka).

## [1.41.1] - 2023-12-18
### Fixed

- Typing for User
- Comments #336

## [1.41.0] - 2023-12-06
### Added

The IDEAL legacy implementation has been enhanced. You can now pass the `Bic`, and if provided, the API response will include the `BankName` parameter. More information [here](https://mangopay.com/docs/endpoints/web-card-payins#create-web-card-payin).

### Fixed
BankingAlias typings have been fixed to match the API behavior

## [1.40.1] - 2023-11-09
### Added

It's now possible to specify an amount for DebitedFunds and Fees when you create a refund with `PayIns.createRefund()`

## [1.40.0] - 2023-11-02
### Updated

- Giropay and Ideal integrations with Mangopay have been improved. Some methods have been deprecated
- Klarna param "MerchantOrderId" has been renamed to "Reference"

### Fixed

- An error occurred while creating a transaction report. It has been fixed.

### Added

- New Reference parameter for the new Paypal implementation.

## [1.39.0] - 2023-09-29
### Added
- Instantly convert funds between 2 wallets of different currencies owned by the same user with the new SPOT FX endpoints

## [1.38.0] - 2023-09-22
### Added

Klarna is now available as a payment method with Mangopay. This payment method is in private beta. Please contact support if you have any questions.

## [1.37.0] - 2023-09-15
### Added

- Multibanco, Satispay, Blik are now available as a payment method with Mangopay. This payment method is in private beta. Please contact support if you have any questions.
- Card validation endpoint is now available (Private beta)
- A new parameter for Paypal : ShippingPreference

### Updated

- Google Pay integration with Mangopay has been improved. This payment method is in private beta. Please contact support if you have any questions.

### Fixed

- MBWay & PayPal are now using Web Execution Type.

## [1.36.0] - 2023-07-24
### Added

Paypal integration with Mangopay has been improved. This payment method is in private beta. Please contact support if you have any questions.

## [1.35.1] - 2023-07-07
### Fixed

- `Phone` parameter instead of `PhoneNumber` for MBWay

## [1.35.0] - 2023-06-21
### Added

- MB WAY is now available as a payment method with Mangopay. This payment method is in private beta. Please contact support if you have any questions.

## [1.34.0] - 2023-03-17
### Added

Knowing when a dispute was closed is now possible thanks to the new ClosedDate parameter for the Dispute object.

The following endpoints have been updated accordingly:

[Vew a Dispute](ttps://docs.mangopay.com/endpoints/v2.01/disputes#e240_view-a-dispute)

[List Disputes for a User](https://docs.mangopay.com/endpoints/v2.01/disputes#e817_list-a-users-disputes)

[List Disputes for a Wallet](https://docs.mangopay.com/endpoints/v2.01/disputes#e816_list-a-wallets-disputes)

[List all Disputes](https://docs.mangopay.com/endpoints/v2.01/disputes#e241_list-all-disputes)

[List Disputes that need settling](https://docs.mangopay.com/endpoints/v2.01/disputes#e980_list-disputes-that-need-settling)

Please note that the new ClosedDate field will only display values for the Disputes closed after this release. Otherwise, a null value will be returned.

## [1.33.1] - 2023-02-16
### Fixed

- Wrong return type in Disputes.getRepudiation() #339

## [1.33.0] - 2023-01-12
### Added

Verifying some specific legal structures is now more efficient thanks to a new legal entity type: `PARTNERSHIP`.

The Legal User LegalPersonType parameter now includes the `PARTNERSHIP` value. The following endpoints have been updated accordingly:

[Create a Legal User (Payer)](https://docs.mangopay.com/endpoints/v2.01/users#e259_create-a-legal-user)

[Create a Legal User (Owner)](https://docs.mangopay.com/endpoints/v2.01/users#e1060_create-a-legal-user-owner)

[Update a Legal User](https://docs.mangopay.com/endpoints/v2.01/users#e261_update-a-legal-user)

Please note that changing the LegalPersonType to `PARTNERSHIP` for an existing user will automatically result in:

- A KYC downgrade to Light (default) verification
- The REGISTRATION_PROOF document being flagged as OUT_OF_DATE.

With this new LegalPersonType, the MANGOPAY team can better handle specific legal structures and speed up the validation process.



## [1.32.1] - 2022-12-15
### Fixed

- Fix type on property PayinsLinked

## [1.32.0] - 2022-12-09
### Added

#### New 30-day preauthorization feature

Preauthorizations can now hold funds for up to 30 days, therefore ensuring the solvency of a registered card for the same amount of time.

- The **Deposit** service has been added with methods for creating, fetching and canceling a deposit
- The **Deposit** model has been created
- The **createCardPreAuthorizedDepositPayIn** method has been added to the PayIn service

Thanks to 30-day preauthorizations, MANGOPAY can provide a simpler and more flexible payment experience for a wide range of use cases, especially for rentals.

## [1.31.1] - 2022-10-14
### Fixed

- Compiling fails in Typescript 4.8 #335
- KYC's DocumentStatus missing value #333
- Fixed untyped property for CountryAuthorization
- Added missing UserId to UboDeclarationData

## [1.31.0] - 2022-08-25
##Added
**New country authorizations endpoints**

Country authorizations can now be viewed by using one of the following endpoints:

<a href="https://docs.mangopay.com/endpoints/v2.01/regulatory#e1061_the-country-authorizations-object">View a country's authorizations</a> <br>
<a href="https://docs.mangopay.com/endpoints/v2.01/regulatory#e1061_the-country-authorizations-object">View all countries' authorizations</a>

With these calls, it is possible to check which countries have:

- Blocked user creation
- Blocked bank account creation
- Blocked payout creation

Please refer to the <a href="https://docs.mangopay.com/guide/restrictions-by-country">Restrictions by country</a>
article for more information.

## [1.30.1] - 2022-08-17
##Fixed
- Missing types for error catching. Fix issue [#320](https://github.com/Mangopay/mangopay2-nodejs-sdk/issues/320)
- Missing types for BankAccount object. Fix issue [#319](https://github.com/Mangopay/mangopay2-nodejs-sdk/issues/319)
- Missing type for CardPreAuthorizationData. Fix issue [#311 ](https://github.com/Mangopay/mangopay2-nodejs-sdk/issues/311)
- OAuth token renewal bug fix

## [1.30.0] - 2022-06-29
##Added
**Recurring: €0 deadlines for CIT**

Setting free recurring payment deadlines is now possible for CIT (customer-initiated transactions) with the **FreeCycles** parameter.

The **FreeCycles** parameter allows platforms to define the number of consecutive deadlines that will be free. The following endpoints have been updated to take into account this new parameter:

<a href="https://docs.mangopay.com/endpoints/v2.01/payins#e1051_create-a-recurring-payin-registration">Create a Recurring PayIn Registration</a><br>
<a href="https://docs.mangopay.com/endpoints/v2.01/payins#e1056_view-a-recurring-payin-registration">View a Recurring PayIn Registration</a><br>

This feature provides new automation capabilities for platforms with offers such as “Get the first month free” or “free trial” subscriptions.

Please refer to the <a href="https://docs.mangopay.com/guide/recurring-payments-introduction">Recurring payments overview</a> documentation for more information.

## [1.29.2] - 2022-05-27
##Fixed
- User constructor issue

## [1.29.1] - 2022-05-23
##Fixed
- missing `UserCategory` added to `User Base classes`

## [1.29.0] - 2022-05-20
##Added
Users can now be differentiated depending on their MANGOPAY usage.

This is possible with the new UserCategory parameter, whose value can be set to:

- Payer – For users who are only using MANGOPAY to give money to other users (i.e., only pay).
- Owner – For users who are using MANGOPAY to receive funds (and who are therefore required to accept MANGOPAY’s terms and conditions).

Please note that the following parameters become required as soon as the UserCategory is set to “Owner”:

- HeadquartersAddress
- CompanyNumber (if the LegalPersonType is “Business”)
- TermsAndConditionsAccepted.

The documentation of user-related endpoints has been updated and reorganised to take into account the new parameter:

- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e255_create-a-natural-user">Create a Natural User (Payer)</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e1059_create-a-natural-user-owner">Create a Natural User (Owner)</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e260_update-a-natural-user">Update a Natural User</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e259_create-a-legal-user">Create a Legal User (Payer)</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e1060_create-a-legal-user-owner">Create a Legal User (Owner)</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e261_update-a-legal-user">Update a Legal User</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e256_view-a-user">View a User</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e257_list-all-users">List all Users</a>

Differentiating the platform users results in a smoother user experience for “Payers” as they will have less declarative data to provide.

## [1.28.0] - 2022-05-11
##Added
<b>Terms and conditions acceptance parameter</b>
<br>
The acceptance of the MANGOPAY terms and conditions by the end user can now be registered via the SDK.

This information can be managed by using the new TermsAndConditionsAccepted parameter added to the User object.

The following API endpoints have been updated to take into account the new TermsAndConditionsAccepted parameter:

- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e255_create-a-natural-user">Create a Natural User</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e260_update-a-natural-user">Update a Natural User</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e259_create-a-legal-user">Create a Legal User</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e261_update-a-legal-user">Update a Legal User</a>
- <a href="https://docs.mangopay.com/endpoints/v2.01/users#e256_view-a-user">View a User</a>


⚠️ Please note that:

- Existing users have to be updated to include the terms and conditions acceptance information.
- Once accepted, the terms and conditions cannot be revoked.

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
