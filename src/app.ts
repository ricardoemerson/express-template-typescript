import 'dotenv/config';
import cors from 'cors';
import express, {
  Request, Response, NextFunction,
} from 'express';
import morgan from 'morgan';
import winston, { Logger, stream } from 'winston';
import Youch from 'youch';

import 'express-async-errors';

import routes from './routes';

import HttpException from './config/HttpException';
import options from './config/winston';

class App {
  express: express.Application;
  logger: Logger;

  constructor() {
    this.express = express();

    this.winston();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(morgan('combined'));
  }

  private routes() {
    this.express.use(routes);
  }

  private winston() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
      ],

      exitOnError: false, // do not exit on handled exceptions
    });
  }

  private exceptionHandler() {
    // Middlewate with four params it is a middleware for handle exceptions.
    this.express.use(async (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        this.logger.error(`${ err.status || 500 } - ${ err.name } - ${ err.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip } - ${ err.stack }`);

        return res.status(500).json(errors);
      }


      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().express;
