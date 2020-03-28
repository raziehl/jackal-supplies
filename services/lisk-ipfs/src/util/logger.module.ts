import { Injectable, Module, Global } from '@nestjs/common';
import { Logger } from '../../../common/logger';
import { LOG_LEVEL } from './config';

@Injectable()
export class LoggerService extends Logger {}

@Global()
@Module({
  providers: [{
    provide: LoggerService,
    useFactory: () => {
      return new LoggerService(LOG_LEVEL);
    }
  }],
  exports: [LoggerService]
})
export class LoggerModule {}
