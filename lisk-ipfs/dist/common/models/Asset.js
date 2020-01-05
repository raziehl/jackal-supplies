"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const crypto_hash_1 = require("crypto-hash");
const valid = new class_validator_1.Validator();
var AssetType;
(function (AssetType) {
    AssetType["Stock"] = "stock";
    AssetType["Bond"] = "bond";
    AssetType["Fund"] = "fund";
    AssetType["Stonks"] = "stonks";
    AssetType["NotStonks"] = "not-stonks";
    AssetType["CockFutures"] = "CockFuture";
})(AssetType || (AssetType = {}));
class Asset {
    constructor(assetObject = {}) {
        this.name = assetObject.name || '';
        this.description = assetObject.description || '';
        this.cid = assetObject.cid || '';
        this.type = assetObject.type || AssetType.NotStonks;
        this.tags = assetObject.tags;
        this.transactionTimestamp = assetObject.transactionTimestamp || '';
        this.hashAsset()
            .then((data) => this.assetHash = data)
            .catch((err) => console.log(err));
    }
    hashAsset() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let buffer = '';
            let hashedProps = [
                this.name,
                this.description,
                this.cid,
                this.transactionTimestamp
            ];
            let hash = yield crypto_hash_1.sha256(JSON.stringify(this));
            return hash;
        });
    }
}
exports.Asset = Asset;
//# sourceMappingURL=Asset.js.map