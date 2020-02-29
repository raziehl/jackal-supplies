import { Injectable, HttpService } from '@nestjs/common';
import * as trans from '@liskhq/lisk-transactions';
import { TransferTransaction } from '@liskhq/lisk-transactions';
import * as transactions from '@liskhq/lisk-transactions';
import { EPOCH_TIME } from '@liskhq/lisk-constants';
import * as passphrase from '@liskhq/lisk-passphrase';
import * as crypto from '@liskhq/lisk-cryptography';
import { lisknet, devnet } from './lisk.module';
import { AxiosResponse } from 'axios';
import { Logger } from '../../../common/logger';
import { AccountTransaction } from './transactions/account.transaction';
import { User } from '../../../common/models/User';
import { EnrichedPass } from '../../../common/models/EnrichedPass';
import { Asset } from '../../../common/models/Asset';

import { getAddressFromPassphrase } from '@liskhq/lisk-cryptography';
import { APIClient } from '@liskhq/lisk-api-client';
import { convertBeddowsToLSK, convertLSKToBeddows } from '@liskhq/lisk-transactions/dist-node/utils';
import { HexBase64BinaryEncoding } from 'crypto';


const richPass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';

const ownerPass = 'satisfy sorry fuel image garden maple bone sweet pet ocean flash escape';

const log = new Logger('info');

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function timestamp() {
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME.toString());
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return  parseInt(inSeconds);
}


@Injectable()
export class LiskService {

  constructor(
    public http: HttpService
  ) {  
    this.test();
  }

  async test() {
    
  }

  async updateAccount(user: User) {
    const tx = new AccountTransaction({
      timestamp: timestamp(),
      asset: user.asset
    });
    console.log(user.asset.portfolio)
    tx.sign(user.passphrase);

    await devnet.transactions.broadcast(tx.toJSON())
    .then(data => log.info('Transaction result: ', data))
    .catch(err => log.error(err));
  }

  async getAccount(userAddress: string): Promise<Partial<User>> {
    return new Promise(async (resolve, reject) => {
      try {
        const account: Partial<User> = (await devnet.accounts.get({ address: userAddress })).data;
        return resolve(account);
      } catch (err) {
        log.error(err);
        return reject(err);
      }
    });
  }

  async addCash(user: User) {
    const tx = trans.transfer({
      amount: '10000',
      networkIdentifier: '7158c297294a540bc9ac6e474529c3da38d03ece056e3fa2d98141e6ec54132d',
      recipientId: user.address,
      passphrase: richPass
    });
    // const tx = new TransferTransaction({
    //   timestamp: timestamp(),
    //   amount: '10000',
    //   recipientId: user.address
    // })
    // tx.sign(richPass);
    console.log('ADD CASH')

    devnet.transactions.broadcast(tx)
    .then(async (msg) => {
      console.log(msg);
      const account = await this.getAccount(user.address);
    })
    .catch(console.log);
  }

  async initialization() {
    
  }

  async login(user: User) {
    let account: Account = (await this.getAccount(user.address) as Partial<User>)[0];
    user = new User({ ...user, ...account });
    if (account)
      return user;
    return new User({
      address: getAddressFromPassphrase(user.passphrase),
      passphrase: user.passphrase
    });
  }


}


