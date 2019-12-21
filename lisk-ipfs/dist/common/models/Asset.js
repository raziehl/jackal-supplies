"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Utils_1 = require("./Utils");
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
        this.imageCID = assetObject.imageCID || '';
        this.issuedShares = assetObject.issuedShares || 0;
        this.currentShares = assetObject.currentShares || 0;
        this.sellingShares = assetObject.sellingShares || 0;
        this.PPS = assetObject.PPS || 0;
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
                this.imageCID,
                Utils_1.timestamp()
            ];
            let hash = yield crypto_hash_1.sha256(JSON.stringify(this));
            return hash;
        });
    }
}
tslib_1.__decorate([
    class_validator_1.Length(0, 20),
    tslib_1.__metadata("design:type", String)
], Asset.prototype, "name", void 0);
exports.Asset = Asset;
//# sourceMappingURL=Asset.js.map