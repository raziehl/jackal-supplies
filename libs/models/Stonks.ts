import { Asset } from './Asset';
import { lisknet } from '../../packs/lisk-nest/src/lisk/lisk-config';

interface SpecificAssetInterface {
    valuate();
}

export class Stonks extends Asset implements SpecificAssetInterface {
    
    constructor(asset: Partial<Asset> = {}) {
        super(asset);
        this.PPS = this.valuate();
    }

    // never use from frontend
    valuate() {
        console.log(lisknet.transactions.get());
        return 2;
    }
}