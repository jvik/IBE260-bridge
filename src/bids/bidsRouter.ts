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
  // bidLog.explainerName = "Player 1";  For testing, selection still to be implemented

  const ourTable = Table.getInstance();
  if (ourTable.getPlayers().length < 4) {
    throw new Error('The table is not full');
  }
  // if explainerName exists, and bid lacking explanation:
  if (bidLog.explainerName !== undefined && bid.rule === undefined) {
    throw new Error(`Meaning of the bid must be specified by ${bidLog.explainerName}!`)
  }

  let ourBid = undefined;

  if (typeof bidLog.explainerName !== undefined) {
    if ((bid?.suit && bid?.rank) || bid?.pass) {
      ourBid = new Bid(playerName, bid.suit, bid.rank, pass);
      if (!roundOver) {
        bidLog.addBid(ourBid);
      }
    }
  } else {
    const currPlayers = ourTable.getPlayers()
    const playerNames: string[] = currPlayers.map(player => player.name)
  }
  roundOver = bidLog.isBiddingOver();
  res.json({ ourBid, roundOver });
});

export default router;
