import express from 'express';
import Bid from '@/bids/bid.js';
import BidLog from '@/bids/bidLog.js';
import Card from '@/cards/card.js';
import Table from '@/table/table.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const bidLog = BidLog.getInstance();
  res.json(bidLog.getBidLog());
});

router.post('/bid', (req, res) => {
  const { card, pass, playerName } = req.body;
  const bidLog = BidLog.getInstance();
  let roundOver = bidLog.isBiddingOver();

  const ourTable = Table.getInstance();
  if (ourTable.getPlayers().length < 4) {
    throw new Error('The table is not full');
  }

  let ourCard = undefined;
  if (card?.suit && card?.rank) {
    ourCard = new Card(card.suit, card.rank);
  }

  const bid = new Bid(playerName, ourCard, pass);

  bidLog.addBid(bid);

  res.json({ bid, roundOver });
});

export default router;
