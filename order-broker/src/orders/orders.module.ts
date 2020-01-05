import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellOrder } from './entities/sell-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellOrder])],
  providers: [OrdersService]
})
export class OrdersModule {}
