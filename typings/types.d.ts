/**
 * Makes specified keys of an interface Optional.
 */
export type MakeKeysOptional<T1, T2 extends keyof T1> = Omit<T1, T2> &
    Partial<Pick<T1, T2>>;

export type PickPartial<T, Par extends keyof T> = Pick<Partial<T>, Par>;

export type PickPartialRequired<T,
    Par extends keyof T,
    Req extends keyof T> = Pick<Partial<T>, Par> & Pick<Required<T>, Req>;

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

/**
 * Makes specified keys of an interface nullable.
 */
export type MakeKeysNullable<T1, T2 extends keyof T1> = Omit<T1, T2> &
    { [P in T2]: T1[P] | null };

/**
 * Makes specified keys of an interface Required.
 */
export type MakeKeysRequired<T1, T2 extends keyof T1> = Omit<T1, T2> &
    Required<Pick<T1, T2>>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type OmitType<T extends { Type: string }> = Omit<T, "Type">;

export type ValueOf<T> = T[keyof T];

export type ApiMethod =
    | "authentication_oauth"
    | "responses_get"
    | "events_all"
    | "hooks_create"
    | "hooks_all"
    | "hooks_get"
    | "hooks_save"
    | "cardregistration_create"
    | "cardregistration_get"
    | "cardregistration_save"
    | "preauthorization_create"
    | "preauthorization_get"
    | "preauthorization_save"
    | "preauthorizations_get_for_user"
    | "card_get"
    | "cards_get_by_fingerprint"
    | "card_save"
    | "card_get_preauthorizations"
    | "payins_card-web_create"
    | "payins_card-direct_create"
    | "payins_preauthorized-direct_create"
    | "payins_bankwire-direct_create"
    | "payins_directdebit-web_create"
    | "payins_directdebit-direct_create"
    | "payins_paypal-web_create"
    | "payins_get"
    | "payins_createrefunds"
    | "payins_applepay-direct_create"
    | "payins_googlepay-direct_create"
    | "payins_recurring_registration"
    | "payins_recurring_registration_get"
    | "payins_recurring_registration_put"
    | "payins_create_recurring_card_direct"
    | "payins_payconiq-web_create"
    | "payins_payconiqv2-web_create"
    | "payouts_bankwire_create"
    | "payouts_bankwire_get"
    | "payouts_get"
    | "refunds_get"
    | "refunds_get_for_repudiation"
    | "refunds_get_for_transfer"
    | "refunds_get_for_payin"
    | "refunds_get_for_payout"
    | "transfers_create"
    | "transfers_get"
    | "transfers_createrefunds"
    | "users_createnaturals"
    | "users_createnaturals_sca"
    | "users_createlegals"
    | "users_createlegals_sca"
    | "users_createbankaccounts_iban"
    | "users_createbankaccounts_gb"
    | "users_createbankaccounts_us"
    | "users_createbankaccounts_ca"
    | "users_createbankaccounts_other"
    | "users_all"
    | "users_allwallets"
    | "users_allbankaccount"
    | "users_allcards"
    | "users_alltransactions"
    | "users_allkycdocuments"
    | "users_get"
    | "users_get_sca"
    | "users_getnaturals"
    | "users_getlegals"
    | "users_getnaturals_sca"
    | "users_getlegals_sca"
    | "users_getbankaccount"
    | "users_deactivate_bankaccount"
    | "users_savenaturals"
    | "users_savelegals"
    | "users_savenaturals_sca"
    | "users_savelegals_sca"
    | "users_getemoney"
    | "wallets_create"
    | "wallets_alltransactions"
    | "wallets_get"
    | "wallets_save"
    | "kyc_documents_create"
    | "kyc_documents_get"
    | "kyc_documents_save"
    | "kyc_page_create"
    | "kyc_documents_all"
    | "kyc_documents_get_alt"
    | "kyc_documents_create_consult"
    | "disputes_get"
    | "disputes_save_tag"
    | "disputes_save_contest_funds"
    | "dispute_save_close"
    | "disputes_get_transactions"
    | "disputes_all"
    | "disputes_get_for_wallet"
    | "disputes_get_for_user"
    | "disputes_document_create"
    | "disputes_document_page_create"
    | "disputes_document_save"
    | "disputes_document_get"
    | "disputes_document_get_for_dispute"
    | "disputes_document_all"
    | "disputes_document_create_consult"
    | "disputes_repudiation_get"
    | "disputes_repudiation_create_settlement"
    | "disputes_repudiation_get_settlement"
    | "disputes_pending_settlement"
    | "reports_transactions_create"
    | "reports_wallet_create"
    | "reports_get"
    | "reports_all"
    | "mandates_directdebit-web_create"
    | "mandates_get"
    | "mandates_cancel"
    | "mandates_all"
    | "mandates_get_for_user"
    | "mandates_get_for_bank_account"
    | "clients_get"
    | "clients_update"
    | "clients_upload_logo"
    | "client_wallets_all"
    | "client_wallets_get"
    | "client_wallets_by_fundsType"
    | "client_wallets_transactions"
    | "banking_aliases_iban_create"
    | "banking_aliases_get"
    | "banking_aliases_update"
    | "banking_aliases_all"
    | "ubo_declaration_create"
    | "ubo_declaration_update"
    | "ubo_declaration_get"
    | "ubo_declarations_get"
    | "ubo_create"
    | "ubo_update"
    | "ubo_get"
    | "transactions_get_for_mandate"
    | "transactions_get_for_card"
    | "transactions_get_for_bank_account"
    | "idempotency_response_get"
    | "payins_mbway-web_create"
    | "payins_bcmc-web_create"
    | "payins_paypal-web_create_v2"
    | "payins_multibanco-web_create"
    | "payins_satispay-web_create"
    | "payins_blik-web_create"
    | "payins_googlepay-direct_create_v2"
    | "payins_klarna-web_create"
    | "payins_ideal-web_create"
    | "payins_giropay-web_create"
    | "payins_swish-web_create"
    | "payins_twint-web_create"
    | "payins_paybybank-web_create"
    | "get_conversion_rate"
    | "create_instant_conversion"
    | "create_quoted_conversion"
    | "get_conversion"
    | "create_quote"
    | "get_quote"
    | "add_tracking_info"
    | "identity_verification_create"
    | "identity_verification_get"
    | "identity_verification_checks_get"
    | "users_categorizelegals_sca"
    | "users_categorizenaturals_sca"
    | "users_enroll_sca"

export type CountryISO =
    | "AD"
    | "AE"
    | "AF"
    | "AG"
    | "AI"
    | "AL"
    | "AM"
    | "AO"
    | "AQ"
    | "AR"
    | "AS"
    | "AT"
    | "AU"
    | "AW"
    | "AX"
    | "AZ"
    | "BA"
    | "BB"
    | "BD"
    | "BE"
    | "BF"
    | "BG"
    | "BH"
    | "BI"
    | "BJ"
    | "BL"
    | "BM"
    | "BN"
    | "BO"
    | "BQ"
    | "BR"
    | "BS"
    | "BT"
    | "BV"
    | "BW"
    | "BY"
    | "BZ"
    | "CA"
    | "CC"
    | "CD"
    | "CF"
    | "CG"
    | "CH"
    | "CI"
    | "CK"
    | "CL"
    | "CM"
    | "CN"
    | "CO"
    | "CR"
    | "CS"
    | "CU"
    | "CV"
    | "CW"
    | "CX"
    | "CY"
    | "CZ"
    | "DA"
    | "DE"
    | "DJ"
    | "DK"
    | "DM"
    | "DO"
    | "DZ"
    | "EC"
    | "EE"
    | "EG"
    | "EH"
    | "ER"
    | "ES"
    | "ET"
    | "EN"
    | "EL"
    | "FI"
    | "FJ"
    | "FK"
    | "FM"
    | "FO"
    | "FR"
    | "GA"
    | "GB"
    | "GD"
    | "GE"
    | "GF"
    | "GG"
    | "GH"
    | "GI"
    | "GL"
    | "GM"
    | "GN"
    | "GP"
    | "GQ"
    | "GR"
    | "GS"
    | "GT"
    | "GU"
    | "GW"
    | "GY"
    | "HK"
    | "HM"
    | "HN"
    | "HR"
    | "HT"
    | "HU"
    | "ID"
    | "IE"
    | "IL"
    | "IM"
    | "IN"
    | "IO"
    | "IQ"
    | "IR"
    | "IS"
    | "IT"
    | "JE"
    | "JM"
    | "JO"
    | "JP"
    | "KE"
    | "KG"
    | "KH"
    | "KI"
    | "KM"
    | "KN"
    | "KP"
    | "KR"
    | "KW"
    | "KY"
    | "KZ"
    | "LA"
    | "LB"
    | "LC"
    | "LI"
    | "LK"
    | "LR"
    | "LS"
    | "LT"
    | "LU"
    | "LV"
    | "LY"
    | "MA"
    | "MC"
    | "MD"
    | "ME"
    | "MF"
    | "MG"
    | "MH"
    | "MK"
    | "ML"
    | "MM"
    | "MN"
    | "MO"
    | "MP"
    | "MQ"
    | "MR"
    | "MS"
    | "MT"
    | "MU"
    | "MV"
    | "MW"
    | "MX"
    | "MY"
    | "MZ"
    | "NA"
    | "NC"
    | "NE"
    | "NF"
    | "NG"
    | "NI"
    | "NL"
    | "NO"
    | "NP"
    | "NR"
    | "NU"
    | "NZ"
    | "OM"
    | "PA"
    | "PE"
    | "PF"
    | "PG"
    | "PH"
    | "PK"
    | "PL"
    | "PM"
    | "PN"
    | "PR"
    | "PS"
    | "PT"
    | "PW"
    | "PY"
    | "QA"
    | "RE"
    | "RO"
    | "RS"
    | "RU"
    | "RW"
    | "SA"
    | "SB"
    | "SC"
    | "SD"
    | "SE"
    | "SG"
    | "SH"
    | "SI"
    | "SJ"
    | "SK"
    | "SL"
    | "SM"
    | "SN"
    | "SO"
    | "SR"
    | "SS"
    | "ST"
    | "SV"
    | "SX"
    | "SY"
    | "SZ"
    | "TC"
    | "TD"
    | "TF"
    | "TG"
    | "TH"
    | "TJ"
    | "TK"
    | "TL"
    | "TM"
    | "TN"
    | "TO"
    | "TR"
    | "TT"
    | "TV"
    | "TW"
    | "TZ"
    | "UA"
    | "UG"
    | "UM"
    | "US"
    | "UY"
    | "UZ"
    | "VA"
    | "VC"
    | "VE"
    | "VG"
    | "VI"
    | "VN"
    | "VU"
    | "WF"
    | "WS"
    | "YE"
    | "YT"
    | "ZA"
    | "ZM"
    | "ZW";

export type CurrencyISO =
    | "AED"
    | "AFN"
    | "ALL"
    | "AMD"
    | "ANG"
    | "AOA"
    | "ARS"
    | "AUD"
    | "AWG"
    | "AZN"
    | "BAM"
    | "BBD"
    | "BDT"
    | "BGN"
    | "BHD"
    | "BIF"
    | "BMD"
    | "BND"
    | "BOB"
    | "BRL"
    | "BSD"
    | "BTN"
    | "BWP"
    | "BYN"
    | "BZD"
    | "CAD"
    | "CDF"
    | "CHF"
    | "CLP"
    | "CNY"
    | "COP"
    | "CRC"
    | "CUC"
    | "CUP"
    | "CVE"
    | "CZK"
    | "DJF"
    | "DKK"
    | "DOP"
    | "DZD"
    | "EGP"
    | "ERN"
    | "ETB"
    | "EUR"
    | "FJD"
    | "FKP"
    | "GBP"
    | "GEL"
    | "GGP"
    | "GHS"
    | "GIP"
    | "GMD"
    | "GNF"
    | "GTQ"
    | "GYD"
    | "HKD"
    | "HNL"
    | "HRK"
    | "HTG"
    | "HUF"
    | "IDR"
    | "ILS"
    | "IMP"
    | "INR"
    | "IQD"
    | "IRR"
    | "ISK"
    | "JEP"
    | "JMD"
    | "JOD"
    | "JPY"
    | "KES"
    | "KGS"
    | "KHR"
    | "KMF"
    | "KPW"
    | "KRW"
    | "KWD"
    | "KYD"
    | "KZT"
    | "LAK"
    | "LBP"
    | "LKR"
    | "LRD"
    | "LSL"
    | "LYD"
    | "MAD"
    | "MDL"
    | "MGA"
    | "MKD"
    | "MMK"
    | "MNT"
    | "MOP"
    | "MRU"
    | "MUR"
    | "MVR"
    | "MWK"
    | "MXN"
    | "MYR"
    | "MZN"
    | "NAD"
    | "NGN"
    | "NIO"
    | "NOK"
    | "NPR"
    | "NZD"
    | "OMR"
    | "PAB"
    | "PEN"
    | "PGK"
    | "PHP"
    | "PKR"
    | "PLN"
    | "PYG"
    | "QAR"
    | "RON"
    | "RSD"
    | "RUB"
    | "RWF"
    | "SAR"
    | "SBD"
    | "SCR"
    | "SDG"
    | "SEK"
    | "SGD"
    | "SHP"
    | "SLL"
    | "SOS"
    | "SPL"
    | "SRD"
    | "STN"
    | "SVC"
    | "SYP"
    | "SZL"
    | "THB"
    | "TJS"
    | "TMT"
    | "TND"
    | "TOP"
    | "TRY"
    | "TTD"
    | "TVD"
    | "TWD"
    | "TZS"
    | "UAH"
    | "UGX"
    | "USD"
    | "UYU"
    | "UZS"
    | "VEF"
    | "VND"
    | "VUV"
    | "WST"
    | "XAF"
    | "XCD"
    | "XDR"
    | "XOF"
    | "XPF"
    | "YER"
    | "ZAR"
    | "ZMW"
    | "ZWD";

/** A UTC timestamp in seconds */
export type Timestamp = number;

export type SecureMode = "DEFAULT" | "FORCE" | "NO_CHOICE";

export type VirtualAccountPurpose = "COLLECTION" | "USER_OWNED";
export type VirtualAccountStatus = "PENDING" | "FAILED" | "ACTIVE" | "BLOCKED" | "CLOSED"
export type VirtualAccountOwner = "COLLECTION" | "USER_OWNED";