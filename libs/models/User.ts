export class UserStuff {
    username: string;

    constructor(userStuff: Partial<UserStuff> = {}) {
        this.username = userStuff.username || '';
    }
}

export class AssetObject {
    assetName: string;
    assetDescription: string;
    transactionTimestamp: string;

    constructor(assetObject: Partial<AssetObject> = {}) {
        this.assetName = assetObject.assetName || '';
        this.assetDescription = assetObject.assetDescription || '';
        this.transactionTimestamp = assetObject.transactionTimestamp || '';
    }
}

export class Asset {
    userStuff?: UserStuff;
    portfolio?: AssetObject[];

    constructor(asset: Partial<Asset> = {}) {
        this.userStuff = asset.userStuff || new UserStuff();
        this.portfolio = asset.portfolio || new Array(new AssetObject());
    }
}

export class Account { 
    address: string;
    publicKey: string;
    balance: string;
    secondPublicKey: string;
    asset: Asset;

    constructor(acc: Partial<User> = {}) {
        this.address = acc.address || '';
        this.publicKey = acc.publicKey || '';
        this.balance = acc.balance || '';
        this.secondPublicKey = acc.secondPublicKey || '';
        this.asset = acc.asset || null;
    }
}


export class User extends Account {
    passphrase?: string;
    expiresIn: number;

    constructor(user: Partial<User> = {}) {
        super(user);
        this.passphrase = user.passphrase || '';
        this.expiresIn = user.expiresIn || 1000000;
    }
}

export interface Credential {
    passphrase: string;
}