import 'dotenv/config';
import App from './app.js';
import PlayerController from './player/player.controller.js';
import BidController from './bid/bid.controller.js';

const app = new App(
  [
    new PlayerController(),
    new BidController()
  ],
);

app.listen();
