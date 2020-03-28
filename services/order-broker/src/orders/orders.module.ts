import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { SellOrder } from './entities/sell-order.entity';

@Module({
  imports: [],
  providers: [OrdersService]
})
export class OrdersModule {}
