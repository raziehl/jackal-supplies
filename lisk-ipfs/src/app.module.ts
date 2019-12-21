import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiskModule } from './lisk/lisk.module';
import { IpfsModule } from './ipfs/ipfs.module';

@Module({
  imports: [LiskModule, IpfsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
