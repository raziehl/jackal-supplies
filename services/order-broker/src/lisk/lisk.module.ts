import { Module, HttpModule } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { LiskController } from './lisk.controller';
import { CryptoService } from './crypto.service';
import { getNetworkIdentifier } from '@liskhq/lisk-cryptography';


import { Application, genesisBlockDevnet, configDevnet } from 'lisk-sdk';
import { APIClient } from '@liskhq/lisk-api-client';
import { Logger } from '../../../common/logger';
import { AccountTransaction } from './transactions/account.transaction';

import { DEVNET_URL } from '../../../common/env_vars';

configDevnet.components.logger.consoleLogLevel = process.env.LISK_LOG_LEVEL || 'error';
configDevnet.app.label = 'order-broker';
// configDevnet.components.logger.logFileName = './lisk.log';

genesisBlockDevnet.transactions[0] = {
  id: '7646387794267587684',
  type: 8,
  timestamp: 0,
  senderPublicKey: 'edf5786bef965f1836b8009e2c566463d62b6edd94e9cced49c1f098c972b92b',
  signature: '9f1282585cf91c9da0355f8e75c53363e50c0c1d41e96756b2bda02991ecb351bf67a5b0206050044f341a283725ecb1e78526cc6ee6fd045455d210f3a81f02',
  asset: { amount: '10000000000000000', recipientId: '16313739661670634666L' }
}

export const lisknet = new APIClient(
  process.env.MAINNET ? APIClient.constants.MAINNET_NODES : APIClient.constants.TESTNET_NODES
);

export const devnet = new APIClient(
  [DEVNET_URL]
);

export const networkIdentifier = getNetworkIdentifier(
  "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
  "Lisk",
);

@Module({
  imports: [HttpModule],
  providers: [{
      provide: 'LISK_SETUP',
      useFactory: () => {
        const app = new Application(genesisBlockDevnet, configDevnet);
        app.registerTransaction(AccountTransaction);
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
