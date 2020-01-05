"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const crypto_service_1 = require("./crypto.service");
const lisk_service_1 = require("./lisk.service");
let LiskController = class LiskController {
    constructor(crypto, lisk) {
        this.crypto = crypto;
        this.lisk = lisk;
    }
    generate() {
        return this.crypto.generate();
    }
    enrichPass(req) {
        const passphrase = req.body;
        return this.crypto.enrichPass(passphrase);
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            user.address = this.crypto.getAddress(user.passphrase);
            return yield this.lisk.login(user);
        });
    }
    updateUser(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            return yield this.lisk.updateAccount(user);
        });
    }
    createUser(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Cash Added');
            let user = req.body;
            return yield this.lisk.createAccount(user.passphrase);
        });
    }
};
tslib_1.__decorate([
    common_1.Get('generate-keys'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], LiskController.prototype, "generate", null);
tslib_1.__decorate([
    common_1.Post('enrichPass'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], LiskController.prototype, "enrichPass", null);
tslib_1.__decorate([
    common_1.Post('account'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LiskController.prototype, "login", null);
tslib_1.__decorate([
    common_1.Post('updateUser'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LiskController.prototype, "updateUser", null);
tslib_1.__decorate([
    common_1.Post('addCash'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LiskController.prototype, "createUser", null);
LiskController = tslib_1.__decorate([
    common_1.Controller('lisk'),
    tslib_1.__metadata("design:paramtypes", [crypto_service_1.CryptoService,
        lisk_service_1.LiskService])
], LiskController);
exports.LiskController = LiskController;
//# sourceMappingURL=lisk.controller.js.map