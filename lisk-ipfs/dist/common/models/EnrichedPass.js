"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnrichedPass {
    constructor(pass = {}) {
        this.passphrase = pass.passphrase || '';
        this.address = pass.address || '';
        this.privateKey = pass.privateKey || '';
        this.publicKey = pass.publicKey || '';
    }
}
exports.EnrichedPass = EnrichedPass;
//# sourceMappingURL=EnrichedPass.js.map