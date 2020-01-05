import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './nats/nats.module';
import { LiskModule } from './lisk/lisk.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SellOrder } from './orders/entities/sell-order.entity';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './env';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    OrdersModule,
    NatsModule,
    LiskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [SellOrder],
      synchronize: true,
    })
  ],
})
export class AppModule {}
