import { Injectable, HttpService } from '@nestjs/common';
import * as trans from '@liskhq/lisk-transactions';
import * as passphrase from '@liskhq/lisk-passphrase';
import * as crypto from '@liskhq/lisk-cryptography';
import { lisknet } from '../lisk.service';
import { AxiosResponse } from 'axios';
import { logger, Logger } from '@root/common/logger';
import { AccountTransaction } from './account.transaction';
import { User } from '@root/common/models/User';
import { APIResponse } from '@liskhq/lisk-api-client/dist-node/api_types';
import { EnrichedPass } from '@root/common/models/EnrichedPass';
import { Asset } from '@root/common/models/Asset';

const { Mnemonic } = passphrase;

const richPass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';

import { lorem } from '@root/common/models/Utils';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class TransactionService {

  @logger()
  private log: Logger;

  constructor(
    public http: HttpService
  ) {  }

  async createAccount(pass: string) {
    let tx = trans.transfer({
      amount: '1000000000',
      recipientId: crypto.getAddressFromPassphrase(pass),
      passphrase: richPass
    });

    await lisknet.transactions.broadcast(tx)
      .then(data => {
        this.log.info(`Account Created: ${crypto.getAddressFromPassphrase(pass)}`);
      })
      .catch(err => this.log.error(err));
  }

  async updateAccount(user: User) {
    console.log('UPDATE')
    const tx = new AccountTransaction({
      timestamp: +new Date(),
      asset: user.asset
    });
    tx.sign(user.passphrase);

    await lisknet.transactions.broadcast(tx.toJSON())
      .then(data => this.log.info('Transaction result: ', data))
      .catch(err => this.log.error(err));
  }

  async getAccount(userAddress: string) {
    try {
      const account = (await lisknet.accounts.get({ address: userAddress })).data;
      return account;
    } catch (err) {
      this.log.error(err);
      return;
    }
  }

  async login(user: User) {
    let account: Account = (await this.getAccount(user.address) as Partial<User>)[0];
    user = new User({ ...user, ...account });
    if (account) {
      return user;
    } else {
      await this.createAccount(user.passphrase);
      await timeout(10000);
      return user;
    }
  }
}


