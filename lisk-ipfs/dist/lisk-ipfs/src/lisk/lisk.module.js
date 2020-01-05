"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lisk_service_1 = require("./lisk.service");
const lisk_controller_1 = require("./lisk.controller");
const crypto_service_1 = require("./crypto.service");
const lisk_sdk_1 = require("lisk-sdk");
const lisk_api_client_1 = require("@liskhq/lisk-api-client");
lisk_sdk_1.configDevnet.components.logger.consoleLogLevel = process.env.LISK_LOG_LEVEL || 'error';
lisk_sdk_1.configDevnet.components.logger.logFileName = './lisk.log';
exports.lisknet = new lisk_api_client_1.APIClient(process.env.MAINNET ? lisk_api_client_1.APIClient.constants.MAINNET_NODES : lisk_api_client_1.APIClient.constants.TESTNET_NODES);
let LiskModule = class LiskModule {
};
LiskModule = tslib_1.__decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        providers: [{
                provide: 'LISK_SETUP',
                useFactory: () => {
                    const app = new lisk_sdk_1.Application(lisk_sdk_1.genesisBlockDevnet, lisk_sdk_1.configDevnet);
                    app
                        .run()
                        .then(() => console.log('Lisk Connected'))
                        .catch(err => {
                        console.error(err);
                        process.exit(1);
                    });
                }
            },
            lisk_service_1.LiskService,
            crypto_service_1.CryptoService
        ],
        controllers: [lisk_controller_1.LiskController]
    })
], LiskModule);
exports.LiskModule = LiskModule;
//# sourceMappingURL=lisk.module.js.map