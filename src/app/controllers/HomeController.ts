import { Request, Response } from 'express';

class HomeController {
  index(req: Request, res: Response) {
    return res.json({ hello: 'world' });
  }
}

export default new HomeController();
