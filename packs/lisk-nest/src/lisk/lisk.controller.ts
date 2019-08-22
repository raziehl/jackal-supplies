import { Controller, Get, Post } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';

@Controller('lisk')
export class LiskController {
    
    constructor(
        private crypto: CryptoService
    ) {}

    @Get('generate-keys')
    generate() {
      return this.crypto.generate();
    }
}
