import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';
import { TransactionService } from './transactions/transaction.service';

import { User, Credential } from 'libs/models/User';
import { EnrichedPass } from '@root/libs/models/EnrichedPass';
import { Asset } from '@root/libs/models/Asset';

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

    @Post('updateUser')
    async updateUser(@Request() req) {
        let user: User = req.body;
        return await this.trans.updateAccount(user);
    }

    @Post('addCash')
    async createUser(@Request() req) {
        console.log('Cash Added')
        let user: User = req.body;
        return await this.trans.createAccount(user.passphrase);
    }
}
