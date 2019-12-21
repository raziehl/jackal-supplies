import { Module } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { LiskController } from './lisk.controller';
import { CryptoService } from './utils/crypto.service';

@Module({
  providers: [LiskService, CryptoService],
  controllers: [LiskController]
})
export class LiskModule {}
