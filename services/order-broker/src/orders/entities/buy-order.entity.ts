import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BuyOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sellerId: string;

    @Column()
    offeredPrice: number;

    @Column()
    cid: string;

    @Column()
    assetId: string;

    @Column()
    created_at: Date;

    constructor(buyOrder: Partial<BuyOrder> = {}) {
      this.sellerId = buyOrder.sellerId;
      this.offeredPrice = buyOrder.offeredPrice;
      this.cid = buyOrder.cid;
      this.assetId = buyOrder.assetId;
      this.created_at = new Date();
    }

}