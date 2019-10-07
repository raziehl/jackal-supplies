import { Asset } from './Asset';

export class UserStuff {
    username: string;

    constructor(userStuff: Partial<UserStuff> = {}) {
        this.username = userStuff.username || '';
    }
}

export class AssetBlock {
    userStuff?: UserStuff;
    portfolio?: Array<Asset>;

    constructor(asset: Partial<AssetBlock> = {}) {
        this.userStuff = new UserStuff(asset.userStuff);
        this.portfolio = new Array<Asset>();
        if(asset.portfolio)
            asset.portfolio.forEach(asset => {
                this.portfolio.push(new Asset(asset))
            });
        else this.portfolio = new Array<Asset>();
    }
}

export class Delegate {
    username: string;
    vote: string;
    rewards: string;
    producedBlocks: number;
    missedBlocks: number;
    rank: number;
    productivity: number;
    approval: number;

    constructor(delegate: Partial<Delegate> = {}) {
        this.username = delegate.username || "";
        this.vote = delegate.vote || "";
        this.rewards = delegate.rewards || "";
        this.producedBlocks = delegate.producedBlocks || 0;
        this.missedBlocks = delegate.missedBlocks || 0;
        this.rank = delegate.rank || 0;
        this.productivity = delegate.productivity || 0;
        this.approval = delegate.approval || 0;
    }
}

export class Account { 
    address: string;
    publicKey: string;
    balance: string;
    secondPublicKey: string;
    asset: AssetBlock;
    delegate: Delegate;

    constructor(acc: Partial<User> = {}) {
        this.address = acc.address || '';
        this.publicKey = acc.publicKey || '';
        this.balance = acc.balance || '';
        this.secondPublicKey = acc.secondPublicKey || '';
        this.asset = new AssetBlock(acc.asset);
        this.delegate = new Delegate(acc.delegate);
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