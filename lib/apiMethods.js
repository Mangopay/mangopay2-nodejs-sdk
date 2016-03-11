module.exports = {
  "authentication_base" : [ "/${apiVersion}/api/clients/", "POST" ],
  "authentication_oauth" : [ "/${apiVersion}/oauth/token ", "POST" ],

  "responses_get" : [ "/${apiVersion}/${clientId}/responses/${id}", "GET"],

  "events_all" : [ "/${apiVersion}/${clientId}/events", "GET" ],

  "hooks_create" : [ "/${apiVersion}/${clientId}/hooks", "POST" ],
  "hooks_all" : [ "/${apiVersion}/${clientId}/hooks", "GET" ],
  "hooks_get" : [ "/${apiVersion}/${clientId}/hooks/${id}", "GET" ],
  "hooks_save" : [ "/${apiVersion}/${clientId}/hooks/${id}", "PUT" ],

  "cardregistration_create" : [ "/${apiVersion}/${clientId}/cardregistrations", "POST" ],
  "cardregistration_get" : [ "/${apiVersion}/${clientId}/cardregistrations/${id}", "GET" ],
  "cardregistration_save" : [ "/${apiVersion}/${clientId}/cardregistrations/${id}", "PUT" ],

  "preauthorization_create" : [ "/${apiVersion}/${clientId}/preauthorizations/card/direct", "POST" ],
  "preauthorization_get" : [ "/${apiVersion}/${clientId}/preauthorizations/${id}", "GET" ],
  "preauthorization_save" : [ "/${apiVersion}/${clientId}/preauthorizations/${id}", "PUT" ],

  "card_get" : [ "/${apiVersion}/${clientId}/cards/${id}", "GET" ],
  "card_save" : [ "/${apiVersion}/${clientId}/cards/${id}", "PUT" ],

  // pay ins URLs
  "payins_card-web_create" : [ "/${apiVersion}/${clientId}/payins/card/web/", "POST" ],
  "payins_card-direct_create" : [ "/${apiVersion}/${clientId}/payins/card/direct/", "POST" ],
  "payins_preauthorized-direct_create" : [ "/${apiVersion}/${clientId}/payins/preauthorized/direct/", "POST" ],
  "payins_bankwire-direct_create" : [ "/${apiVersion}/${clientId}/payins/bankwire/direct/", "POST" ],
  "payins_directdebit-web_create" : [ "/${apiVersion}/${clientId}/payins/directdebit/web", "POST" ],
  "payins_get" : [ "/${apiVersion}/${clientId}/payins/${id}", "GET" ],
  "payins_createrefunds" : [ "/${apiVersion}/${clientId}/payins/${id}/refunds", "POST" ],

  "payouts_bankwire_create" : [ "/${apiVersion}/${clientId}/payouts/bankwire/", "POST" ],
  "payouts_get" : [ "/${apiVersion}/${clientId}/payouts/${id}", "GET" ],

  "refunds_get" : [ "/${apiVersion}/${clientId}/refunds/${id}", "GET" ],

  "transfers_create" : [ "/${apiVersion}/${clientId}/transfers", "POST" ],
  "transfers_get" : [ "/${apiVersion}/${clientId}/transfers/${id}", "GET" ],
  "transfers_createrefunds" : [ "/${apiVersion}/${clientId}/transfers/${id}/refunds", "POST" ],

  "users_createnaturals" : [ "/${apiVersion}/${clientId}/users/natural", "POST" ],
  "users_createlegals" : [ "/${apiVersion}/${clientId}/users/legal", "POST" ],

  "users_createbankaccounts_iban" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/iban", "POST" ],
  "users_createbankaccounts_gb" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/gb", "POST" ],
  "users_createbankaccounts_us" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/us", "POST" ],
  "users_createbankaccounts_ca" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/ca", "POST" ],
  "users_createbankaccounts_other" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/other", "POST" ],

  "users_all" : [ "/${apiVersion}/${clientId}/users", "GET" ],
  "users_allwallets" : [ "/${apiVersion}/${clientId}/users/${id}/wallets", "GET" ],
  "users_allbankaccount" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts", "GET" ],
  "users_allcards" : [ "/${apiVersion}/${clientId}/users/${id}/cards", "GET" ],
  "users_alltransactions" : [ "/${apiVersion}/${clientId}/users/${id}/transactions", "GET" ],
  "users_allkycdocuments" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents", "GET" ],
  "users_get" : [ "/${apiVersion}/${clientId}/users/${id}", "GET" ],
  "users_getnaturals" : [ "/${apiVersion}/${clientId}/users/natural/${id}", "GET" ],
  "users_getlegals" : [ "/${apiVersion}/${clientId}/users/legal/${id}", "GET" ],
  "users_getbankaccount" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/${id}", "GET" ],
  "users_savenaturals" : [ "/${apiVersion}/${clientId}/users/natural/${id}", "PUT" ],
  "users_savelegals" : [ "/${apiVersion}/${clientId}/users/legal/${id}", "PUT" ],

  "wallets_create" : [ "/${apiVersion}/${clientId}/wallets", "POST" ],
  "wallets_alltransactions" : [ "/${apiVersion}/${clientId}/wallets/${id}/transactions", "GET" ],
  "wallets_get" : [ "/${apiVersion}/${clientId}/wallets/${id}", "GET" ],
  "wallets_save" : [ "/${apiVersion}/${clientId}/wallets/${id}", "PUT" ],

  "kyc_documents_create" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/", "POST" ],
  "kyc_documents_get" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/${id}", "GET" ],
  "kyc_documents_save" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/${id}", "PUT" ],
  "kyc_page_create" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/${id}/pages", "POST" ],
  "kyc_documents_all" : [ "/${apiVersion}/${clientId}/KYC/documents", "GET" ],
  "kyc_documents_get_alt" : [ "/${apiVersion}/${clientId}/KYC/documents/${id}", "GET" ],

  "disputes_get" : [ "/${apiVersion}/${clientId}/disputes/${id}", "GET"],
  "disputes_save_tag" : [ "/${apiVersion}/${clientId}/disputes/${id}", "PUT"],
  "disputes_save_contest_funds" : [ "/${apiVersion}/${clientId}/disputes/${id}/submit", "PUT"],
  "dispute_save_close" : [ "/${apiVersion}/${clientId}/disputes/${id}/close", "PUT"],

  "disputes_get_transactions" : [ "/${apiVersion}/${clientId}/disputes/${id}/transactions", "GET"],

  "disputes_all" : [ "/${apiVersion}/${clientId}/disputes", "GET"],
  "disputes_get_for_wallet" : [ "/${apiVersion}/${clientId}/wallets/${id}/disputes", "GET"],
  "disputes_get_for_user" : [ "/${apiVersion}/${clientId}/users/${id}/disputes", "GET"],

  "disputes_document_create" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents", "POST"],
  "disputes_document_page_create" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents/${id}/pages", "POST"],
  "disputes_document_save" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents/${id}", "PUT"],
  "disputes_document_get" : [ "/${apiVersion}/${clientId}/dispute-documents/${id}", "GET"],
  "disputes_document_get_for_dispute" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents", "GET"],
  "disputes_document_all" : [ "/${apiVersion}/${clientId}/dispute-documents", "GET"],

  "disputes_repudiation_get" : [ "/${apiVersion}/${clientId}/repudiations/${id}", "GET"],

  "disputes_repudiation_create_settlement" : [ "/${apiVersion}/${clientId}/repudiations/${id}/settlementtransfer", "POST"],
  "disputes_repudiation_get_settlement" : [ "/${apiVersion}/${clientId}/settlements/${id}", "GET"],

  // These are temporary functions and WILL be removed in the future.
  // Please, contact with support before using these features or if you have any questions.
  "temp_paymentcards_create" : [ "/${apiVersion}/${clientId}/temp/paymentcards", "POST" ],
  "temp_paymentcards_get" : [ "/${apiVersion}/${clientId}/temp/paymentcards/${id}", "GET" ],
  "temp_immediatepayins_create" : [ "/${apiVersion}/${clientId}/temp/immediate-payins", "POST" ]
};