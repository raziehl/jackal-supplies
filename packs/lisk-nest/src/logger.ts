import * as bunyan from 'bunyan';
// var bunyan = require('bunyan');

export const log = bunyan.createLogger({
    name: 'lisk-nest'
});