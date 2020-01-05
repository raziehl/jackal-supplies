import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SellOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sellerId: string;

    @Column()
    askingPrice: number;

    @Column()
    cid: string;

    @Column()
    assetId: string;

    @Column()
    created_at: Date;

    constructor(sellOrder: Partial<SellOrder> = {}) {
      this.sellerId = sellOrder.sellerId;
      this.askingPrice = sellOrder.askingPrice;
      this.cid = sellOrder.cid;
      this.assetId = sellOrder.assetId;
      this.created_at = new Date();
    }

}