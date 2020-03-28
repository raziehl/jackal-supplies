import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiskModule } from './lisk/lisk.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { LoggerModule } from './util/logger.module';

@Global()
@Module({
  imports: [LiskModule, IpfsModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
