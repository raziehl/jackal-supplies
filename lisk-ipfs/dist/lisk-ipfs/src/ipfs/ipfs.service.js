"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ipfsClient = require("ipfs-http-client");
let ipfs;
const data = {
    pizda: 'defiance'
};
let IpfsService = class IpfsService {
    constructor() {
        ipfs = ipfsClient({
            host: 'localhost',
            port: '5001',
            protocol: 'http'
        });
    }
    getAsset(cid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield ipfs.get('QmPjZXX73utqwefaaGjqpEciTMzEpgEVdZwdQW94GMCX4a');
            console.log(data[0].content.toString('utf8'));
            return data;
        });
    }
    storeAsset(asset) {
        console.log(JSON.stringify(data));
        ipfs.add(JSON.stringify(data)).then(console.log);
        return 'Added ';
    }
};
IpfsService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], IpfsService);
exports.IpfsService = IpfsService;
//# sourceMappingURL=ipfs.service.js.map