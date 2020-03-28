export class BuyOrder {

    id: number;
    sellerId: string;
    offeredPrice: number;
    cid: string;
    assetId: string;
    created_at: Date;

    constructor(buyOrder: Partial<BuyOrder> = {}) {
      this.sellerId = buyOrder.sellerId;
      this.offeredPrice = buyOrder.offeredPrice;
      this.cid = buyOrder.cid;
      this.assetId = buyOrder.assetId;
      this.created_at = new Date();
    }

}