"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ipfs_service_1 = require("./ipfs.service");
const ipfs_controller_1 = require("./ipfs.controller");
let IpfsModule = class IpfsModule {
};
IpfsModule = tslib_1.__decorate([
    common_1.Module({
        providers: [ipfs_service_1.IpfsService],
        controllers: [ipfs_controller_1.IpfsController]
    })
], IpfsModule);
exports.IpfsModule = IpfsModule;
//# sourceMappingURL=ipfs.module.js.map