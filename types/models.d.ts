import { MakeKeysRequired } from "./types";
import { wallet } from "./models/wallet";
import { user } from "./models/user";
import { address } from "./models/address";
import { base } from "./base";
import MangoPay = require("./index");

export namespace Models {
    import EntityBase = MangoPay.models.EntityBase;
    import ModelMethods = MangoPay.models.ModelMethods;
    import DependsObject = base.DependsObject;

    class Model<T extends {} = any> implements ModelMethods<T> {
        initialize(): void;

        getData<K extends keyof T>(attribute: K): T[K];

        setData<K extends keyof T>(attribute: K, value: T[K]): this;

        setData(attribute: Partial<T>): this;

        setData(attribute: any, value?: any): this;

        getReadOnlyProperties(): Array<keyof T>;

        getDependsObjects(): DependsObject[];

        parse(): void;

        constructor(data: T);
    }

    class Address extends EntityBase<address.AddressData> {
        constructor(data: Partial<address.AddressData> | address.CreateAddress);
    }

    class BankAccountDetails {
        constructor(data: any);
    }

    class Wallet extends EntityBase<wallet.WalletData> {
        constructor(data: wallet.CreateWallet | wallet.UpdateWallet);
    }

    class UserLegal extends EntityBase<user.UserLegalData> {
        PersonType: "LEGAL";

        constructor(
            data: MakeKeysRequired<Partial<user.UserLegalData>,
                user.RequiredUserLegalData>
        );

        /**
         * Sets the person type for the model
         * @param personType
         */
        setPersonType(type: user.PersonType): void;
    }

    class UserNatural extends EntityBase<user.UserNaturalData> {
        PersonType: "NATURAL";

        constructor(
            data: MakeKeysRequired<Partial<user.UserNaturalData>,
                user.RequiredUserNaturalData>
        );

        /**
         * Sets the person type for the model
         * @param personType
         */
        setPersonType(type: user.PersonType): void;
    }
}
