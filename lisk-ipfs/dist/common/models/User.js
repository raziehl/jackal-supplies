"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Asset_1 = require("./Asset");
class UserStuff {
    constructor(userStuff = {}) {
        this.username = userStuff.username || '';
    }
}
exports.UserStuff = UserStuff;
class AssetBlock {
    constructor(asset = {}) {
        this.userStuff = new UserStuff(asset.userStuff);
        this.portfolio = new Array();
        if (asset.portfolio)
            asset.portfolio.forEach(asset => {
                this.portfolio.push(new Asset_1.Asset(asset));
            });
        else
            this.portfolio = new Array();
    }
}
exports.AssetBlock = AssetBlock;
class Delegate {
    constructor(delegate = {}) {
        this.username = delegate.username || "";
        this.vote = delegate.vote || "";
        this.rewards = delegate.rewards || "";
        this.producedBlocks = delegate.producedBlocks || 0;
        this.missedBlocks = delegate.missedBlocks || 0;
        this.rank = delegate.rank || 0;
        this.productivity = delegate.productivity || 0;
        this.approval = delegate.approval || 0;
    }
}
exports.Delegate = Delegate;
class Account {
    constructor(acc = {}) {
        this.address = acc.address || '';
        this.publicKey = acc.publicKey || '';
        this.balance = acc.balance || '';
        this.secondPublicKey = acc.secondPublicKey || '';
        this.asset = new AssetBlock(acc.asset);
        this.delegate = new Delegate(acc.delegate);
    }
}
exports.Account = Account;
class User extends Account {
    constructor(user = {}) {
        super(user);
        this.passphrase = user.passphrase || '';
        this.expiresIn = user.expiresIn || 1000000;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map