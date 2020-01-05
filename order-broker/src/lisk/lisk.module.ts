import { Module, Global } from '@nestjs/common';
import { LiskService } from './lisk.service';

@Global()
@Module({
  providers: [LiskService],
  exports: [LiskService]
})
export class LiskModule {}
