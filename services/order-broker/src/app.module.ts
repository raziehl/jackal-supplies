import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiskModule } from './lisk/lisk.module';
import { LoggerModule } from './util/logger.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './nats/nats.module';

@Global()
@Module({
  imports: [LiskModule, OrdersModule, NatsModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
