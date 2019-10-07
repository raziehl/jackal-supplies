import { Injectable, HttpService } from '@nestjs/common';
import { TestTransaction } from './test-transaction';
import { AccountTransaction } from './account-transaction';
import * as trans from '@liskhq/lisk-transactions';
import * as passphrase from '@liskhq/lisk-passphrase';
import * as crypto from '@liskhq/lisk-cryptography';
import { lisknet } from '../lisk-config';
import { AxiosResponse } from 'axios';
import { log } from '../../logger';
import { timestamp } from '../shared/Utils';
import { User } from '@root/libs/models/User';
import { APIResponse } from '@liskhq/lisk-api-client/dist-node/api_types';
import { EnrichedPass } from '@root/libs/models/EnrichedPass';
import { Asset } from '@root/libs/models/Asset';

const { Mnemonic } = passphrase;

const richPass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';

import {lorem} from 'libs/models/Utils';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class TransactionService {

    constructor(
        public http: HttpService
    ) {}

    async createAccount(pass: string) {
        let tx = trans.transfer({
            amount: '1000000000',
            recipientId: crypto.getAddressFromPassphrase(pass),
            passphrase: richPass
        });

        await lisknet.transactions.broadcast(tx)
        .then(data => {
            log.info(`Account Created: ${crypto.getAddressFromPassphrase(pass)}`);
        })
        .catch(err => log.error(err));
    }

    async updateAccount(user: User) {
        console.log('UPODATE')
        const tx = new AccountTransaction({
            timestamp: timestamp(),
            asset: user.asset
        });
        tx.sign(user.passphrase);
        
        await lisknet.transactions.broadcast(tx.toJSON())
        .then(data => log.info(data))
        .catch(err => log.error(err));
    }

    async getAccount(userAddress: string) {
        try {
            const account = (await lisknet.accounts.get({ address: userAddress })).data;
            return account;
        } catch(err) {
            log.error(err);
            return;
        }
    }

    async login(user: User) {
        let account: Account = (await this.getAccount(user.address) as Partial<User>)[0];
        user = new User({ ...user, ...account});
        if(account) {
            return user;
        } else {
            await this.createAccount(user.passphrase);
            await timeout(10000);
            return user;
        }
    }
}


