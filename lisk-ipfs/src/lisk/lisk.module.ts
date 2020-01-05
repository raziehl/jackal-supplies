import { Module } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { LiskController } from './lisk.controller';

@Module({
  providers: [LiskService],
  controllers: [LiskController]
})
export class LiskModule {}
