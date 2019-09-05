export class Account { 
    address: string;
    publicKey: string;
    balance: string;
    secondPublicKey: string;
    asset: any;

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
    username: string;
    email: string;
    expiresIn: number;

    constructor(user: Partial<User> = {}) {
        super(user);
        this.passphrase = user.passphrase || '';
        this.username = user.username || '';
        this.email = user.email || '';
        this.expiresIn = user.expiresIn || 1000000;
    }
}

export interface Credential {
    passphrase: string;
}