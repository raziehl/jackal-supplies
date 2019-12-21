import { Injectable } from '@nestjs/common';
import { Application, genesisBlockDevnet, configDevnet } from 'lisk-sdk';
import { logger, Logger } from '../logger';


configDevnet.components.logger.consoleLogLevel = process.env.LISK_LOG_LEVEL || 'error';
configDevnet.components.logger.logFileName = './lisk.log';

@Injectable()
export class LiskService {

  @logger()
  private log: Logger;
  
  constructor() {
    const app = new Application(genesisBlockDevnet, configDevnet)
    app
    .run()
    .then(() => this.log.info('Lisk Connected'))
    .catch(err => {
      this.log.error(err);
      process.exit(1);
    });
  }

}
