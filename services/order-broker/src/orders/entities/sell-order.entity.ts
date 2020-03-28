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