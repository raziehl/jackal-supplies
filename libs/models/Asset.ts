import { isEmptyObject, timestamp } from './Utils';
import { Validator, Length } from 'class-validator';
import { sha256 } from 'crypto-hash';

const valid = new Validator();

enum AssetType {
    Stock = "stock",
    Bond = "bond",
    Fund = "fund",
    Stonks = "stonks",
    NotStonks = "not-stonks",
    CockFutures = "CockFuture"
}

export class Asset {

    @Length(0, 20)
    name: string;
    description: string;
    imageURL: string;
    divisible: boolean;
    issuedShares: number;
    currentShares: number;
    sellingShares: number;
    PPS: number; // PricePerShare (LISK)
    PPU: number; // PricePerUnit = PPS * currentShares (LISK)
    units: number;
    type: AssetType;
    tags: string[];
    assetHash: string;
    transactionTimestamp: string;

    constructor(assetObject: Partial<Asset> = {}) {
        this.name = assetObject.name || 'sahfsdjkffdsgsdfsdfdsfdjaskljdashajl';
        this.description = assetObject.description || '';
        this.divisible = assetObject.divisible || true;
        this.imageURL = assetObject.imageURL || '';
        this.issuedShares = assetObject.issuedShares || 0;
        this.currentShares = assetObject.currentShares || 0;
        this.sellingShares = assetObject.sellingShares || 0;
        this.PPS = assetObject.PPS || 0;
        this.PPU = assetObject.PPU || 0;
        this.units = assetObject.units || 1;
        this.type = assetObject.type || AssetType.NotStonks; // cock-future
        this.tags = assetObject.tags;
        this.transactionTimestamp = assetObject.transactionTimestamp || '';
        this.hashAsset()
        .then((data) => this.assetHash = data)
        .catch((err) => console.log(err));
    }

    async hashAsset(): Promise<string> {
        let buffer: string = '';
        let hashedProps = [
            this.name,
            this.description,
            this.imageURL,
            this.divisible,
            timestamp()
        ];
        // buffer.concat(hashedProps.values);
        let hash = await sha256(JSON.stringify(this));
        return hash;
    }
}