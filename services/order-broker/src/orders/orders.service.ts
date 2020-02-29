import { Injectable } from '@nestjs/common';
import { NatsService } from '../nats/nats.service';
import { Logger } from '@root/common/logger';
import { lisknet } from '../lisk/lisk.module';
import { APIClient } from '@liskhq/lisk-client';
import { DappTransaction, utils } from '@liskhq/lisk-transactions'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellOrder } from './entities/sell-order.entity';

const beddows2l = utils.convertBeddowsToLSK;

const log = new Logger('info');

async function timeout(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(SellOrder)
    private readonly sellOrderRepo: Repository<SellOrder>,
    private nats: NatsService
  ) {
    this.nats.getObservableForSubject('sell')
    .subscribe(this.sellOrder, err => log.error(err));

    this.nats.getObservableForSubject('buy')
    .subscribe(this.buyOrder, err => log.error(err));
  }

  async sellOrder(order: any) {
    // await timeout(10);
    console.log(order.data)
  }

  buyOrder(order: any) {

  }

  natsRun() {
    this.nats.queue('test', { test: 'test' });

    this.nats.getObservableForSubject('test')
    .subscribe(stuff => {
      log.info(stuff.msg.getData())
    });
  }

}





  // Do not run on mainnet unless sure
  // registerDapp() {
    // lisknet.dapps.get({limit: 100, name: 'tota11y'})
    // .then(log.info)
    // .catch(err => console.error(err));
  //   const tx = new DappTransaction({
  //     // amount: '23',
  //     // recipientId: '243',
  //     asset: {
  //       name: 'testytest',
  //       description: 'test',
  //       tags: 'funtest',
  //       link: 'archie.com',
  //       type: 5,
  //       category: 4,
  //       icon: 'defience.com'
  //     }
  //   })
  //   tx.sign('length shaft waste asset quote chair renew biology turkey before garage trophy');

  //   lisknet.transactions.broadcast(tx)
  //   .then(log.info)
  //   .catch(err => err);
  // }