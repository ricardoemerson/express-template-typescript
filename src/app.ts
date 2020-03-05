import 'dotenv/config';
import cors from 'cors';
import express, {
  Request, Response, NextFunction,
} from 'express';
import morgan from 'morgan';
import {
  createLogger, format, transports, Logger,
} from 'winston';
import Youch from 'youch';

import 'express-async-errors';

import routes from './routes';

import HttpException from './config/HttpException';

class App {
  express: express.Application;
  logger!: Logger;

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
    const {
      combine, timestamp, prettyPrint,
    } = format;

    this.logger = createLogger({
      format: combine(
        timestamp(),
        prettyPrint(),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: './src/logs/error.log', level: 'error' }),
        new transports.File({ filename: './src/logs/info.log', level: 'info' }),
      ],
      exitOnError: false,
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
