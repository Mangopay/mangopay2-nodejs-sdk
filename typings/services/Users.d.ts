import { user } from "../models/user";
import { Models } from "../models";
import { bankAccount } from "../models/bankAccount";
import { wallet } from "../models/wallet";
import { transaction } from "../models/transaction";
import { card } from "../models/card";
import { kycDocument } from "../models/kycDocument";
import { money } from "../models/money";
import { cardPreAuthorization } from "../models/cardPreauthorization";
import { base } from "../base";
import MethodOverload = base.MethodOverload;
import NoArgMethodOverload = base.NoArgMethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;
import ThreeArgsMethodOverload = base.ThreeArgsMethodOverload;

export class Users {
    /**
     * Create a new user
     * @param user
     */
    create: MethodOverload<user.CreateUserLegalData, user.UserLegalData> &
        MethodOverload<user.CreateUserNaturalData, user.UserNaturalData> &
        MethodOverload<user.CreateUserNaturalPayerData, user.UserNaturalData> &
        MethodOverload<user.CreateUserNaturalOwnerData, user.UserNaturalData> &
        MethodOverload<user.CreateUserLegalPayerData, user.UserLegalData> &
        MethodOverload<user.CreateUserLegalOwnerData, user.UserLegalData> &
        MethodOverload<user.CreateUserNaturalScaData, user.UserNaturalScaData> &
        MethodOverload<user.CreateUserLegalScaData, user.UserLegalScaData>;

    /**
     * Update a user
     * @param user
     * @param options
     */
    update: MethodOverload<Models.UserLegal | user.UpdateUserLegalData, user.UserLegalData> &
        MethodOverload<Models.UserNatural | user.UpdateUserNaturalData, user.UserNaturalData>;

    /**
     * Modify details for a Natural/Legal Payer or Owner without changing category
     * @param user
     * @param options
     */
    updateSca: MethodOverload<user.UpdateUserLegalScaData, user.UserLegalScaData> &
        MethodOverload<user.UpdateUserNaturalScaData, user.UserNaturalScaData>;

    /**
     * Get natural or legal user by ID
     * @param userId
     * @param options
     */
    get: MethodOverload<string, user.UserLegalData | user.UserNaturalData>;

    /**
     * Get natural or legal SCA user by ID
     * @param userId
     * @param options
     */
    getSca: MethodOverload<string, user.UserLegalScaData | user.UserNaturalScaData>;

    /**
     * Get natural user by ID
     * @param userId
     * @param options
     */
    getNatural: MethodOverload<string, user.UserNaturalData>;

    /**
     * Get natural SCA user by ID
     * @param userId
     * @param options
     */
    getNaturalSca: MethodOverload<string, user.UserNaturalScaData>;

    /**
     * Get legal user by ID
     * @param userId
     * @param options
     */
    getLegal: MethodOverload<string, user.UserLegalData>;

    /**
     * Get legal SCA user by ID
     * @param userId
     * @param options
     */
    getLegalSca: MethodOverload<string, user.UserLegalScaData>;

    /**
     * Get all users
     */
    getAll: NoArgMethodOverload<
        Array<user.UserLegalData | user.UserNaturalData>
        >;

    /**
     * Create bank account for user
     * @param userId
     * @param bankAccount
     * @param options
     */
    createBankAccount:
        TwoArgsMethodOverload<string, bankAccount.USDetails, bankAccount.USData> &
        TwoArgsMethodOverload<string, bankAccount.OtherDetails, bankAccount.OtherData> &
        TwoArgsMethodOverload<string, bankAccount.IBANDetails, bankAccount.IBANData> &
        TwoArgsMethodOverload<string, bankAccount.GBDetails, bankAccount.GBData> &
        TwoArgsMethodOverload<string, bankAccount.CADetails, bankAccount.CAData>;

    /**
     * Deactivate a bank account
     *
     * Note that once deactivated, a bank account can't be reactivated afterwards
     * @param userId
     * @param bankAccountId
     * @param options
     */
    deactivateBankAccount: TwoArgsMethodOverload<string, string, bankAccount.Data>;

    /**
     * Get all bank accounts for user
     * @param userId
     * @param options
     */
    getBankAccounts: MethodOverload<string, bankAccount.Data[]>;

    /**
     * Get all bank accounts for user
     * @param userId
     * @param bankAccountId
     * @param options
     */
    getBankAccount: TwoArgsMethodOverload<string, string, bankAccount.Data>;

    /**
     * Get all wallets accounts for user
     */
    getWallets: MethodOverload<string, wallet.WalletData[]>;

    /**
     * Get all transactions for user
     * @param userId
     * @param options
     */
    getTransactions: MethodOverload<string, transaction.TransactionData[]>;

    /**
     * Get all cards for user
     * @param userId
     * @param options
     */
    getCards: MethodOverload<string, card.CardData[]>;

    /**
     * Create new KYC document
     * @param  userId
     * @param  kycDocument
     * @param  options
     */
    createKycDocument: TwoArgsMethodOverload<
        string,
        kycDocument.CreateKycDocument,
        kycDocument.KycDocumentData
        >;

    /**
     * Get all KYC documents for user
     * @param userId
     * @param options
     */
    getKycDocuments: MethodOverload<string, kycDocument.KycDocumentData[]>;

    /**
     * Get KYC document
     * @param userId
     * @param kycDocumentId
     * @param options
     */
    getKycDocument: TwoArgsMethodOverload<
        string,
        string,
        kycDocument.KycDocumentData
        >;

    /**
     * Update status of KYC Document (Currently only allows for submitting the document)
     * @param userId
     * @param kycDocument
     * @param options
     */
    updateKycDocument: TwoArgsMethodOverload<
        string,
        kycDocument.SubmitKycDocument,
        kycDocument.KycDocumentData
        >;

    /**
     * Create page for KYC document
     * @param userId
     * @param kycDocumentId
     * @param kycPage
     * @param options
     */
    createKycPage: ThreeArgsMethodOverload<
        string,
        string,
        kycDocument.CreateKycPage,
        kycDocument.KycDocumentData
        >;

    /**
     * Create page for KYC document
     * @param userId
     * @param kycDocumentId
     * @param filePath
     * @param options
     */
    createKycPageFromFile: ThreeArgsMethodOverload<
        string,
        string,
        string,
        kycDocument.KycDocumentData
        >;

    /**
     * Get users's EMoney
     * @param userId
     * @param options
     */
    getEMoney: MethodOverload<string, money.EMoneyData>;

    /**
     * Get all user preauthorizations
     * @param userId
     * @param options
     */
    getPreAuthorizations: MethodOverload<
        string,
        cardPreAuthorization.CardPreAuthorizationData[]
        >;

    /**
     * This endpoint allows you to transition a user whose UserCategory is PAYER into an OWNER
     * by providing the required information and redirecting them on the PendingUserAction.RedirectUrl
     * response value to complete SCA enrollment.
     *
     * For Natural Users, optionally, you can update the Email and provide or update the PhoneNumber
     * and PhoneNumberCountry before SCA redirection.
     *
     * For Legal Users, optionally, you can update the LegalRepresentative.Email and provide or update
     * the LegalRepresentative.PhoneNumber and LegalRepresentative.PhoneNumberCountry before SCA redirection.
     *
     * @param user
     * @param options
     */
    categorize: MethodOverload<user.CategorizeUserNatural, user.UserNaturalScaData> &
        MethodOverload<user.CategorizeUserLegal, user.UserLegalScaData>;

    /**
     * If UserCategory is OWNER, this endpoint allows you to enroll a user in SCA.
     * Your platform needs to retrieve the returned PendingUserAction.RedirectUrl,
     * add an encoded returnUrl query parameter for them to be returned to after the SCA session,
     * and redirect the userGet natural or legal user by ID
     *
     * @param userId
     * @param options
     */
    enroll: MethodOverload<string, user.UserEnrollmentResult>;
}
