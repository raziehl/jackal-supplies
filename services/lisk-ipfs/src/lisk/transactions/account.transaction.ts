import { BaseTransaction, TransactionError, utils } from '@liskhq/lisk-transactions';
import { Logger } from '../../../../common/logger';
import { User } from '../../../../common/models/User';

const logger = new Logger('info');

export class AccountTransaction extends BaseTransaction {

  private accountAsset: any;

  protected verifyAgainstTransactions(transactions: readonly import("@liskhq/lisk-transactions").TransactionJSON[]): readonly TransactionError[] {
    throw new Error("Method not implemented.");
  }
  protected assetFromSync(raw: any): object {
    throw new Error("Method not implemented.");
  }

  constructor(transObj) {
    super(transObj);
    console.log('UPDATE ACCOUNT TRANSACTION')
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

    const newObj = { ...sender, asset: asset };
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