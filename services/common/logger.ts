import { createLogger, format, Logger as WinstonLogger, transports } from 'winston';
import chalk from 'chalk';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private readonly winston: WinstonLogger;

  constructor(
    readonly level: LogLevel = 'info',
  ) {
    this.winston = createLogger({
      transports: [
        new transports.Console({level})
      ],
      format: format.printf((info): string => {
        const level: LogLevel = info.level as LogLevel;
        const message: string = info.message;
        const date = new Date().toUTCString();

        let color = chalk.yellow;

        switch (level) {
          case 'debug':
            color = chalk.blue;
            break;
          case 'info':
            color = chalk.green;
            break;
          case 'warn':
            color = chalk.yellow;
            break;
          case 'error':
            color = chalk.red;
            break;
        }

        return `${color(level.toUpperCase())} [${date}]: ${chalk.cyan(message)}`;
      })
    });

  }

  debug(...args: (string | {})[]) {
    this.winston.debug(this.argsToString(args));
  }

  info(...args: (string | {})[]) {
    this.winston.info(this.argsToString(args));
  }

  warn(...args: (string | {})[]) {
    this.winston.warn(this.argsToString(args));
  }

  error(...args: (string | {})[]) {
    this.winston.error(this.argsToString(args));
  }

  protected argsToString(args: (string | {})[]): string {
    return args
      .map(a => this.serialize(a))
      .join('\r\n\t');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected serialize(arg: any): string {
    if (typeof arg === 'object') {
      return JSON.stringify(arg)
        .replace(/"(password|apiKey|authToken)":".*?"/g, '"$1":"***"');
    } else {
      return arg.toString();
    }
  }
}
