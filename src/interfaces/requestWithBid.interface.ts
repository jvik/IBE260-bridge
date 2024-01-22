import { Request } from 'express';

interface RequestWithBid extends Request {
  cardValue: string;
  suit: string;
}

export default RequestWithBid;
