import { Injectable, HttpService } from '@nestjs/common';
import { TestTransaction } from './test-transaction';
import * as trans from '@liskhq/lisk-transactions';
import * as passphrase from '@liskhq/lisk-passphrase';
import * as crypto from '@liskhq/lisk-cryptography';
import { lisknet } from '../lisk-config';
import { AxiosResponse } from 'axios';
import { log } from '../../logger';
const { EPOCH_TIME } = require('@liskhq/lisk-constants');

const { Mnemonic } = passphrase;

@Injectable()
export class TransactionService {

    constructor(
        public http: HttpService
    ) {
        this.getStat();
    }

    getTimestamp = () => {
        const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME); 
        const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
        return  parseInt(inSeconds);
    }

    testTransact() {
        // this.transStruct();
        let tx =  new TestTransaction({
            asset: {
                // hello: 'NEW ACCOUNT?2RE',
                hello: 'PIZDA-TEST2'
            },
            fee: `${trans.utils.convertLSKToBeddows('1')}`,
            recipientId: '10881167371402274308L',
            timestamp: this.getTimestamp()
        });
        
        tx.sign('wagon stock borrow episode laundry kitten salute link globe zero feed marble')

        // tx.sign('spread twin wisdom oven glass shock blame afford trophy drink basket february')
        
        console.dir(tx.toJSON());

        lisknet.transactions.broadcast(tx.toJSON())
        .then(data => log.info(data.data))
        .catch(err => log.error(err))
    }

    // testTransact() {
    //     log.info('\n\t    TRANS STRUCT\n----------------------------')
    //     let tx = trans.transfer({
    //         amount: '123000000',
    //         // recipientId: '12668885769632475474L',
    //         recipientId: '16778326035024297504L',
    //         passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble'

    //     });
    //     console.log(tx as trans.TransactionJSON)
    //     console.log('\nStructure is valid: ' + trans.utils.verifyTransaction(tx as trans.TransactionJSON));
    //     console.log('\n\n')

    //     lisknet.transactions.broadcast(tx)
    //     .then(data => log.info(data.data))
    //     .catch(err => log.error(err));
    // }

    getStat() {
        const a1 = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';
        const a2 = 'spread twin wisdom oven glass shock blame afford trophy drink basket february';

        const exUser = {
            ...crypto.getKeys(a1),
            address: crypto.getAddressFromPassphrase(a1)
        }

        const genUser = {
            ...crypto.getKeys(a2),
            address: crypto.getAddressFromPassphrase(a2)
        }

        console.log('\n\nSTATS\n-----------')
        console.log('Existent User:')
        console.log(exUser);
        console.log('Generated User:')
        console.log(genUser);

    }

    testClient() {
        lisknet.peers.get()
    }
}


