import { Controller, Get, Post, Request } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';

import { User } from 'libs/models/User';

@Controller('lisk')
export class LiskController {
    
    constructor(
        private crypto: CryptoService
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
}
