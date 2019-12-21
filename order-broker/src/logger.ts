import { createLogger, format, Logger, transports, LoggerOptions, LeveledLogMethod } from 'winston';
import * as chalk from 'chalk';

function formatAMPM(date: Date) {
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds();
  const ampm: string = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const mins = minutes < 10 ? '0' + minutes : minutes;
  const sec = seconds < 10 ? '0' + seconds : seconds;
  return hours + ':' + mins + ':' + sec + ' ' + ampm;
}

function logWrapper(winstonFunction: LeveledLogMethod) {
  return (...args: any) => {
    const orig = winstonFunction(args.filter((arg: any) => typeof arg !== 'object').join(' \t '));
    for(let obj of args.filter((arg: any) => (arg instanceof Array) || (arg instanceof Object))) {
      console.log(obj);
    }
    return orig;
  };
}

export function logger() {
  return function (target: any, key: string) {
    const _label = target.name || target.constructor.name;
    const defaultLogLevel = 'info';

    const myFormat = format.printf(({ level, message, label, timestamp }): string => {
      const dateTime = new Date(timestamp);
      const date = `${ dateTime.getDate() }/${ dateTime.getMonth() + 1 }/${ dateTime.getFullYear() }`;
      const time = `${ formatAMPM(dateTime) }`;
      
      level = level.toUpperCase();
      let levelBuffer = level;

      switch (level) {
        case 'DEBUG':
          label = chalk.magentaBright(label);
          levelBuffer = chalk.magentaBright(level);
          message = chalk.magentaBright(message);
          break;
        case 'VERBOSE':
          label = chalk.magenta(label);
          levelBuffer = chalk.magenta(level);
          message = chalk.magenta(message);
          break;
        case 'INFO':
          label = chalk.yellow(label);
          levelBuffer = chalk.yellow(level);
          message = chalk.green(message);
          break;
        case 'WARN':
          label = chalk.yellow(label);
          levelBuffer = chalk.yellow(level);
          message = chalk.yellow(message);
          break;
        case 'ERROR':
          label = chalk.red(label);
          levelBuffer = chalk.red(level);
          message = chalk.red(message);
          break;
        default:
          label = chalk.yellow(label);
          levelBuffer = chalk.yellow(level);
          message = chalk.red(message);
          break;
      }

      return `[${ levelBuffer }] - ${ date }, ${ time } ${ chalk.yellow(`[${ label }]`) }: ${ message }`;
    });
    
    let logger = createLogger({
      format: format.combine(
        format.label({ label: _label }),
        format.timestamp(),
        myFormat
      ),
      transports: [ new transports.Console({ level: process.env.LOG_LEVEL || defaultLogLevel }) ]
    });
    
    logger.error = logWrapper(logger.error);
    logger.warn = logWrapper(logger.warn);
    logger.info = logWrapper(logger.info);
    logger.verbose = logWrapper(logger.verbose);
    logger.debug = logWrapper(logger.debug);
    logger.silly = logWrapper(logger.silly);

    target.constructor.prototype[key] = logger;

  };
}

export { Logger };
