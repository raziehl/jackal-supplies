import { Module, Global } from '@nestjs/common';
import { NatsRouterOptions } from '../../../common/nats';
import { NatsService } from './nats.service';

// TODO: Calibrate Options

export const defaultConfig: NatsRouterOptions = {
  hosts: ['nats://nats:4222'],
  clusterId: 'order-broker',
  natsOptions: {},
  stanOptions: {},
};

@Global()
@Module({
  providers: [{
    provide: NatsService,
    useFactory: async () => {
      return await new NatsService(defaultConfig).connection;
    },
  }],
  exports: [NatsService],
})
export class NatsModule {}
