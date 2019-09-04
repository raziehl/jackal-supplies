import { Application, genesisBlockDevnet, configDevnet } from 'lisk-sdk';
import { APIClient } from '@liskhq/lisk-client';

configDevnet.app.label = 'jackal-blockchain'; 
configDevnet.components.storage.password = 'password';
configDevnet.components.logger.consoleLogLevel = 'error';

export const lisk = new Application(genesisBlockDevnet, configDevnet);

export const lisknet = new APIClient(
    ['http://localhost:4000']
);