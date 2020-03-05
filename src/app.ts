import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import express, {
  Request, Response, NextFunction,
} from 'express';
import morgan from 'morgan';
import Youch from 'youch';

import logger from './app/services/LogService';

import HttpException from './config/HttpException';

import routes from './routes';

class App {
  express: express.Application;

  constructor() {
    this.express = express();
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

  private exceptionHandler() {
    // Middlewate with four params it is a middleware for handle exceptions.
    this.express.use(async (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        logger.error(`${ err.status || 500 } - ${ err.name } - ${ err.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip } - ${ err.stack }`);

        return res.status(500).json(errors);
      }


      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().express;
