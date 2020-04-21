import { Injectable, HttpService, HttpException } from '@nestjs/common';
import * as trans from '@liskhq/lisk-transactions';
import { EPOCH_TIME } from '@liskhq/lisk-constants';
import { lisknet, devnet, networkIdentifier } from './lisk.module';
import { Logger } from '../../../common/logger';
import { AccountTransaction } from './transactions/account.transaction';
import { OrderTransaction } from './transactions/order.transaction';
import { User } from '../../../common/models/User';
import { Asset } from '../../../common/models/Asset';

import { SellOrder, BuyOrder, Orders, OrderAccount } from '../../../common/models/Orders';

import { getAddressFromPassphrase } from '@liskhq/lisk-cryptography';
import { convertBeddowsToLSK, convertLSKToBeddows } from '@liskhq/lisk-transactions/dist-node/utils';

import { InsufficientFunds } from '../../../common/errors/lisk.error';

const richPass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';

const sellPass = 'tape custom diamond document six pair question sword lunar clump guess kitten';
const buyPass = 'core unfold master member december couple equip liberty paper make winner three';
const sellAddress = '11225201565141563944L';
const buyAddress = '11898602431065133374L';

const log = new Logger('info');
4
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function timestamp() {
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME.toString());
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return  parseInt(inSeconds)-1;
}


@Injectable()
export class LiskService {

  constructor(
    public http: HttpService
  ) {}

  async getAccount(userAddress: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: User = new User((await devnet.accounts.get({ address: userAddress })).data[0]);
        user.address = userAddress;
        return resolve(user);
      } catch (err) {
        log.error(err);
        return reject(err);
      }
    });
  }

  async updateAccount(user: User) {
    log.info("UpdateAccount Method")
    const tx = new AccountTransaction({
      timestamp: timestamp(),
      networkIdentifier: networkIdentifier,
      asset: user.asset,
      
    });
    tx.sign(user.passphrase);

    try {
      const result = await devnet.transactions.broadcast(tx.toJSON())
      log.info('Transaction result: ', result);
      return result;
    } catch(err) {
      log.error(err);
      throw new Error("Something is wrong with the update account process");
    }
  }

  async addCash(user: User) {
    const tx = trans.transfer({
      amount: '1000000000000',
      networkIdentifier: networkIdentifier,
      recipientId: user.address,
      passphrase: richPass
    });

    try {
      const result = devnet.transactions.broadcast(tx)
      log.info(result);
      return result;
    } catch(err) {
      log.error(err.errors[0].errors)
    };
  }

  async account(user: User) {
    let account: User = await this.getAccount(user.address);
    user = new User({ ...user, ...account });
    if (account)
      return user;
    return new User({
      address: getAddressFromPassphrase(user.passphrase),
      passphrase: user.passphrase
    });
  }

  async addAssetToUserPortfolio(asset: Asset, passphrase: string) {
    const address = getAddressFromPassphrase(passphrase);
    const user: User = await this.getAccount(address);
    user.asset.portfolio.push(asset);
    user.passphrase = passphrase;
    this.updateAccount(user as User);
  }

  async transact(buyOrder: BuyOrder, passphrase: string, asset: Asset) {
    const tx = trans.transfer({
      amount: convertLSKToBeddows(buyOrder.offeredPrice.toString()),
      networkIdentifier: networkIdentifier,
      recipientId: buyOrder.sellerId,
      passphrase: passphrase
    });

    try {
      await devnet.transactions.broadcast(tx);
    } catch(err) {
      throw new InsufficientFunds("That wasn't very cash money of you");
    }

    try {
      await this.addAssetToUserPortfolio(asset, passphrase);
    } catch(err) {
      throw new Error("Failed to transfer asset to portfolio")
    }

    try {
      await this.removeSellOrder(buyOrder.sellOrderId);
    } catch(err) {
      throw new Error("Failed to remove sell order");
    }
    return;
  }

  async getOrderAccount(): Promise<OrderAccount> {
    const sellOrders = await this.http.get(`http://localhost:4000/api/accounts?address=${sellAddress}`)
    .toPromise();
    return new OrderAccount(sellOrders.data.data[0]);
  }

  // ToDo: Solve code duplication

  async addSellOrder(sellOrder: SellOrder) {
    let orderAccount: OrderAccount = await this.getOrderAccount();
    let asset: Orders = orderAccount.asset;
    asset.sellOrders.push(sellOrder);

    const tx = new OrderTransaction({
      timestamp: timestamp(),
      networkIdentifier: networkIdentifier,
      targetAccountAddress: getAddressFromPassphrase(sellPass),
      asset: asset
    });
    tx.sign(sellPass);

    try {
      const result = await devnet.transactions.broadcast(tx.toJSON());
      log.info('Transaction result: ', result);
      return result;
    } catch(err) {
      log.error(err);
      return { status: 400, message: "Please try again" };
    }
  }

  async addBuyOrder(buyOrder: BuyOrder, passphrase: string) {
    let orderAccount: OrderAccount = await this.getOrderAccount();
    let asset: Orders = orderAccount.asset;
    asset.buyOrders.push(buyOrder);

    const relevantSellOrder = asset.sellOrders.filter((sellOrder) => sellOrder.id == buyOrder.sellOrderId)[0];

    try {
      await this.transact(buyOrder, passphrase, relevantSellOrder.assetData);
    } catch(err) {
      log.error(err);
      throw new HttpException(err.message, 400);
    }

    const tx = new OrderTransaction({
      timestamp: timestamp(),
      networkIdentifier: networkIdentifier,
      targetAccountAddress: getAddressFromPassphrase(sellPass),
      asset: asset
    });
    tx.sign(sellPass);

    try {
      const result = await devnet.transactions.broadcast(tx.toJSON());
      log.info('Transaction result: ', result);
      return result;
    } catch(err) {
      log.error(err);
      return { statusCode: 400, message: "Please try again" };
    }
  }


  async removeSellOrder(sellOrderId: string) {
    let orderAccount: OrderAccount = await this.getOrderAccount();
    let asset: Orders = orderAccount.asset;
    asset.sellOrders = asset.sellOrders.filter(order => order.id !== sellOrderId);

    const tx = new OrderTransaction({
      timestamp: timestamp(),
      networkIdentifier: networkIdentifier,
      targetAccountAddress: getAddressFromPassphrase(sellPass),
      asset: asset
    });
    tx.sign(sellPass);

    try {
      const result = await devnet.transactions.broadcast(tx.toJSON());
      log.info('Transaction result: ', result);
      return result;
    } catch(err) {
      log.error(err);
      return { status: 400, message: "Please try again" };
    }
  }

}


