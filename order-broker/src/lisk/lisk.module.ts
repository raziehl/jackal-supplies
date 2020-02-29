import { Module, Global, HttpModule } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { CryptoService } from './crypto.service';


import { Application, genesisBlockDevnet, configDevnet } from 'lisk-sdk';
import { APIClient } from '@liskhq/lisk-api-client';
import { logger, Logger } from '@root/common/logger';
import { LiskController } from './lisk.controller';


// configDevnet.components.storage.host = 'petroschi.com';
configDevnet.components.logger.consoleLogLevel = process.env.LISK_LOG_LEVEL || 'error';
configDevnet.components.logger.logFileName = './lisk.log';

export const lisknet = new APIClient(
  process.env.MAINNET ? APIClient.constants.MAINNET_NODES : APIClient.constants.TESTNET_NODES
);

export const devnet = new APIClient(
  ['http:localhost:4000']
)


@Global()
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
  exports: [LiskService],
  controllers: [LiskController]
})
export class LiskModule {}
