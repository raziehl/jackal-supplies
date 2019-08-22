import { Application, genesisBlockDevnet, configDevnet } from 'lisk-sdk';

configDevnet.app.label = 'jackal-blockchain'; 
configDevnet.components.storage.password = 'password';
configDevnet.components.logger.consoleLogLevel = 'error';

export const lisk = new Application(genesisBlockDevnet, configDevnet);
