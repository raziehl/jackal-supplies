import { Controller, Get, Post, Request } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';
import { TransactionService } from './transactions/transaction.service';

import { User } from 'libs/models/User';

@Controller('lisk')
export class LiskController {
    
    constructor(
        private crypto: CryptoService,
        private trans: TransactionService
    ) {}

    @Get('generate-keys')
    generate() {
      return this.crypto.generate();
    }

    @Post('enrichPass')
    enrichPass(@Request() req) {
        const user: User = req.body;
        return this.crypto.enrichPass(user.passphrase);
    }

    @Get('transact')
    transact() {
        return this.trans.testTransact();
    }
}
