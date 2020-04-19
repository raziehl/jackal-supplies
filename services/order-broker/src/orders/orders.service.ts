import { Injectable } from '@nestjs/common';
import { NatsService } from '../nats/nats.service';
import { Logger } from '../../../common/logger';
import { lisknet } from '../lisk/lisk.module';

// const beddows2l = utils.convertBeddowsToLSK;

const log = new Logger('info');

async function timeout(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

@Injectable()
export class OrdersService {

  constructor(
    private nats: NatsService
  ) {
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
