import { Injectable, HttpService } from '@nestjs/common';
import * as trans from '@liskhq/lisk-transactions';
import * as passphrase from '@liskhq/lisk-passphrase';
import * as crypto from '@liskhq/lisk-cryptography';
import { lisknet, devnet } from './lisk.module';
import { AxiosResponse } from 'axios';
import { logger, Logger } from '@root/common/logger';
import { AccountTransaction } from './transactions/account.transaction';
import { User } from '@root/common/models/User';
import { EnrichedPass } from '@root/common/models/EnrichedPass';
import { Asset } from '@root/common/models/Asset';

const { Mnemonic } = passphrase;

const richPass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';

import { lorem } from '@root/common/models/Utils';
import { getAddressFromPassphrase } from '@liskhq/lisk-cryptography';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class LiskService {

  @logger()
  private log: Logger;

  constructor(
    public http: HttpService
  ) {  
    
  }
  
  async poll() {
    while(true) {
      await timeout(3000);
      const ownerTransactions = await lisknet.transactions
      .get({ senderId: getAddressFromPassphrase(richPass) });
      console.log(ownerTransactions)
    }
  }

  async createAccount(pass: string) {
    let tx = trans.transfer({
      amount: '1000000000',
      recipientId: crypto.getAddressFromPassphrase(pass),
      passphrase: richPass
    });

    await devnet.transactions.broadcast(tx)
    .then(data => {
      this.log.info(`Account Created: ${crypto.getAddressFromPassphrase(pass)}`);
    })
    .catch(err => this.log.error(err));
  }

  async addCash(user: User) {
    // let tx = trans.transfer({
    //   amount: '1000000000',
    //   recipientId: crypto.getAddressFromPassphrase(pass),
    //   passphrase: richPass
    // });
    let tx = new trans.TransferTransaction({
      amount: '1000000000',
      recipientId: user.address
    })
    tx.sign(richPass);

    await devnet.transactions.broadcast(tx.toJSON())
    .then(data => {
      this.log.info(`Account Created: ${user.address}`);
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

  async getAccount(userAddress: string): Promise<Partial<User>> {
    return new Promise(async (resolve, reject) => {
      try {
        const account: Partial<User> = (await lisknet.accounts.get({ address: userAddress })).data;
        return resolve(account);
      } catch (err) {
        this.log.error(err);
        return reject(err);
      }
    });
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

  // CURRENTLY NOT ALLOWED
  // createDapp() {
  //   const dappForm = trans.createDapp({
  //     options: {
  //       name: 'testytestmctest',
  //       category: 1,
  //       description: 'Something',
  //       icon: 'asd',
  //       link: '',
  //       tags: '',
  //       type: 12
  //     },
  //     passphrase: richPass
  //   });
    
  //   const tx = new trans.DappTransaction(dappForm)
  //   tx.sign(richPass);
  //   console.log(tx)
  //   lisknet.transactions.broadcast(dappForm)
  //   .then((data) => console.log('O mers maybe'))
  //   .catch(err => console.log(err));
  // }


}


