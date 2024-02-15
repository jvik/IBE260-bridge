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
  let rule = bid?.rule; // quick check to look for existing rule
  // if explainerName exists, and bid lacking explanation:
  if (bidLog.explainerName !== undefined && rule === undefined) {
    throw new Error(`Meaning of the bid must be specified by ${bidLog.explainerName}!`)
  }
  bidLog.explainerName = "Player 2" // defined after statement obv. has different outcome ^
  let ourBid = undefined;
  if (typeof bidLog.explainerName !== undefined) {
    if (bid?.suit && bid?.rank) {
      ourBid = new Bid(playerName, bid.suit, bid.rank, pass);
      if (!roundOver) {
        bidLog.addBid(ourBid);
      }
    } // code is "repeated" because I'm dumb.
    if (pass) {
      ourBid = new Bid(playerName, bid?.suit, bid?.rank, pass);
      console.log(ourBid)
      if (!roundOver) {
        bidLog.addBid(ourBid);
      }
    }
  } else {
    const currPlayers = ourTable.getPlayers()
    const playerNames: string[] = currPlayers.map(player => player.name)
    console.log(playerNames)
  }
  roundOver = bidLog.isBiddingOver();
  console.log(bidLog)
  res.json({ ourBid, roundOver });
});

export default router;
