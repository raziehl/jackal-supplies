import { Injectable } from '@nestjs/common';
import { cryptography as crypto } from 'lisk-sdk';
import * as passphrase from '@liskhq/lisk-passphrase';
import { EnrichedPass } from '@root/common/models/EnrichedPass';
import { Logger } from '@root/common/logger';

const { Mnemonic } = passphrase;

const log = new Logger('info');

@Injectable()
export class CryptoService {

  getKeys(pass: string) {
    return crypto.getKeys(pass);
  }

  getAddress(pass: string) {
    return crypto.getAddressFromPassphrase(pass);
  }

  enrichPass(passphrase: string): EnrichedPass {
    var pass = new EnrichedPass();
    pass.passphrase = passphrase;
    pass.address = this.getAddress(passphrase);
    pass.privateKey = this.getKeys(passphrase).privateKey;
    pass.publicKey = this.getKeys(passphrase).publicKey;
    return pass;
  }

  generate(): EnrichedPass {
    const pass = Mnemonic.generateMnemonic();
    return this.enrichPass(pass);
  }

}
