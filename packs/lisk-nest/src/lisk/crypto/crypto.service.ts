import { Injectable } from '@nestjs/common';
import { log } from '../../logger';
import { cryptography as crypto } from 'lisk-sdk';

// const { Mnemonic } = pass;

@Injectable()
export class CryptoService {
    

    generate() {
        log.error(crypto.constants)
    }

}
