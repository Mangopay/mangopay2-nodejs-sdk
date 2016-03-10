module.exports = {
  "authentication_base" : [ "/api/clients/", "POST" ],
  "authentication_oauth" : [ "/oauth/token ", "POST" ],

  "responses_get" : [ "/responses/${id}", "GET"],

  "events_all" : [ "/events", "GET" ],

  "hooks_create" : [ "/hooks", "POST" ],
  "hooks_all" : [ "/hooks", "GET" ],
  "hooks_get" : [ "/hooks/${id}", "GET" ],
  "hooks_save" : [ "/hooks/${id}", "PUT" ],

  "cardregistration_create" : [ "/cardregistrations", "POST" ],
  "cardregistration_get" : [ "/cardregistrations/${id}", "GET" ],
  "cardregistration_save" : [ "/cardregistrations/${id}", "PUT" ],

  "preauthorization_create" : [ "/preauthorizations/card/direct", "POST" ],
  "preauthorization_get" : [ "/preauthorizations/${id}", "GET" ],
  "preauthorization_save" : [ "/preauthorizations/${id}", "PUT" ],

  "card_get" : [ "/cards/${id}", "GET" ],
  "card_save" : [ "/cards/${id}", "PUT" ],

  // pay ins URLs
  "payins_card-web_create" : [ "/payins/card/web/", "POST" ],
  "payins_card-direct_create" : [ "/payins/card/direct/", "POST" ],
  "payins_preauthorized-direct_create" : [ "/payins/preauthorized/direct/", "POST" ],
  "payins_bankwire-direct_create" : [ "/payins/bankwire/direct/", "POST" ],
  "payins_directdebit-web_create" : [ "/payins/directdebit/web", "POST" ],
  "payins_get" : [ "/payins/${id}", "GET" ],
  "payins_createrefunds" : [ "/payins/${id}/refunds", "POST" ],

  "payouts_bankwire_create" : [ "/payouts/bankwire/", "POST" ],
  "payouts_get" : [ "/payouts/${id}", "GET" ],

  "refunds_get" : [ "/refunds/${id}", "GET" ],

  "transfers_create" : [ "/transfers", "POST" ],
  "transfers_get" : [ "/transfers/${id}", "GET" ],
  "transfers_createrefunds" : [ "/transfers/${id}/refunds", "POST" ],

  "users_createnaturals" : [ "/users/natural", "POST" ],
  "users_createlegals" : [ "/users/legal", "POST" ],

  "users_createbankaccounts_iban" : [ "/users/${id}/bankaccounts/iban", "POST" ],
  "users_createbankaccounts_gb" : [ "/users/${id}/bankaccounts/gb", "POST" ],
  "users_createbankaccounts_us" : [ "/users/${id}/bankaccounts/us", "POST" ],
  "users_createbankaccounts_ca" : [ "/users/${id}/bankaccounts/ca", "POST" ],
  "users_createbankaccounts_other" : [ "/users/${id}/bankaccounts/other", "POST" ],

  "users_all" : [ "/users", "GET" ],
  "users_allwallets" : [ "/users/${id}/wallets", "GET" ],
  "users_allbankaccount" : [ "/users/${id}/bankaccounts", "GET" ],
  "users_allcards" : [ "/users/${id}/cards", "GET" ],
  "users_alltransactions" : [ "/users/${id}/transactions", "GET" ],
  "users_allkycdocuments" : [ "/users/${id}/KYC/documents", "GET" ],
  "users_get" : [ "/users/${id}", "GET" ],
  "users_getnaturals" : [ "/users/natural/${id}", "GET" ],
  "users_getlegals" : [ "/users/legal/${id}", "GET" ],
  "users_getbankaccount" : [ "/users/${id}/bankaccounts/${id}", "GET" ],
  "users_savenaturals" : [ "/users/natural/${id}", "PUT" ],
  "users_savelegals" : [ "/users/legal/${id}", "PUT" ],

  "wallets_create" : [ "/wallets", "POST" ],
  "wallets_alltransactions" : [ "/wallets/${id}/transactions", "GET" ],
  "wallets_get" : [ "/wallets/${id}", "GET" ],
  "wallets_save" : [ "/wallets/${id}", "PUT" ],

  "kyc_documents_create" : [ "/users/${id}/KYC/documents/", "POST" ],
  "kyc_documents_get" : [ "/users/${id}/KYC/documents/${id}", "GET" ],
  "kyc_documents_save" : [ "/users/${id}/KYC/documents/${id}", "PUT" ],
  "kyc_page_create" : [ "/users/${id}/KYC/documents/${id}/pages", "POST" ],
  "kyc_documents_all" : [ "/KYC/documents", "GET" ],
  "kyc_documents_get_alt" : [ "/KYC/documents/${id}", "GET" ],

  "disputes_get" : [ "/disputes/${id}", "GET"],
  "disputes_save_tag" : [ "/disputes/${id}", "PUT"],
  "disputes_save_contest_funds" : [ "/disputes/${id}/submit", "PUT"],
  "dispute_save_close" : [ "/disputes/${id}/close", "PUT"],

  "disputes_get_transactions" : [ "/disputes/${id}/transactions", "GET"],

  "disputes_all" : [ "/disputes", "GET"],
  "disputes_get_for_wallet" : [ "/wallets/${id}/disputes", "GET"],
  "disputes_get_for_user" : [ "/users/${id}/disputes", "GET"],

  "disputes_document_create" : [ "/disputes/${id}/documents", "POST"],
  "disputes_document_page_create" : [ "/disputes/${id}/documents/${id}/pages", "POST"],
  "disputes_document_save" : [ "/disputes/${id}/documents/${id}", "PUT"],
  "disputes_document_get" : [ "/dispute-documents/${id}", "GET"],
  "disputes_document_get_for_dispute" : [ "/disputes/${id}/documents", "GET"],
  "disputes_document_all" : [ "/dispute-documents", "GET"],

  "disputes_repudiation_get" : [ "/repudiations/${id}", "GET"],

  "disputes_repudiation_create_settlement" : [ "/repudiations/${id}/settlementtransfer", "POST"],
  "disputes_repudiation_get_settlement" : [ "/settlements/${id}", "GET"],

  // These are temporary functions and WILL be removed in the future.
  // Please, contact with support before using these features or if you have any questions.
  "temp_paymentcards_create" : [ "/temp/paymentcards", "POST" ],
  "temp_paymentcards_get" : [ "/temp/paymentcards/${id}", "GET" ],
  "temp_immediatepayins_create" : [ "/temp/immediate-payins", "POST" ]
};