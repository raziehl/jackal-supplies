import { Controller, Get, Post, Request } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';
import { TransactionService } from './transactions/transaction.service';

import { User, Credential } from 'libs/models/User';
import { EnrichedPass } from '@root/libs/models/EnrichedPass';

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
        const passphrase: string = req.body;
        return this.crypto.enrichPass(passphrase);
    }

    @Post('account')
    async login(@Request() req) {
        let user: User = req.body;
        user.address = this.crypto.getAddress(user.passphrase);
        return await this.trans.login(user);
    }
}
