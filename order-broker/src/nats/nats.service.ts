import { Injectable } from '@nestjs/common';
import { NatsRouter, NatsRouterOptions } from '@root/common/nats';

@Injectable()
export class NatsService extends NatsRouter {

  constructor(options: NatsRouterOptions) {
    super(options);
  }

}
