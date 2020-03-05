import winston, {
  createLogger, format, transports, Logger,
} from 'winston';

class LogService {
  logger!: Logger;
  baseOptions = {
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }

  constructor() {
    this.winston();
  }

  private winston() {
    const {
      combine, timestamp, colorize, simple,
    } = format;

    this.logger = createLogger({
      format: combine(
        timestamp(),
        colorize(),
        simple(),
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: './src/logs/error.log',
          level: 'error',
          ...this.baseOptions,

        }),
        new transports.File({
          filename: './src/logs/info.log',
          level: 'info',
          ...this.baseOptions,
        }),
        new transports.File({
          filename: './src/logs/debug.log',
          level: 'debug',
          ...this.baseOptions,
        }),
      ],
      exitOnError: false,
    });
  }
}

export default new LogService().logger;
