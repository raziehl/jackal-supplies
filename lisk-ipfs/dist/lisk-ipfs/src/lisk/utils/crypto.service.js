"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lisk_sdk_1 = require("lisk-sdk");
const passphrase = require("@liskhq/lisk-passphrase");
const EnrichedPass_1 = require("@root/common/models/EnrichedPass");
const logger_1 = require("../../logger");
const { Mnemonic } = passphrase;
let CryptoService = class CryptoService {
    getKeys(pass) {
        return lisk_sdk_1.cryptography.getKeys(pass);
    }
    getAddress(pass) {
        return lisk_sdk_1.cryptography.getAddressFromPassphrase(pass);
    }
    enrichPass(passphrase) {
        var pass = new EnrichedPass_1.EnrichedPass();
        pass.passphrase = passphrase;
        pass.address = this.getAddress(passphrase);
        pass.privateKey = this.getKeys(passphrase).privateKey;
        pass.publicKey = this.getKeys(passphrase).publicKey;
        return pass;
    }
    generate() {
        const pass = Mnemonic.generateMnemonic();
        return this.enrichPass(pass);
    }
};
tslib_1.__decorate([
    logger_1.logger(),
    tslib_1.__metadata("design:type", Object)
], CryptoService.prototype, "log", void 0);
CryptoService = tslib_1.__decorate([
    common_1.Injectable()
], CryptoService);
exports.CryptoService = CryptoService;
//# sourceMappingURL=crypto.service.js.map