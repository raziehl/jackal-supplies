"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lisk_sdk_1 = require("lisk-sdk");
const lisk_api_client_1 = require("@liskhq/lisk-api-client");
const logger_1 = require("@root/common/logger");
lisk_sdk_1.configDevnet.components.logger.consoleLogLevel = process.env.LISK_LOG_LEVEL || 'error';
lisk_sdk_1.configDevnet.components.logger.logFileName = './lisk.log';
exports.lisknet = new lisk_api_client_1.APIClient(process.env.MAINNET ? lisk_api_client_1.APIClient.constants.MAINNET_NODES : lisk_api_client_1.APIClient.constants.TESTNET_NODES);
let LiskService = class LiskService {
    constructor() {
        const app = new lisk_sdk_1.Application(lisk_sdk_1.genesisBlockDevnet, lisk_sdk_1.configDevnet);
        app
            .run()
            .then(() => this.log.info('Lisk Connected'))
            .catch(err => {
            this.log.error(err);
            process.exit(1);
        });
    }
};
tslib_1.__decorate([
    logger_1.logger(),
    tslib_1.__metadata("design:type", Object)
], LiskService.prototype, "log", void 0);
LiskService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], LiskService);
exports.LiskService = LiskService;
//# sourceMappingURL=lisk.service.js.map