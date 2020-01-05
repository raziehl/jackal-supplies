

import { DappTransaction, TransactionError, StateStore } from '@liskhq/lisk-transactions';
import { logger, Logger } from '@root/common/logger';
import { User } from '@root/common/models/User';
import { DappAsset } from '@liskhq/lisk-transactions/dist-node/5_dapp_transaction';

interface RegistrationForm {
  name: string,
  description: string,
  tags: string,
  link: string,
  type: number,
  category: number,
  icon: string,
  transactionId: string
}

export class DappRegistration extends DappTransaction {

  @logger()
  private log: Logger;

  protected verifyAgainstTransactions(transactions: readonly import("@liskhq/lisk-transactions").TransactionJSON[]): readonly TransactionError[] {
    throw new Error("Method not implemented.");
  }
  protected assetFromSync(raw: any): object {
    throw new Error("Method not implemented.");
  }

  constructor(transObj: RegistrationForm) {
    super(transObj);
    console.log('DAPP REGISTRATION')
  }

  static get TYPE() {
    return DappTransaction.TYPE;
  }

  static get FEE() {
    return DappTransaction.FEE;
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
    const asset: DappAsset = this.asset;
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