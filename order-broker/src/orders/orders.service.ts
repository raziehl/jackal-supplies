import { Injectable } from '@nestjs/common';
import { logger, Logger } from '../logger';

@Injectable()
export class OrdersService {

  @logger()
  private log: Logger;

  constructor() {
    this.log.info('Online')
  }

  
}
