import * as bunyan from 'bunyan';

export const log = bunyan.createLogger({
    name: 'lisk-nest'
});