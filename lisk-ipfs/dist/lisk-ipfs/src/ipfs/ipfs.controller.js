"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ipfs_service_1 = require("./ipfs.service");
let IpfsController = class IpfsController {
    constructor(ipfsService) {
        this.ipfsService = ipfsService;
    }
    getAsset(cid) {
        return this.ipfsService.getAsset(cid);
    }
    storeAsset(req) {
        const asset = req.body;
        return this.ipfsService.storeAsset(asset);
    }
};
tslib_1.__decorate([
    common_1.Get('asset'),
    tslib_1.__param(0, common_1.Param('cid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IpfsController.prototype, "getAsset", null);
tslib_1.__decorate([
    common_1.Post('store'),
    tslib_1.__param(0, common_1.Request()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], IpfsController.prototype, "storeAsset", null);
IpfsController = tslib_1.__decorate([
    common_1.Controller('ipfs'),
    tslib_1.__metadata("design:paramtypes", [ipfs_service_1.IpfsService])
], IpfsController);
exports.IpfsController = IpfsController;
//# sourceMappingURL=ipfs.controller.js.map