import 'dotenv/config';
import cors from 'cors';
import express, {
  ErrorRequestHandler, Request, Response, NextFunction,
} from 'express';
import Youch from 'youch';

import 'express-async-errors';
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
  }

  private routes() {
    this.express.use(routes);
  }

  private exceptionHandler() {
    // Middlewate with four params it is a middleware for handle exceptions.
    this.express.use(async (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().express;
