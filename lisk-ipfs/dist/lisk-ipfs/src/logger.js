"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const chalk = require("chalk");
function formatAMPM(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const mins = minutes < 10 ? '0' + minutes : minutes;
    const sec = seconds < 10 ? '0' + seconds : seconds;
    return hours + ':' + mins + ':' + sec + ' ' + ampm;
}
function logWrapper(winstonFunction) {
    return (...args) => {
        const orig = winstonFunction(args.filter((arg) => typeof arg !== 'object').join(' \t '));
        for (let obj of args.filter((arg) => (arg instanceof Array) || (arg instanceof Object))) {
            console.log(obj);
        }
        return orig;
    };
}
function logger() {
    return function (target, key) {
        const _label = target.name || target.constructor.name;
        const defaultLogLevel = 'info';
        const myFormat = winston_1.format.printf(({ level, message, label, timestamp }) => {
            const dateTime = new Date(timestamp);
            const date = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
            const time = `${formatAMPM(dateTime)}`;
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
            return `[${levelBuffer}] - ${date}, ${time} ${chalk.yellow(`[${label}]`)}: ${message}`;
        });
        let logger = winston_1.createLogger({
            format: winston_1.format.combine(winston_1.format.label({ label: _label }), winston_1.format.timestamp(), myFormat),
            transports: [new winston_1.transports.Console({ level: process.env.LOG_LEVEL || defaultLogLevel })]
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
exports.logger = logger;
//# sourceMappingURL=logger.js.map