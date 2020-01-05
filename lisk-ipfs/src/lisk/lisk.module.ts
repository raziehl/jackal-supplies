import { Module, HttpModule } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { LiskController } from './lisk.controller';
import { CryptoService } from './crypto.service';


import { Application, genesisBlockDevnet, configDevnet } from 'lisk-sdk';
import { APIClient } from '@liskhq/lisk-api-client';
import { logger, Logger } from '@root/common/logger';

configDevnet.components.logger.consoleLogLevel = process.env.LISK_LOG_LEVEL || 'error';
configDevnet.components.logger.logFileName = './lisk.log';

export const lisknet = new APIClient(
  process.env.MAINNET ? APIClient.constants.MAINNET_NODES : APIClient.constants.TESTNET_NODES
);


@Module({
  imports: [HttpModule],
  providers: [{
      provide: 'LISK_SETUP',
      useFactory: () => {
        const app = new Application(genesisBlockDevnet, configDevnet)
        app
        .run()
        .then(() => console.log('Lisk Connected'))
        .catch(err => {
          console.error(err);
          process.exit(1);
        });
      }
    },
    LiskService,
    CryptoService
  ],
  controllers: [LiskController]
})
export class LiskModule {}
