import { Injectable } from '@nestjs/common';
import { log } from '@nest-root/src/logger';
import { cryptography as crypto } from 'lisk-sdk';
import * as passphrase from '@liskhq/lisk-passphrase';
import { User } from 'libs/models/User';

const { Mnemonic } = passphrase;

@Injectable()
export class CryptoService {
    
    getKeys(pass: string) {
        return crypto.getKeys(pass);
    }

    getAddress(pass: string) {
        return crypto.getAddressFromPassphrase(pass);
    }

    enrichPass(pass: string): User {
        var user = new User();
        user.passphrase = pass;
        user.address = this.getAddress(pass);
        user.privateKey = this.getKeys(pass).privateKey;
        user.publicKey = this.getKeys(pass).publicKey;
        return user;
    }

    generate(): User {
        const pass = Mnemonic.generateMnemonic();
        return this.enrichPass(pass);
    }

}
