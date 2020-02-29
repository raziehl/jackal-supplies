import { Injectable } from '@nestjs/common';
import { Asset } from '@root/common/models/Asset';
import IpfsHttpClientLite = require('ipfs-http-client-lite');

let ipfs: any;

const data = {
  pizda: 'defiance'
}

@Injectable()
export class IpfsService {

  constructor() {
    this.test()
    ipfs = IpfsHttpClientLite({
      apiUrl: 'http://localhost:5001'
    })
  }

  async test() {
    
  }

  async getAsset(cid: string) {
    const data: Buffer = await ipfs.cat(cid);
    return JSON.parse(data.toString());
  }

  storeAsset(asset: Asset) {
    console.log(JSON.stringify(asset))
    ipfs.add(JSON.stringify(data))
    .then(console.log)
    .catch(console.error);
    return 'Added ';
  }
}
