import { Injectable } from '@nestjs/common';
import { NatsService } from '../nats/nats.service';
import { logger, Logger } from '@root/common/logger';
import { lisknet } from '../lisk/lisk.service';
import { APIClient } from '@liskhq/lisk-client';
import { DappTransaction, utils } from '@liskhq/lisk-transactions'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellOrder } from './entities/sell-order.entity';

const beddows2l = utils.convertBeddowsToLSK;

@Injectable()
export class OrdersService {

  @logger()
  private log: Logger;

  constructor(
    @InjectRepository(SellOrder)
    private readonly sellOrderRepo: Repository<SellOrder>,
    private nats: NatsService
  ) {
    this.nats.getObservableForSubject('sell')
    .subscribe(this.sellOrder, err => this.log.error(err));

    this.nats.getObservableForSubject('buy')
    .subscribe(this.buyOrder, err => this.log.error(err));
  }

  sellOrder(order: any) {
    
  }

  buyOrder(order: any) {

  }

  natsRun() {
    this.nats.queue('test', { test: 'test' });

    this.nats.getObservableForSubject('test')
    .subscribe(stuff => {
      this.log.info(stuff.msg.getData())
    });
  }

}





  // Do not run on mainnet unless sure
  // registerDapp() {
    // lisknet.dapps.get({limit: 100, name: 'tota11y'})
    // .then(this.log.info)
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
  //   .then(this.log.info)
  //   .catch(err => err);
  // }