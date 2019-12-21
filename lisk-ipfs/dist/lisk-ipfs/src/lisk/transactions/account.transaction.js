"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lisk_transactions_1 = require("@liskhq/lisk-transactions");
const logger_1 = require("../../logger");
class AccountTransaction extends lisk_transactions_1.BaseTransaction {
    constructor(transObj) {
        super(transObj);
        console.log('UPDATE ACCOUNT TRANSACTION');
    }
    verifyAgainstTransactions(transactions) {
        throw new Error("Method not implemented.");
    }
    assetFromSync(raw) {
        throw new Error("Method not implemented.");
    }
    static get TYPE() {
        return 10;
    }
    static get FEE() {
        return `${0}`;
    }
    ;
    prepare(store) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield store.account.cache([
                {
                    address: this.senderId
                },
            ]);
        });
    }
    validateAsset() {
        const errors = [];
        const asset = this.asset;
        return errors;
    }
    applyAsset(store) {
        const errors = [];
        const asset = this.asset;
        let sender = store.account.get(this.senderId);
        console.log(asset);
        const newObj = Object.assign(Object.assign({}, sender), { asset: asset });
        store.account.set(sender.address, newObj);
        return errors;
    }
    undoAsset(store) {
        const sender = store.account.get(this.senderId);
        const nullAssetObj = Object.assign(Object.assign({}, sender), { asset: null });
        store.account.set(sender.address, nullAssetObj);
        return [];
    }
}
tslib_1.__decorate([
    logger_1.logger(),
    tslib_1.__metadata("design:type", Object)
], AccountTransaction.prototype, "log", void 0);
exports.AccountTransaction = AccountTransaction;
//# sourceMappingURL=account.transaction.js.map