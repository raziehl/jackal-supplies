import { Injectable } from '@nestjs/common';
import { Asset } from '@root/libs/models/Asset';

@Injectable()
export class IpfsService {

    getAsset(cid: string) {
        return null;
    }

    storeAsset(asset: Asset) {
        return null;
    }
}
