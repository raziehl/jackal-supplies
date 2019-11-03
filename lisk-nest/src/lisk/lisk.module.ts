import { Module, HttpModule } from '@nestjs/common';
import { CryptoService } from './crypto/crypto.service';
import { LiskService } from './lisk.service';
import { LiskController } from './lisk.controller';
import { TransactionService } from './transactions/transaction.service';

@Module({
  imports: [HttpModule],
  providers: [CryptoService, LiskService, TransactionService],
  controllers: [LiskController]
})
export class LiskModule {}
