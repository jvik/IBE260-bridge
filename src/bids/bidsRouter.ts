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

  const { pass, suit, rank, player } = req.body;
  const newBid = new Bid(pass, suit, rank, player);

  if (!roundOver) {
    bidLog.addBid(newBid);
  }
  roundOver = bidLog.isBiddingOver();

  console.log(req.body);

  res.json({ roundOver });
});

export default router;
