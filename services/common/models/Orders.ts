import { Asset } from './Asset';

export class OrderAccount {
  address: string;
  publicKey: string;
  balance: string;
  secondPublicKey: string;
  asset: Orders;

  constructor(acc: Partial<OrderAccount> = {}) {
    this.address = acc.address || '';
    this.publicKey = acc.publicKey || '';
    this.balance = acc.balance || '';
    this.secondPublicKey = acc.secondPublicKey || '';
    this.asset = new Orders(acc.asset);
}

} 

export class Orders {
  sellOrders: SellOrder[];
  buyOrders: BuyOrder[];

  constructor(orders: Partial<Orders> = {}) {
    this.sellOrders = orders.sellOrders || [];
    this.buyOrders = orders.buyOrders || [];
  }
}

export class SellOrder {

  id: string;
  sellerId: string;
  askingPrice: number;
  cid: string;
  assetId: string;
  created_at: Date;
  assetData: Asset;
  fulfilled: boolean;

  constructor(sellOrder: Partial<SellOrder>) {
    this.id = sellOrder.id;
    this.sellerId = sellOrder.sellerId;
    this.askingPrice = sellOrder.askingPrice;
    this.cid = sellOrder.cid;
    this.assetId = sellOrder.assetId;
    this.created_at = new Date();
    this.assetData = sellOrder.assetData;
    this.fulfilled = sellOrder.fulfilled;
  }
  
}

export class BuyOrder {

  id: string;
  sellerId: string;
  buyerId: string;
  offeredPrice: number;
  cid: string;
  assetId: string;
  created_at: Date;
  sellOrderId: string;

  constructor(buyOrder: Partial<BuyOrder>) {
    this.id = buyOrder.id;
    this.sellerId = buyOrder.sellerId;
    this.offeredPrice = buyOrder.offeredPrice;
    this.buyerId = buyOrder.buyerId;
    this.cid = buyOrder.cid;
    this.assetId = buyOrder.assetId;
    this.created_at = new Date();
    this.sellOrderId = buyOrder.sellOrderId;
  }

}