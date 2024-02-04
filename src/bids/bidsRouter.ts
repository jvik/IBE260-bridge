import express from 'express';
import Bid from '@/bids/bid.js';
import BidLog from '@/bids/bidLog.js';
import Table from '@/table/table.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const bidLog = BidLog.getInstance();
  res.json(bidLog.getBidLog());
});

router.post('/bid', (req, res) => {
  const { bid, pass, playerName } = req.body;
  const bidLog = BidLog.getInstance();
  let roundOver = bidLog.isBiddingOver();

  const ourTable = Table.getInstance();
  if (ourTable.getPlayers().length < 4) {
    throw new Error('The table is not full');
  }

  let ourBid = undefined;
  if (bid?.suit && bid?.rank) {
    ourBid = new Bid(playerName, bid.suit, bid.rank, pass);
    if (!roundOver) {
      bidLog.addBid(ourBid);
    }
  }
  roundOver = bidLog.isBiddingOver();
  // TODO: Server state -- wait for explanation
  res.json({ ourBid, roundOver });
});

export default router;
