"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const trans = require("@liskhq/lisk-transactions");
const passphrase = require("@liskhq/lisk-passphrase");
const crypto = require("@liskhq/lisk-cryptography");
const lisk_module_1 = require("./lisk.module");
const logger_1 = require("@root/common/logger");
const account_transaction_1 = require("./transactions/account.transaction");
const User_1 = require("@root/common/models/User");
const { Mnemonic } = passphrase;
const richPass = 'wagon stock borrow episode laundry kitten salute link globe zero feed marble';
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let LiskService = class LiskService {
    constructor(http) {
        this.http = http;
        this.test();
    }
    test() {
    }
    createAccount(pass) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let tx = trans.transfer({
                amount: '1000000000',
                recipientId: crypto.getAddressFromPassphrase(pass),
                passphrase: richPass
            });
            yield lisk_module_1.lisknet.transactions.broadcast(tx)
                .then(data => {
                this.log.info(`Account Created: ${crypto.getAddressFromPassphrase(pass)}`);
            })
                .catch(err => this.log.error(err));
        });
    }
    updateAccount(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('UPDATE');
            const tx = new account_transaction_1.AccountTransaction({
                timestamp: +new Date(),
                asset: user.asset
            });
            tx.sign(user.passphrase);
            yield lisk_module_1.lisknet.transactions.broadcast(tx.toJSON())
                .then(data => this.log.info('Transaction result: ', data))
                .catch(err => this.log.error(err));
        });
    }
    getAccount(userAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    const account = (yield lisk_module_1.lisknet.accounts.get({ address: userAddress })).data;
                    return resolve(account);
                }
                catch (err) {
                    this.log.error(err);
                    return reject(err);
                }
            }));
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let account = (yield this.getAccount(user.address))[0];
            user = new User_1.User(Object.assign(Object.assign({}, user), account));
            if (account) {
                return user;
            }
            else {
                yield this.createAccount(user.passphrase);
                yield timeout(10000);
                return user;
            }
        });
    }
};
tslib_1.__decorate([
    logger_1.logger(),
    tslib_1.__metadata("design:type", Object)
], LiskService.prototype, "log", void 0);
LiskService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [common_1.HttpService])
], LiskService);
exports.LiskService = LiskService;
//# sourceMappingURL=lisk.service.js.map