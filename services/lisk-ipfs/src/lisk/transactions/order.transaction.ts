import { BaseTransaction, TransactionError, utils } from '@liskhq/lisk-transactions';
import { Logger } from '../../../../common/logger';
import { User } from '../../../../common/models/User';
import { Orders } from '../../../../common/models/Orders';

const logger = new Logger('info');

interface TransactionInfo {
  timestamp: number,
  networkIdentifier: string,
  targetAccountAddress: string,
  asset: any
}

export class OrderTransaction extends BaseTransaction {

  targetAccountAddress: string;

  protected verifyAgainstTransactions(transactions: readonly import("@liskhq/lisk-transactions").TransactionJSON[]): readonly TransactionError[] {
    throw new Error("Method not implemented.");
  }
  protected assetFromSync(raw: any): object {
    throw new Error("Method not implemented.");
  }

  constructor(transInfo: TransactionInfo) {
    super(transInfo);
    this.targetAccountAddress = transInfo.targetAccountAddress;
  }

  static get TYPE() {
    return 13;
  }

  static get FEE() {
    return `0`;
  };

  async prepare(store) {
    await store.account.cache([
      {
        address: this.senderId
      },
    ]);
  }

  validateAsset() {
    const errors = [];
    const asset: any = this.asset;


    return errors;
  }

  applyAsset(store) {
    const errors = [];
    const asset: Partial<User> = this.asset;
    let sender: any = store.account.get(this.senderId);

    const newObj = { ...sender, asset: this.asset };
    store.account.set(sender.address, newObj);

    return errors;
  }

  undoAsset(store) {
    const sender = store.account.get(this.senderId);
    const nullAssetObj = { ...sender, asset: null };
    store.account.set(sender.address, nullAssetObj);
    return [];
  }

  assetToBytes() {
    return Buffer.from(JSON.stringify(this.asset));
  }

  assetToJSON() {
    return this.asset;
  }

}