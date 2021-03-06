import { isEmptyObject, timestamp } from './Utils';
import { Validator, Length } from 'class-validator';
import { sha256 } from 'crypto-hash';

const valid = new Validator();

export enum AssetType {
    Stock = "stock",
    Bond = "bond",
    Fund = "fund",
    Stonks = "stonks",
    NotStonks = "not-stonks",
    CockFutures = "CockFuture"
}

export class Asset {

    name: string;
    description: string;
    cid: string;
    type: AssetType;
    issued: number;
    value: number;
    tags: string[];
    assetHash: string;
    transactionTimestamp: string;
    content?: Buffer;

    constructor(assetObject: Partial<Asset> = {}) {
        this.name = assetObject.name || '';
        this.description = assetObject.description || '';
        this.cid = assetObject.cid || '';
        this.type = assetObject.type || AssetType.NotStonks;
        this.issued = assetObject.issued || 0;
        this.value = assetObject.value || 0;
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
            this.cid,
            this.transactionTimestamp
        ];
        // buffer.concat(hashedProps.values);
        let hash = await sha256(JSON.stringify(this));
        return hash;
    }
}