import { Injectable } from '@nestjs/common';
import { Application, genesisBlockDevnet, configDevnet } from 'lisk-sdk';
import { APIClient } from '@liskhq/lisk-api-client';
import { logger, Logger } from '@root/common/logger';


configDevnet.components.logger.consoleLogLevel = process.env.LISK_LOG_LEVEL || 'error';
configDevnet.components.logger.logFileName = './lisk.log';

export const lisknet = new APIClient(
  process.env.MAINNET ? APIClient.constants.MAINNET_NODES : APIClient.constants.TESTNET_NODES
);

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
