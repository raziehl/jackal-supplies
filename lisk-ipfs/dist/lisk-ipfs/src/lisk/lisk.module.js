"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lisk_service_1 = require("./lisk.service");
const lisk_controller_1 = require("./lisk.controller");
let LiskModule = class LiskModule {
};
LiskModule = tslib_1.__decorate([
    common_1.Module({
        providers: [lisk_service_1.LiskService],
        controllers: [lisk_controller_1.LiskController]
    })
], LiskModule);
exports.LiskModule = LiskModule;
//# sourceMappingURL=lisk.module.js.map