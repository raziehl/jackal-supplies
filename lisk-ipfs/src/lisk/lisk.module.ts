import { Module, HttpModule } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { LiskController } from './lisk.controller';
import { TransactionService } from './transactions/transaction.service';
import { CryptoService } from './crypto.service';

@Module({
  imports: [HttpModule],
  providers: [LiskService, TransactionService, CryptoService],
  controllers: [LiskController]
})
export class LiskModule {}
