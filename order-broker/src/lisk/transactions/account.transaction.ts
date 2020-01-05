import { BaseTransaction, TransactionError, StateStore, utils } from '@liskhq/lisk-transactions';
import { logger, Logger } from '@root/common/logger';
import { User } from '@root/common/models/User';

export class AccountTransaction extends BaseTransaction {

  @logger()
  private log: Logger;

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
    return 10;
  }

  static get FEE() {
    return `${0}`;
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

  applyAsset(store: StateStore) {
    const errors = [];
    const asset: Partial<User> = this.asset;
    let sender: any = store.account.get(this.senderId);

    console.log(asset);
    const newObj = { ...sender, asset: asset };
    store.account.set(sender.address, newObj);

    return errors;
  }

  undoAsset(store: StateStore) {
    const sender = store.account.get(this.senderId);
    const nullAssetObj = { ...sender, asset: null };
    store.account.set(sender.address, nullAssetObj);
    return [];
  }

}