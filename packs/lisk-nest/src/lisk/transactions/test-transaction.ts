import { BaseTransaction, TransactionError, StateStore } from '@liskhq/lisk-transactions';
import { log } from '../../logger'; 

export class TestTransaction extends BaseTransaction {

    protected verifyAgainstTransactions(transactions: readonly import("@liskhq/lisk-transactions").TransactionJSON[]): readonly TransactionError[] {
        throw new Error("Method not implemented.");
    }
    protected assetFromSync(raw: any): object {
        throw new Error("Method not implemented.");
    }

    constructor(transObj) {
        super(transObj);
    }

    static get TYPE () {
        return 10;
    }

    static get FEE () {
        return `${10 ** 8}`;
    };

    async prepare(store) {
        await store.account.cache([
            {
                address: this.senderId
            },
        ]);
    }

    validateAsset() {
        const errors = [];
        const asset: any = this.asset;
        
        return errors;
    }

    applyAsset(store: StateStore) {
        const errors = [];
        const asset: any = this.asset;
        let sender: any = store.account.get(this.senderId);
        
        // console.log('\nSENDER\n')
        // console.log(sender);
        // console.log('\n')
        const newObj = { ...sender, asset: { hello: asset.hello } };
        store.account.set(sender.address, newObj);

        return errors;
    }

    undoAsset(store: StateStore) {
        const sender = store.account.get(this.senderId);
        const nullAssetObj = { ...sender, asset: null };
        store.account.set(sender.address, nullAssetObj);
        return [];
    }

}