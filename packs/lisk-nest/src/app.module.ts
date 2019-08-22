import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiskModule } from './lisk/lisk.module';

@Module({
  imports: [LiskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
