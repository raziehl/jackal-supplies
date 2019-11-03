export class EnrichedPass {
    passphrase?: string;
    address?: string;
    privateKey?: string;
    publicKey?: string;

    constructor(pass: Partial<EnrichedPass> = {}) {
        this.passphrase = pass.passphrase || '';
        this.address = pass.address || '';
        this.privateKey = pass.privateKey || '';
        this.publicKey = pass.publicKey || '';
    }
}