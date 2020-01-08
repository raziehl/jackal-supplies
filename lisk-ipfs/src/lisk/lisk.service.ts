import { Injectable, HttpService } from '@nestjs/common';
import * as trans from '@liskhq/lisk-transactions';
import { TransferTransaction } from '@liskhq/lisk-transactions';
import * as passphrase from '@liskhq/lisk-passphrase';
import * as crypto from '@liskhq/lisk-cryptography';
import { lisknet, devnet } from './lisk.module';
import { AxiosResponse } from 'axios';
import { logger, Logger } from '@root/common/logger';
import { AccountTransaction } from './transactions/account.transaction';
import { User } from '@root/common/models/User';
import { EnrichedPass } from '@root/common/models/EnrichedPass';
import { Asset } from '@root/common/models/Asset';

import { getAddressFromPassphrase } from '@liskhq/lisk-cryptography';
import { APIClient } from '@liskhq/lisk-api-client';


const richPass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';

const ownerPass = 'length shaft waste asset quote chair renew biology turkey before garage trophy';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class LiskService {

  @logger()
  private log: Logger;

  constructor(
    public http: HttpService
  ) {  
    this.test();
  }

  async test() {
    
  }

  async updateAccount(user: User) {
    console.log('UPDATE')
    const tx = new AccountTransaction({
      timestamp: new Date(),
      asset: user.asset
    });
    console.log(user.asset.portfolio)
    tx.sign(user.passphrase);

    await devnet.transactions.broadcast(tx.toJSON())
    .then(data => this.log.info('Transaction result: ', data))
    .catch(err => this.log.error(err));
  }

  async getAccount(userAddress: string): Promise<Partial<User>> {
    return new Promise(async (resolve, reject) => {
      try {
        const account: Partial<User> = (await devnet.accounts.get({ address: userAddress })).data;
        return resolve(account);
      } catch (err) {
        this.log.error(err);
        return reject(err);
      }
    });
  }

  async addCash(user: User) {
    const recipient = getAddressFromPassphrase(richPass);

    const tx = new TransferTransaction({
      amount: '1000',
      recipientId: recipient
    });
    tx.sign(richPass);

    devnet.transactions.broadcast(tx.toJSON())
    .then(async (msg) => {
      this.log.info(msg);
      const account = await this.getAccount(recipient);
      console.log(account);
    })
    .catch(this.log.error);
  }

  async login(user: User) {
    let account: Account = (await this.getAccount(user.address) as Partial<User>)[0];
    user = new User({ ...user, ...account });
    this.log.info(account)
    // if (account) {
    //   return user;
    // } else return;
    return user;
  }


}


