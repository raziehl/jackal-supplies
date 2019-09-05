import { Injectable } from '@nestjs/common';
import { lisk } from './lisk-config';
import { AccountTransaction } from './transactions/account-transaction';

@Injectable()
export class LiskService {
    constructor() {
        lisk.registerTransaction(AccountTransaction);

        lisk.run()
        .then(() => lisk.logger.info('App started...'))
        .catch(error => {
            console.error('Faced error in application', error);
            process.exit(1);
        });
    }
}
