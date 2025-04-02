/**
 * @module Users
 * @desc [MangoPay Users API Reference](https://docs.mangopay.com/endpoints/v2.01/users)
 */
var _ = require('underscore');
var fs = require('fs');
var Promise = require('promise');
var Service = require('../service');

var UserNatural = require('../models/UserNatural');
var UserNaturalSca = require('../models/UserNaturalSca');
var UserLegal = require('../models/UserLegal');
var UserLegalSca = require('../models/UserLegalSca');
var PersonType = require('../models/PersonType');
var BankAccountDetailsCA = require('../models/BankAccountDetailsCA');
var BankAccountDetailsGB = require('../models/BankAccountDetailsGB');
var BankAccountDetailsIBAN = require('../models/BankAccountDetailsIBAN');
var BankAccountDetailsOTHER = require('../models/BankAccountDetailsOTHER');
var BankAccountDetailsUS = require('../models/BankAccountDetailsUS');
var BankAccount = require('../models/BankAccount');
var Wallet = require('../models/Wallet');
var Transaction = require('../models/Transaction');
var Card = require('../models/Card');
var KycDocument = require('../models/KycDocument');
var KycPage = require('../models/KycPage');
var EMoney = require('../models/EMoney');
var UboDeclaration = require('../models/UboDeclaration');
var PreAuthorization = require('../models/CardPreAuthorization');
var UserNaturalPut = require('../models/UserNaturalPut');
var CategorizeUserNatural = require('../models/CategorizeUserNatural');
var CategorizeUserLegal = require('../models/CategorizeUserLegal');
var UserEnrollmentResult = require('../models/UserEnrollmentResult');

var Users = Service.extend({
    /**
     * Create a new user
     * @param {Object} user     Can be a UserNatural, UserLegal, UserNaturalSca, UserLegalSca or a hash of user properties.
     * @return {Object}         Promise of the request
     */
    create: function(user, callback, options) {
        var userCreateDetails = this._getUserApiAndClass(user);

        // user.NaturalSca and user.LegalSca are needed for SCA when using TS, but should not be sent to the API
        delete user.NaturalSca;
        delete user.LegalSca;

        options = this._api._getOptions(callback,
            options,
            {
                data: user,
                dataClass: userCreateDetails.userClass
            });

        return this._api.method(userCreateDetails.createApiMethod, callback, options);
    },

    /**
     * Get all users
     * @return {Object}    Request promise
     */
    getAll: function(callback, options) {
        return this._api.method('users_all', callback, options);
    },

    /**
     * Get natural or legal user by ID
     * @param {number}  userId  User identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */
    get: function(userId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                }
            });

        return this._api.method('users_get', callback, options);
    },

    /**
     * Get natural or legal SCA user by ID
     * @param {number}  userId  User identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */
    getSca: function(userId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                }
            });

        return this._api.method('users_get_sca', callback, options);
    },

    /**
     * Get natural user by ID
     * @param {number} userId       User identifier
     * @param {Function} callback    Callback function              Callback function
     * @param {Object}  options     Request options
     * @return {Object}             Request promise
     */
    getNatural: function(userId, callback, options) {
        options = this._api._getOptions(callback, options);
        options = _.extend({},
            options,
            {
                path: {
                    id: userId
                },
                dataClass: UserNatural
            });

        return this._api.method('users_getnaturals', callback, options);
    },

    /**
     * Get natural SCA user by ID
     * @param {number} userId       User identifier
     * @param {Function} callback    Callback function              Callback function
     * @param {Object}  options     Request options
     * @return {Object}             Request promise
     */
    getNaturalSca: function(userId, callback, options) {
        options = this._api._getOptions(callback, options);
        options = _.extend({},
            options,
            {
                path: {
                    id: userId
                },
                dataClass: UserNaturalSca
            });

        return this._api.method('users_getnaturals_sca', callback, options);
    },

    /**
     * Get legal user by ID
     * @param {number} userId       User identifier
     * @param {Function} callback    Callback function              Callback function
     * @param {Object}  options     Request options
     * @return {Object}             Request promise
     */
    getLegal: function(userId, callback, options) {
        options = this._api._getOptions(callback, options);
        options = _.extend({},
            options,
            {
                path: {
                    id: userId
                },
                dataClass: UserLegal
            });

        return this._api.method('users_getlegals', callback, options);
    },

    /**
     * Get legal SCA user by ID
     * @param {number} userId       User identifier
     * @param {Function} callback    Callback function              Callback function
     * @param {Object}  options     Request options
     * @return {Object}             Request promise
     */
    getLegalSca: function(userId, callback, options) {
        options = this._api._getOptions(callback, options);
        options = _.extend({},
            options,
            {
                path: {
                    id: userId
                },
                dataClass: UserLegalSca
            });

        return this._api.method('users_getlegals_sca', callback, options);
    },

    /**
     * Save user
     * @param {Object}      user        User object to be saved
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    updateNatural: function(userPut, user, callback, options) {
        if (!user.Id) this._api.errorHandler('Cannot update user, the Id is missing');
        options = this._api._getOptions(callback,
            options,
            {
                data: userPut,
                path: {
                    id: user.Id
                }
            });

        var userSaveDetails = this._getUserApiAndClass(userPut);
        options.dataClass = userSaveDetails.userPutClass;

        return this._api.method(userSaveDetails.saveApiMethod, callback, options);
    },

    /**
     * Save user
     * @param {Object}      user        User object to be saved
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    update: function(user, callback, options) {
        if (!user.Id) this._api.errorHandler('Cannot update user, the Id is missing');
        options = this._api._getOptions(callback,
            options,
            {
                data: user,
                path: {
                    id: user.Id
                }
            });

        var userSaveDetails = this._getUserApiAndClass(user);
        options.dataClass = userSaveDetails.userClass;

        return this._api.method(userSaveDetails.saveApiMethod, callback, options);
    },

    /**
     * Save SCA user
     * @param {Object}      user        User object to be saved
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    updateSca: function(user, callback, options) {
        if (!user.Id) this._api.errorHandler('Cannot update user, the Id is missing');
        options = this._api._getOptions(callback,
            options,
            {
                data: user,
                path: {
                    id: user.Id
                }
            });

        var userSaveDetails = this._getUserApiAndClass(user);
        options.dataClass = userSaveDetails.userClass;

        return this._api.method(userSaveDetails.saveApiMethod, callback, options);
    },

    /**
     * Create bank account for user
     * @param {number}      userId          User identifier
     * @param {Object}      bankAccount     Bank account object
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                     Request promise
     */
    createBankAccount: function(userId, bankAccount, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                data: bankAccount,
                dataClass: BankAccount
            });

        try {
            var createBankAccountApiMethod = 'users_createbankaccounts_' + this._getBankAccountType(bankAccount);
        } catch (err) {
            if (callback) callback(null, null, err);
            return Promise.reject(err);
        }

        return this._api.method(createBankAccountApiMethod, callback, options);
    },

    /**
     * Deactivate a bank account
     * @param userId
     * @param bankAccountId
     * @param callback
     * @param options
     * @returns {*}
     */
    deactivateBankAccount: function(userId, bankAccountId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId,
                    bankAccountId: bankAccountId
                },
                data: { Active: false },
                dataClass: BankAccount
            });

        return this._api.method('users_deactivate_bankaccount', callback, options);
    },

    /**
     * Get all bank accounts for user
     * @param {number}      userId      User identifier
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    getBankAccounts: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, { parameters: { ...options } });
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                dataClass: BankAccount
            });

        return this._api.method('users_allbankaccount', callback, options);
    },

    /**
     * Get bank account for user
     * @param {number}      userId              User identifier
     * @param {number}      bankAccountId       Bank account id
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                         Request promise
     */
    getBankAccount: function(userId, bankAccountId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId,
                    bankAccountId: bankAccountId
                },
                dataClass: BankAccount
            });

        return this._api.method('users_getbankaccount', callback, options);
    },

    /**
     * Get all wallets accounts for user
     * @param {number}      userId      User identifier
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    getWallets: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, { parameters: { ...options } });
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                dataClass: Wallet
            });

        return this._api.method('users_allwallets', callback, options);
    },

    /**
     * Get all transactions for user
     * @param {number}      userId      User identifier
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    getTransactions: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, { parameters: { ...options } });
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                dataClass: Transaction
            });

        return this._api.method('users_alltransactions', callback, options);
    },

    /**
     * Get all cards for user
     * @param {number}      userId      User identifier
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    getCards: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, { parameters: { ...options } });
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                dataClass: Card
            });

        return this._api.method('users_allcards', callback, options);
    },

    /**
     * Create new KYC document
     * @param {number}      userId      User identifier
     * @param {Object}      kycDocument
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    createKycDocument: function(userId, kycDocument, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                data: kycDocument,
                dataClass: KycDocument
            });

        return this._api.method('kyc_documents_create', callback, options);
    },

    /**
     * Get all KYC documents for user
     * @param {number}      userId
     * @param {function}    callback
     * @param {object}      options
     * @return {Object}     Request promise
     */
    getKycDocuments: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, { parameters: { ...options } });
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                dataClass: KycDocument
            });

        return this._api.method('users_allkycdocuments', callback, options);
    },

    /**
     * Get KYC document
     * @param {number}      userId
     * @param {number}      kycDocumentId
     * @param {function}    callback
     * @param {object}      options
     * @return {Object}     Request promise
     */
    getKycDocument: function(userId, kycDocumentId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId,
                    documentId: kycDocumentId
                },
                dataClass: KycDocument
            });

        return this._api.method('kyc_documents_get', callback, options);
    },

    /**
     * Save KYC document
     * @param {number}      userId
     * @param {Object}      kycDocument
     * @param {function}    callback
     * @param {object}      options
     * @return {Object}     Request promise
     */
    updateKycDocument: function(userId, kycDocument, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId,
                    documentId: kycDocument.Id
                },
                data: kycDocument,
                dataClass: KycDocument
            });

        return this._api.method('kyc_documents_save', callback, options);
    },

    /**
     * Create page for KYC document
     * @param {number}      userId
     * @param {number}      kycDocumentId
     * @param {Object}      kycPage
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}     Request promise
     */
    createKycPage: function(userId, kycDocumentId, kycPage, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId,
                    documentId: kycDocumentId
                },
                data: kycPage
            });

        return this._api.method('kyc_page_create', callback, options);
    },

    /**
     * Create page for KYC document
     * @param {number}      userId
     * @param {number}      kycDocumentId
     * @param {string}      file                File path
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}     Request promise
     */
    createKycPageFromFile: function(userId, kycDocumentId, file, callback, options) {
        if (!file) {
            this._api.errorHandler('File path cannot be empty');
            return;
        }

        try {
            fs.statSync(file);
        } catch (e) {
            this._api.errorHandler('File does not exist');
            return;
        }

        var kycPage = new KycPage({
            File: Buffer.from(fs.readFileSync(file)).toString('base64')
        });

        if (!kycPage.File) this._api.errorHandler('Content of the file cannot be empty');
        return this.createKycPage(userId, kycDocumentId, kycPage, callback, options);
    },

    /**
     * Get users's EMoney
     * @param {number}      userId      User identifier
     * @param {year}        year        The year for which we want to get the emoney
     * @param {month}       month       The month for which we want to get the emoney. Can be null
     * @param {function}    callback
     * @param {Object}      options
     * @return {Object}                 Request promise
     */
    getEMoney: function(userId, year, month = null, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, { parameters: { ...options } });
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId,
                    year: year,
                    month: month
                },
                dataClass: EMoney
            });

        let api_method = (month === null ? 'users_getemoney_year' : 'users_getemoney_month');

        return this._api.method(api_method, callback, options);
    },

    getPreAuthorizations: function(userId, callback, options) {
        if (options && !options.hasOwnProperty('parameters'))
            Object.assign(options, { parameters: { ...options } });
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                },
                dataClass: PreAuthorization
            });

        return this._api.method('preauthorizations_get_for_user', callback, options);
    },

    /**
     * Gets the details for a user instance of hash of properties
     * @param {Object|UserNatural|UserLegal|UserNaturalSca|UserLegalSca}  user
     */
    _getUserApiAndClass: function(user) {
        // user.NaturalSca & user.LegalSca are needed when using TS
        if (user instanceof UserNaturalSca || user.NaturalSca === true) {
            return {
                createApiMethod: 'users_createnaturals_sca',
                saveApiMethod: 'users_savenaturals_sca',
                userClass: UserNaturalSca
            };
        } else if (user instanceof UserLegalSca || user.LegalSca === true) {
            return {
                createApiMethod: 'users_createlegals_sca',
                saveApiMethod: 'users_savelegals_sca',
                userClass: UserLegalSca
            };
        } else if (user instanceof UserNatural || user.PersonType === PersonType.Natural) {
            return {
                createApiMethod: 'users_createnaturals',
                saveApiMethod: 'users_savenaturals',
                userClass: UserNatural,
                userPutClass: UserNaturalPut
            };
        } else if (user instanceof UserLegal || user.PersonType === PersonType.Legal) {
            return {
                createApiMethod: 'users_createlegals',
                saveApiMethod: 'users_savelegals',
                userClass: UserLegal
            };
        } else {
            this._api.errorHandler('Invalid user data');
        }
    },

    /**
     * Based on the bank account type, we return the key necessary for getting the request method
     * @param {Object}      bankAccount
     * @return {string}
     * @private
     */
    _getBankAccountType: function(bankAccount) {
        if (bankAccount.Type) {
            return bankAccount.Type.toLowerCase();
        }

        if (bankAccount.Details instanceof BankAccountDetailsCA) return 'ca';
        if (bankAccount.Details instanceof BankAccountDetailsGB) return 'gb';
        if (bankAccount.Details instanceof BankAccountDetailsIBAN) return 'iban';
        if (bankAccount.Details instanceof BankAccountDetailsOTHER) return 'other';
        if (bankAccount.Details instanceof BankAccountDetailsUS) return 'us';

        throw new Error('Unspecified BankAccount type');
    },

    /**
     * Get user block status
     * @param {number}  userId  User identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */
    getBlockStatus: function(userId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                }
            });

        return this._api.method('users_block_status', callback, options);
    },

    /**
    * Get user regulatory
    * @param {number}  userId  User identifier
    * @param {Function} callback    Callback function
    * @param {Object} options    Request options
    * @return {Object}        Request promise
    */
    getRegulatory: function(userId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                path: {
                    id: userId
                }
            });

        return this._api.method('users_regulatory', callback, options);
    },

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
     * @param {CategorizeUserNatural|CategorizeUserLegal} user
     * @return {UserNaturalSca|UserLegalSca} Promise of the request
     */
    categorize: function(user, callback, options) {
        var apiMethod;
        var dataClass;

        if (user instanceof CategorizeUserNatural || user.NaturalSca === true) {
            apiMethod = 'users_categorizenaturals_sca';
            dataClass = UserNaturalSca;
        } else if (user instanceof CategorizeUserLegal || user.LegalSca === true) {
            apiMethod = 'users_categorizelegals_sca';
            dataClass = UserLegalSca;
        } else {
            this._api.errorHandler('Invalid user data');
        }

        // user.NaturalSca and user.LegalSca are needed for SCA when using TS, but should not be sent to the API
        delete user.NaturalSca;
        delete user.LegalSca;

        options = this._api._getOptions(callback,
            options,
            {
                data: user,
                dataClass: dataClass,
                path: {
                    id: user.Id
                }
            });

        return this._api.method(apiMethod, callback, options);
    },

    /**
     * If UserCategory is OWNER, this endpoint allows you to enroll a user in SCA.
     * Your platform needs to retrieve the returned PendingUserAction.RedirectUrl,
     * add an encoded returnUrl query parameter for them to be returned to after the SCA session, and redirect the user.
     *
     * @param {string} userId The user identifier
     * @return {UserEnrollmentResult}
     */
    enroll: function(userId, callback, options) {
        options = this._api._getOptions(callback,
            options,
            {
                dataClass: UserEnrollmentResult,
                path: {
                    id: userId
                }
            });

        return this._api.method('users_enroll_sca', callback, options);
    }
});

module.exports = Users;
