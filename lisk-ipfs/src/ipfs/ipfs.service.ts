import { Injectable } from '@nestjs/common';
import { Asset } from '@root/common/models/Asset';
import * as ipfsClient from 'ipfs-http-client';

let ipfs: any;

const data = {
  pizda: 'defiance'
}

@Injectable()
export class IpfsService {

  constructor() {
    ipfs = ipfsClient({
      host: 'localhost',
      port: '5001',
      protocol: 'http'
    })
  }

  async getAsset(cid: string) {
    const data = await ipfs.get('QmPjZXX73utqwefaaGjqpEciTMzEpgEVdZwdQW94GMCX4a');
    console.log(data[0].content.toString('utf8'));
    return data;
  }

  storeAsset(asset: Asset) {
    console.log(JSON.stringify(data))
    ipfs.add(JSON.stringify(data)).then(console.log);
    return 'Added ';
  }
}
