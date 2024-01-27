import express from 'express';
import Bid from '@/bids/bid.js';
import BidLog from './bidLog.js';

const router = express.Router();

router.post('/bid', (req, res) => {
  const bidLog = BidLog.getInstance();
  let roundOver = bidLog.isBiddingOver();

  const { pass, suit, level, player } = req.body;
  const newBid = new Bid(pass, suit, level, player)

  console.log(newBid);
  if (!roundOver) {
    bidLog.addBid(newBid);
  }
  roundOver = bidLog.isBiddingOver();
  
  console.log(req.body);

  res.json({ roundOver });
});

export default router;
