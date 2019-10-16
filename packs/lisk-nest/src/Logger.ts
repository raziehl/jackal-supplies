import { LoggerService, Logger as NestLogger } from '@nestjs/common';
import { LOG_LEVEL } from '@root/libs/env_vars';

export class Logger extends NestLogger implements LoggerService {

    constructor(context: string = '') {
        super(context);
    }

    info(message: string, obj?: any) {
        if (this.logLevel() <= 1) {
            this.log(message);
            obj ? console.log(obj) : null;
        }
    }

    bug(message: string, obj?: any) {
        if (this.logLevel() <= 0) {
            this.debug(message);
            obj ? console.log(obj) : null;
        }
    }

    logLevel() {
        switch (LOG_LEVEL) {
            case 'debug':
                return 0;
            case 'info':
                return 1;
            default:
                return 6;
        }
    }
}
