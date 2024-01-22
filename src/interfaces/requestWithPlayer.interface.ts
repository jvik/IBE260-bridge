import { Request } from 'express';
import Player from '../player/player.interface.js';

interface RequestWithPlayer extends Request {
  body: {
    player: Player;
  }
}

export default RequestWithPlayer;
