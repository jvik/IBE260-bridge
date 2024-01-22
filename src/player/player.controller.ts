import { Router, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface.js';
import RequestWithPlayer from '../interfaces/requestWithPlayer.interface.js';
import store from '../tempstore.js';

class PlayerController implements Controller {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getUser);
    this.router.post(`/register`, this.registerUser);
  }

  private registerUser = async (request: RequestWithPlayer, response: Response, next: NextFunction) => {
    store.set("player", {
      player1: request.body
    });
    response.send(store.get("player"));
    next();
  }

  private getUser = async (response: Response, next: NextFunction) => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
    };
    response.send(user);
    next();
  }
}

export default PlayerController;
