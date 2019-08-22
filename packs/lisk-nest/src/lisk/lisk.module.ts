import { Module } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';
import { LiskService } from './lisk.service';
import { LiskController } from './lisk.controller';

@Module({
  providers: [CryptoService, LiskService],
  controllers: [LiskController]
})
export class LiskModule {}
