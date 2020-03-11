import { Injectable } from '@nestjs/common';
import { Asset } from '@root/common/models/Asset';
import IpfsHttpClientLite = require('ipfs-http-client-lite');
const ipfsClient = require('ipfs-http-client')


let ipfs: any;

@Injectable()
export class IpfsService {

  constructor() {
    ipfs = ipfsClient('http://localhost:5001');
  }

  async getAsset(cid: string) {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk)
    }
    
    return Buffer.concat(chunks).toString();
  }

  async storeAsset(content: Buffer) {
    let path: string;
    try {
      for await (const result of ipfs.add(content.toString())) {
        path = result.path;
      }
    } catch(e) {
      console.error(e);
    }
    
    return path;
  }
}
