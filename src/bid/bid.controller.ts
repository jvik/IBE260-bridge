import { Router, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface.js';
import RequestWithBid from '../interfaces/requestWithBid.interface.js';

class BidController implements Controller {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id`, this.postBid);
  }

  private postBid = async (request: RequestWithBid, response: Response, next: NextFunction) => {
    request.cardValue
    // response.send(request.cardValue)
    next();
  }
}

export default BidController;
