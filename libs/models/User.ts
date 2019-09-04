interface UserStruct {
    passphrase?: string;
    address: string;
    privateKey?: string;
    publicKey?: string;
    username?: string;
    email?: string;
    expiresIn?: number
}

export const emptyUser: UserStruct = {
    passphrase: '',
    address: '',
    privateKey: '',
    publicKey: '',
    username: '',
    email: '',
    expiresIn: 1000000
}

export class User {
    passphrase?: string;
    address: string;
    privateKey?: string;
    publicKey?: string;
    username: string;
    email: string;
    expiresIn: number;

    constructor(user: UserStruct = emptyUser) {
        this.passphrase = user.passphrase;
        this.address = user.address;
        this.privateKey = user.privateKey;
        this.publicKey = user.publicKey;
        this.username = user.username;
        this.email = user.email;
        this.expiresIn = user.expiresIn;
    }
}