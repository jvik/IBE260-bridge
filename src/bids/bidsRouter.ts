import express from 'express';
import Bid from '@/bids/bid.js';
import BidLog from '@/bids/bidLog.js';
import Card from '@/cards/card.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const bidLog = BidLog.getInstance();
  res.json(bidLog.getBidLog());
});

router.post('/bid', (req, res) => {
  const bidLog = BidLog.getInstance();
  let roundOver = bidLog.isBiddingOver();

  const { card, pass, notrump, playerName } = req.body;

  let ourCard = undefined;
  if (card?.suit && card?.rank) {
    ourCard = new Card(card.suit, card.rank);
  }

  const bid = new Bid(playerName, ourCard, pass, notrump);

  bidLog.addBid(bid);

  res.json({ bid, roundOver });
});

export default router;
