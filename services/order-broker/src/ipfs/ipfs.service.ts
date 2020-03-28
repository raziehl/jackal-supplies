import { Injectable } from '@nestjs/common';
import { LoggerService } from '../util/logger.module';
import IPFS = require('ipfs');
import Repo = require('ipfs-repo');

@Injectable()
export class IpfsService {

  ipfs: any;

  constructor(
    private log: LoggerService
  ) {
    this.init();
  }

  async init() {
    try {
      // const repo = new Repo('/tmp/ipfs-repo');
      // await repo.init({cool: 'config'});
      // await repo.open();
      this.ipfs = await IPFS.create({
        pass: "01234567890123456789",
      });
      // const res = await this.ipfs.key.list();
      const res = await this.ipfs.repo.stat();
      this.log.info(res)
    } catch(e) {
      this.log.error("Failed to start IPFS node", e);
    }
  }

  async getAsset(cid: string) {
    const chunks = [];
    for await (const chunk of this.ipfs.cat(cid)) {
      chunks.push(chunk)
    }
    
    return Buffer.concat(chunks).toString();
  }

  async destroyAsset(cid: string) {

  }

  async storeAsset(content: Buffer) {
    let path: string;
    try {
      for await (const result of this.ipfs.add(content.toString())) {
        path = result.path;
      }
    } catch(e) {
      console.error(e);
    }
    
    return path;
  }

}
