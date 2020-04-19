export class SellOrder {

    id: number;
    sellerId: string;
    askingPrice: number;
    cid: string;
    assetId: string;
    created_at: Date;

    constructor(sellOrder: Partial<SellOrder> = {}) {
      this.sellerId = sellOrder.sellerId;
      this.askingPrice = sellOrder.askingPrice;
      this.cid = sellOrder.cid;
      this.assetId = sellOrder.assetId;
      this.created_at = new Date();
    }

}

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