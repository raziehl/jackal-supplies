import { Injectable } from '@nestjs/common';
import { lisk } from './lisk-config';

@Injectable()
export class LiskService {
    constructor() {
        lisk.run()
        .then(() => lisk.logger.info('App started...'))
        .catch(error => {
            console.error('Faced error in application', error);
            process.exit(1);
        });
    }
}
