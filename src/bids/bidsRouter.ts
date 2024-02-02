import express from 'express';
import Bid from '@/bids/bid.js';
import BidLog from './bidLog.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const bidLog = BidLog.getInstance();
  res.json(bidLog.getBidLog());
});

router.post('/bid', (req, res) => {
  const bidLog = BidLog.getInstance();
  let roundOver = bidLog.isBiddingOver();

  const { pass, suit, rank, playerName } = req.body;
  const newBid = new Bid(suit, pass, rank, playerName);

  if (!roundOver) {
    bidLog.addBid(newBid);
  }
  roundOver = bidLog.isBiddingOver();

  console.log(req.body);

  res.json({ roundOver });
});

export default router;
